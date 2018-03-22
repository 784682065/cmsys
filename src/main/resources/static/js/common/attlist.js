var Attachlist = {

    path: '/file/download',

    url: function (value, row, index) {
        var r = '<button type="button" class="btn btn-success btn-xs" >' +
            '<a style="text-decoration: none;color: white" ' +
            'href="/file/download?filename='+row.FILENAME+'&fileurl='+row.FILEURL+'&fileid=' +row.FILEID+'"><span class="glyphicon glyphicon-download-alt" aria-hidden="true">' +
            '</span>下载</a></button>';

        return r;
    },

    download: function (o, z, p) {
        var para = {};
        para.filename = o;
        para.fileurl = z;
        para.fileid = p;
        $.post(Attachlist.path, para, function (data) {

            toastr.success("附件下载成功！");
        });
    }
};





