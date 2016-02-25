var table = $('#table').DataTable({
    "ajax": {
        "url": globalVariable.servers.url + "/article",
        "dataType": 'json',
        xhrFields: {
            withCredentials: true
        },
        "dataSrc": "",
        "error": globalFunction.netWork.error
    },
    "columns": [{
        "data": "title",
        "title": "标题"
    }, {
        "data": "department",
        "title": "科室"
    }, {
        "data": "author",
        "title": "作者"
    }, {
        "data": "ctype",
        "title": "发布板块",
        "createdCell": function(td, cellData, rowData, row, col) {
            $(td).text(globalFunction.options.parse.articleType(rowData.ctype));
        }
    }, {
        "data": "created_at",
        "title": "发布时间"
    }, {
        "data": "status",
        "title": "状态",
        "createdCell": function(td, cellData, rowData, row, col) {
            $(td).text(globalFunction.options.parse.articleStatus(rowData.status));
        }
    }, {
        "data": null,
        "title": "操作",
        "createdCell": function(td, cellData, rowData, row, col) {
            $(td).empty().append('<a href="./index.html#article/edit/' + rowData.id + '"><button class="ui button edit"><i class="edit icon"></i>修改</button></a>');
        }
    }],
});


function addDrawTableEvent() {
    $("#departmentSelect").on('keyup change', function() {
        drawTable(1, $(this).val() || "");
    });
    $("#articleTypeSelect").on('keyup change', function() {
        drawTable(3, $(this).val() || "");
    });
    $("#articleStatusSelect").on('keyup change', function() {
        drawTable(5, $(this).val() || "");
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