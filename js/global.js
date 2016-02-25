var globalVariable = {
	"servers": {
		"url": "http://testyidao.happysoft.co:8000",
	},
	"address": {
		"provinces": "",
		"allAddressData": localStorage.getItem("address")
	},
	"options": {
		"optionsHtml": {},
		"optionsJson": {},
	}
}

var globalFunction = {
	netWork: {
		error: "",
		ajax: "",
		success: ""
	},
	address: {
		getProvince: "",
		getCity: "",
		getHospital: "",
		getAddressData: "",
	},
	options: {
		getSaveOptions: "",
		parseRoleId: "",
		parse: {},
	},
	util: {
		xmlToString: ""
	}
}


/* network function */
globalFunction.netWork.error = function() {
	$("#requestMessage").text("网络错误").addClass("ui negative message hidden").transition('fade down');
	setTimeout(function() {
		$("#requestMessage").transition('fade down');
	}, 2000);
}
globalFunction.netWork.success = function() {
	$("#requestMessage").text("修改成功").addClass("ui success message hidden").transition('fade down');
	setTimeout(function() {
		$("#requestMessage").transition('fade down');
	}, 2000);
}

/* address function */
globalFunction.address.getAddressData = function() {
	$.ajax({
		//url: "http://testyidao.happysoft.co:3333/xml/address.xml",
		url: "./xml/address.xml",
		dataType: "xml",
		success: function(xml) {
			localStorage.setItem("address", globalFunction.util.xmlToString(xml));
			globalFunction.address.getProvince();
		},
		error: globalFunction.netWork.error
	});
}

globalFunction.address.getAddressData();

globalFunction.util.xmlToString = function(xmlData) {
	var xmlString;
	//IE
	if (window.ActiveXObject) {
		xmlString = xmlData.xml;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else {
		xmlString = (new XMLSerializer()).serializeToString(xmlData);
	}
	return xmlString;
}

globalFunction.util.xmlParse = function(code) {
	var addressData = localStorage.getItem("address");
	if (!code) {
		return false;
	}
	var hash = {};
	$(addressData).find("p").each(function() {
		if (this.id == code.substring(0, 2)) {
			hash["province"] = $(this).attr("name")
			$(this).find("c").each(function() {
				if (this.id == code.substring(2, 4)) {
					hash["city"] = $(this).attr("name")
					$(this).find("h").each(function() {
						if (this.id == code.substring(4)) {
							hash["hospital"] = $(this).attr("name")
						}
					})
				}
			})
		}
	});
	return hash;
}

globalFunction.address.getProvince = function() {
	var provinces = [];
	$(globalVariable.address.allAddressData).find("p").each(function() {
		provinces.push({
			"name": $(this).attr("name"),
			"id": $(this).attr("id")
		});
	});
	globalVariable.address.provinces = provinces;
	return provinces;
}

globalFunction.address.getCity = function(province) {
	var cityes = [];
	$(globalVariable.address.allAddressData).find("p").each(function() {
		if (province === $(this).attr("id")) {
			$(this).find("c").each(function() {
				cityes.push({
					"name": $(this).attr("name"),
					"id": $(this).attr("id")
				});
			});
		}
	});
	return cityes;
}

globalFunction.address.getHospital = function(province, city) {
	var hospitals = [];
	$(globalVariable.address.allAddressData).find("p").each(function() {
		if (province === $(this).attr("id")) {
			$(this).find("c").each(function() {
				if (city === $(this).attr("id")) {
					$(this).find("h").each(function() {
						hospitals.push({
							"name": $(this).attr("name"),
							"id": $(this).attr("id")
						})
					});
				};
			});
		}
	});
	return hospitals;
}

/* options function */

globalFunction.options.getSaveOptions = function() {
	$.ajax({
		url: "./xml/options.xml",
		dataType: "xml",
		success: function(xml) {
			var options = $(xml).find('all')[0].children;
			for (var num = 0; num < options.length; num++) {
				var key = options[num].tagName;
				var result = '';
				var optionsJson = [];
				for (var optionNum = 0; optionNum < options[num].children.length; optionNum++) {
					result = result + options[num].children[optionNum].outerHTML
				}
				localStorage.setItem(key, result);
				$(result).each(function() {
					var content = {
						"value": $(this).context.value,
						"text": $(this).context.label
					}
					optionsJson.push(content);
				});
				eval("globalVariable.options.optionsJson." + key + "= optionsJson;");
				eval("globalVariable.options.optionsHtml." + key + "= result;");
				eval("globalFunction.options.parse." + key + "= function(data) {var json = globalVariable.options.optionsJson. " + key + "; for (var rowNum = 0; rowNum < json.length; rowNum++) {if (data == json[rowNum].value) {return json[rowNum].text; } }; return ''; }; ");

			};
		},
		error: globalFunction.netWork.error
	});
}

globalFunction.options.getSaveOptions();

/* ajax encapsulation */

globalFunction.netWork.ajax = function(args) {
	$.ajax({
		url: args.url,
		dataType: 'json' || args.dataType,
		type: args.type || 'GET',
		data: args.data || '',
		/*xhrFields: {
			withCredentials: true
		},*/
		success: function(data) {
			args.success(data);
		},
		error: globalFunction.netWork.error
	});
}