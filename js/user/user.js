var table = $('#table').DataTable({
    "ajax": {
        "url": globalVariable.servers.url + "/user",
        "dataType": 'json',
        xhrFields: {
            withCredentials: true
        },
        "error": globalFunction.netWork.error
    },
    "columns": [{
        "data": "id",
        "title": "ID",
    }, {
        "data": "name",
        "title": "姓名",
    }, {
        "data": "phone",
        "title": "手机号",
    }, {
        "data": "certificate_num",
        "title": "执业医师证号",
    }, {
        "data": "place_id",
        "title": "所在地区",
        "visible": false,
        /*"createdCell": function(td, cellData, rowData, row, col) {
            var address = globalFunction.util.xmlParse(cellData);
            if (!address) {
                return;
            }
            $(td).text(address.province + address.city);
        }*/
    }, {
        "data": "hospital",
        "title": "所在医院",
        "visible": false,
        /*"createdCell": function(td, cellData, rowData, row, col) {
            var address = globalFunction.util.xmlParse(cellData);
            if (!address) {
                return;
            }
            $(td).text(address.hospital);
        },*/
    }, {
        "data": "department",
        "title": "科室",
    }, {
        "data": "administrative",
        "title": "行政职务",
    }, {
        "data": "technical",
        "title": "技术职务",
    }, {
        "data": "role_id",
        "title": "会员级别",
        "visible": false,
        /*"createdCell": function(td, cellData, rowData, row, col) {
            for (var rowNum = 0; rowNum < globalVariable.options.optionsJson.userRole.length; rowNum++) {
                if (cellData == globalVariable.options.optionsJson.userRole[rowNum].value) {
                    $(td).text(globalVariable.options.optionsJson.userRole[rowNum].text);
                }
            }
        }*/
    }, {
        "data": null,
        "title": "操作",
        "createdCell": function(td, cellData, rowData, row, col) {
            $(td).empty().append('<a href="./index.html#user/edit/' + rowData.id + '"><button class="ui button edit"><i class="edit icon"></i>修改</button></a>');
        }
    }],
});

function addDrawTableEvent() {
    $("#searchAddressProvince,#searchAddressCity").on('keyup change', function() {
        console.info("查询");
        var value = ($("#searchAddressProvince").val() || "") + ($("#searchAddressCity").val() || "");
        drawTable(4, value);
    });
    $("#searchAddressHospital").on('keyup change', function() {
        var value = ($("#searchAddressProvince").val() || "") + ($("#searchAddressCity").val() || "") + ($("#searchAddressHospital").val() || "");
        drawTable(5, value);
    });
    $("#searchUserName").unbind().on('keyup change', function() {
        drawTable(1, $(this).val());
    });
    $("#searchPhone").unbind().on('keyup change', function() {
        drawTable(2, $(this).val());
    });
    $("#departmentSelect").unbind().on('keyup change', function() {
        drawTable(6, $(this).val() || "");
    });

    function drawTable(column, value) {
        table
            .column(column)
            .search(value)
            .draw();
    }
}

setTimeout(function() {
    addDrawTableEvent();
}, 500)