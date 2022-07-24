    var opt = 0;
    var body = $('body');
    var frmopt;
    var title;
    var frm = [
        'frm-slide.php',
        'frm-cate.php',
        'frm-sub-cate.php',
        'frm-product.php',
    ];
    var content = $('.container');
    var optMenu = 0;
    var popup = `<div class='popup'></div>`;
    var tbl = $('#tbl-data');
    var waiting = "<div class='waiting'>" +
        "<h1>Loading <i class='fa fa-spinner fa-spin' style='font-size:24px'></i></h1>" +
        "</div>";
    var btnEdit = `<button id="btn-edit">Edit</button>`;
    var ind;
    var e = $('#btn-fillter');
    var totalData = $('#txt-total-data');
    var totalPage = $('#txt-total-page');
    var currentpage = $('#txt-current-page');
    var s = 0;
    // get slide daata
    function get_slide() {
        get_count_data();
        var tr = `
                <tr>
                    <th>ID</th>
                    <th>Slide Name</th>
                    <th>OD</th>
                    <th>Photo</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>`;
        var txt = ``;
        $.ajax({
            url: 'action/get-slide-json.php',
            type: "POST",
            data: {
                opt: frmopt,
                e: e.val(),
                s: s,

            },
            // contentType: false,
            cache: false,
            // processData: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                for (i = 0; i < data.length; i++) {
                    txt += `
                                <tr>
                                    <td width=50>${data[i]['id']}</td>
                                    <td>${data[i]['name']}</td>
                                    <td width=50>${data[i]['od']}</td>
                                    <td><img src="img/product/${data[i]['img']}" alt="${data[i]['img']}"></td>
                                    <td width=50>${data[i]['status']}</td>
                                    <td>${btnEdit}</td>
                                </tr>    
                            `;
                }
                tbl.html(tr + txt);
            }
        });
    }
    //save slide
    function save_slide(eThis) {
        var parent = eThis.parents('.frm');
        var imgbox = parent.find('.img-box');
        var imgname = parent.find("#txt-photo");
        var fileimg = parent.find('#txt-file');
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        var id = parent.find('#txt-id');
        var name = parent.find('#txt-name');
        var od = parent.find('#txt-od');
        var status = parent.find('#txt-status');
        if (name.val() == '') {
            alert('plz enter name');
            return;
        }
        $.ajax({
            url: 'action/save-slide.php',
            type: "POST",
            data: frm_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            beforeSend: function() {
                eThis.append(waiting);
                imgbox.css({
                    'background-image': 'url(img/loading.gif)',
                });
                eThis.css({
                    'pointer-events': 'none'
                });
            },
            success: function(data) {
                if (data.dpl == true) {
                    alert('douplecate name');
                    $('.waiting').remove();
                    eThis.css({
                        'pointer-events': 'auto'
                    });
                    name.focus();
                    return;
                }
                if (data.edit == false) {
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                    var tr = `
                        <tr>
                            <td width=50>${data.id}</td>
                            <td>${name.val()}</td>
                            <td width=50>${od.val()}</td>
                            <td><img src="img/product/${imgname.val()}" alt="${imgname.val()}"></td>
                            <td width=50>${status.val()}</td>
                            <td>${btnEdit}</td>
                        </tr>
                    `;
                    tbl.find("tr").eq(0).after(tr);
                    id.val(data.id + 1);
                    od.val(data.id + 1);
                    fileimg.val('');
                    name.val('');
                    status.val('');
                    imgname.val('');
                }
                if (data.edit == true) {
                    tbl.find('tr:eq(' + ind + ') td:eq(1)').text(name.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(2)').text(od.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(3) img').attr('src', 'img/product/' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(3) img').attr('alt', '' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(4)').text(status.val());
                    $('.popup').remove();
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                }
            }
        });
    }
    // edit slide
    function edit_slide(eThis) {
        var tr = eThis.parents('tr');
        ind = tr.index();
        var id = tr.find('td').eq(0).text();
        var name = tr.find('td').eq(1).text();
        var od = tr.find('td').eq(2).text();
        var status = tr.find('td').eq(4).text();
        var imgname = tr.find('td:eq(3) img').attr('alt');
        body.find('.frm .img-box').css({
            'background-image': 'url(img/product/' + imgname + ')',
        });
        body.find('.frm #txt-edit').val(id);
        body.find('.frm #txt-id').val(id);
        body.find('.frm #txt-name').val(name);
        body.find('.frm #txt-od').val(od);
        body.find('.frm #txt-photo').val(imgname);
        body.find('.frm #txt-status').val(status);
    }





    // get sub cate daata
    function get_sub_cate() {
        get_count_data();
        var tr = `
                <tr>
                    <th>ID</th>
                    <th>Sub Category</th>
                    <th>Slide Name</th>
                    <th>OD</th>
                    <th>Photo</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>`;
        var txt = ``;
        $.ajax({
            url: 'action/get-sub-cate-json.php',
            type: "POST",
            data: {
                opt: frmopt,
                e: e.val(),
                s: s,
            },
            // contentType: false,
            cache: false,
            // processData: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                for (i = 0; i < data.length; i++) {
                    txt += `
                                <tr>
                                    <td width=50>${data[i]['id']}</td>
                                    <td width=100><span>${data[i]['sub-cate']}</span> ${data[i]['cate-name']}</td>
                                    <td>${data[i]['name']}</td>
                                    <td width=50>${data[i]['od']}</td>
                                    <td width=50><img src="img/product/${data[i]['img']}" alt="${data[i]['img']}"></td>
                                    <td width=10>${data[i]['status']}</td>
                                    <td width=10>${btnEdit}</td>
                                </tr>    
                            `;
                }
                tbl.html(tr + txt);
            }
        });
    }
    //save sub cate
    function save_sub_cate(eThis) {
        var parent = eThis.parents('.frm');
        var imgbox = parent.find('.img-box');
        var imgname = parent.find("#txt-photo");
        var cate_id = parent.find('#txt-cate');
        var cate_name = parent.find('#txt-cate option:selected').text();
        var fileimg = parent.find('#txt-file');
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        var id = parent.find('#txt-id');
        var name = parent.find('#txt-name');
        var od = parent.find('#txt-od');
        var status = parent.find('#txt-status');
        if (name.val() == '') {
            alert('plz enter name');
            name.forcus();
            return;
        } else if (cate_id.val() == '0') {
            alert('plz select category');
            return;
        }
        $.ajax({
            url: 'action/save-sub-cate.php',
            type: "POST",
            data: frm_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            beforeSend: function() {
                eThis.append(waiting);
                imgbox.css({
                    'background-image': 'url(img/loading.gif)',
                });
                eThis.css({
                    'pointer-events': 'none'
                });
            },
            success: function(data) {
                if (data.dpl == true) {
                    alert('douplecate name');
                    $('.waiting').remove();
                    eThis.css({
                        'pointer-events': 'auto'
                    });
                    name.focus();
                    return;
                }
                if (data.edit == false) {
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                    var tr = `
                        <tr>
                            <td width=50>${data.id}</td>
                            <td><span>${cate_id.val()}</span> ${cate_name}</td>
                            <td>${name.val()}</td>
                            <td width=50>${od.val()}</td>
                            <td><img src="img/product/${imgname.val()}" alt="${imgname.val()}"></td>
                            <td width=50>${status.val()}</td>
                            <td>${btnEdit}</td>
                        </tr>
                    `;
                    tbl.find("tr").eq(0).after(tr);
                    id.val(data.id + 1);
                    od.val(data.id + 1);
                    fileimg.val('');
                    name.val('');
                    status.val('');
                    imgname.val('');
                }
                if (data.edit == true) {
                    $('.popup').remove();
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                    tbl.find('tr:eq(' + ind + ') td:eq(1)').html(`<span>${cate_id.val()}</span> ` + cate_name);
                    tbl.find('tr:eq(' + ind + ') td:eq(2)').text(name.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(3)').text(od.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(4) img').attr('src', 'img/product/' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(4) img').attr('alt', '' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(5)').text(status.val());
                }
            }
        });
    }
    // edit slide
    function edit_sub_cate(eThis) {
        var tr = eThis.parents('tr');
        ind = tr.index();
        var id = tr.find('td').eq(0).text();
        var cate = tr.find('td:eq(1) span').text();
        var name = tr.find('td').eq(2).text();
        var od = tr.find('td').eq(3).text();
        var status = tr.find('td').eq(5).text();
        var imgname = tr.find('td:eq(4) img').attr('alt');
        body.find('.frm .img-box').css({
            'background-image': 'url(img/product/' + imgname + ')',
        });
        body.find('.frm #txt-edit').val(id);
        body.find('.frm #txt-id').val(id);
        body.find('.frm #txt-cate').val(cate);
        body.find('.frm #txt-name').val(name);
        body.find('.frm #txt-od').val(od);
        body.find('.frm #txt-photo').val(imgname);
        body.find('.frm #txt-status').val(status);
    }






    // get cate 
    function get_cate() {
        get_count_data();
        var tr = `
                    <tr>
                        <th>ID</th>
                        <th>Slide Name</th>
                        <th>OD</th>
                        <th>Photo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>`;
        var txt = ``;
        $.ajax({
            url: 'action/get-cate-json.php',
            type: "POST",
            data: {
                opt: frmopt,
                e: e.val(),
                s: s,
            },
            // contentType: false,
            cache: false,
            // processData: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                for (i = 0; i < data.length; i++) {
                    txt += `
                                    <tr>
                                        <td width=50>${data[i]['id']}</td>
                                        <td>${data[i]['name']}</td>
                                        <td width=50>${data[i]['od']}</td>
                                        <td><img src="img/product/${data[i]['img']}" alt="${data[i]['img']}"></td>
                                        <td width=50>${data[i]['status']}</td>
                                        <td>${btnEdit}</td>
                                    </tr>    
                                `;
                }
                tbl.html(tr + txt);
            }
        });
    }
    //save cate
    function save_cate(eThis) {
        var parent = eThis.parents('.frm');
        var imgbox = parent.find('.img-box');
        var imgname = parent.find("#txt-photo");
        var fileimg = parent.find('#txt-file');
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        var id = parent.find('#txt-id');
        var name = parent.find('#txt-name');
        var od = parent.find('#txt-od');
        var status = parent.find('#txt-status');
        if (name.val() == '') {
            alert('plz enter name');
            return;
        }
        $.ajax({
            url: 'action/save-cate.php',
            type: "POST",
            data: frm_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            beforeSend: function() {
                eThis.append(waiting);
                imgbox.css({
                    'background-image': 'url(img/loading.gif)',
                });
                eThis.css({
                    'pointer-events': 'none'
                });
            },
            success: function(data) {
                if (data.dpl == true) {
                    alert('douplecate name');
                    $('.waiting').remove();
                    eThis.css({
                        'pointer-events': 'auto'
                    });
                    name.focus();
                    return;
                }
                if (data.edit == false) {
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                    var tr = `
                            <tr>
                                <td width=50>${data.id}</td>
                                <td>${name.val()}</td>
                                <td width=50>${od.val()}</td>
                                <td><img src="img/product/${imgname.val()}" alt="${imgname.val()}"></td>
                                <td width=50>${status.val()}</td>
                                <td>${btnEdit}</td>
                            </tr>
                        `;
                    tbl.find("tr").eq(0).after(tr);
                    id.val(data.id + 1);
                    od.val(data.id + 1);
                    fileimg.val('');
                    name.val('');
                    status.val('');
                    imgname.val('');
                }
                if (data.edit == true) {
                    tbl.find('tr:eq(' + ind + ') td:eq(1)').text(name.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(2)').text(od.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(3) img').attr('src', 'img/product/' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(3) img').attr('alt', '' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(4)').text(status.val());
                    $('.popup').remove();
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                }
            }
        });
    }
    // edit cate
    function edit_cate(eThis) {
        var tr = eThis.parents('tr');
        ind = tr.index();
        var id = tr.find('td').eq(0).text();
        var name = tr.find('td').eq(1).text();
        var od = tr.find('td').eq(2).text();
        var status = tr.find('td').eq(4).text();
        var imgname = tr.find('td:eq(3) img').attr('alt');
        body.find('.frm .img-box').css({
            'background-image': 'url(img/product/' + imgname + ')',
        });
        body.find('.frm #txt-edit').val(id);
        body.find('.frm #txt-id').val(id);
        body.find('.frm #txt-name').val(name);
        body.find('.frm #txt-od').val(od);
        body.find('.frm #txt-photo').val(imgname);
        body.find('.frm #txt-status').val(status);
    }



    // get sub cate daata
    function get_product() {
        get_count_data();
        var tr = `
                <tr>
                    <th width="50">ID</th>
                    <th width="100">Slide</th>
                    <th width="100">Category</th>
                    <th width="100">Sub Category</th>
                    <th width="150">Product Name</th>
                    <th width="50">Price</th>
                    <th width="50">Discount</th>
                    <th width="50">Price Discount</th>
                    <th width="50">OD</th>
                    <th width="50">Photo</th>
                    <th width="50">Status</th>
                    <th width="50">Action</th>
                </tr>`;
        var txt = ``;
        $.ajax({
            url: 'action/get-product-json.php',
            type: "POST",
            data: {
                opt: frmopt,
                e: e.val(),
                s: s,
            },
            cache: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                for (i = 0; i < data.length; i++) {
                    txt += `
                                <tr>
                                    <td width=50>${data[i]['id']}</td>
                                    <td width=50>${data[i]['slide']}</td>
                                    <td width=50>${data[i]['cate']}</td>
                                    <td width=50>${data[i]['sub-cate']}</td>
                                    <td width=50>${data[i]['name']}</td>
                                    <td width=50>${data[i]['price']}</td>
                                    <td width=50>${data[i]['dis']}</td>
                                    <td width=50>${data[i]['price-dis']}</td>
                                    <td width=50>${data[i]['od']}</td>
                                    <td width=50>${data[i]['photo']}</td>
                                    <td width=50>${data[i]['status']}</td>
                                    <td width=10>${btnEdit}</td>
                                </tr>    
                            `;
                }
                tbl.html(tr + txt);
            }
        });
    }
    //save sub cate
    function save_product(eThis) {
        var parent = eThis.parents('.frm');
        var imgbox = parent.find('.img-box');
        var imgname = parent.find("#txt-photo");
        var photo = parent.find('.txt-photo');
        var file = parent.find('.txt-file2');
        var slide = parent.find('#txt-slide');
        var slide_name = parent.find('#txt-slide option:selected').text();
        var cate_id = parent.find('#txt-cate');
        var cate_name = parent.find('#txt-cate option:selected').text();
        var sub_name = parent.find("#txt-sub-cate option:selected").text();
        var sub_cate = parent.find('#txt-sub-cate');
        var fileimg = parent.find('#txt-file');
        var id = parent.find('#txt-id');
        var name = parent.find('#txt-name');
        var od = parent.find('#txt-od');
        var status = parent.find('#txt-status');
        var des = parent.find('#txt-des');
        var price = parent.find('#txt-price');
        var dis = parent.find('#txt-dis');
        var price_dis = parent.find('#txt-price-dis')
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        if (name.val() == '') {
            alert('plz enter name');
            name.forcus();
            return;
        } else if (cate_id.val() == '0') {
            alert('plz select category');
            return;
        }
        $.ajax({
            url: 'action/save-product.php',
            type: "POST",
            data: frm_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            beforeSend: function() {
                eThis.append(waiting);
                imgbox.css({
                    'background-image': 'url(img/loading.gif)',
                });
                eThis.css({
                    'pointer-events': 'none'
                });
            },
            success: function(data) {
                if (data.dpl == true) {
                    alert('douplecate name');
                    $('.waiting').remove();
                    eThis.css({
                        'pointer-events': 'auto'
                    });
                    name.focus();
                    return;
                }
                if (data.edit == false) {
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                    alert(data.id);
                    var tr = `
                        <tr>
                            <td width=50>${data.id}</td>
                            <td>${slide_name}</td>
                            <td>${cate_name}</td>
                            <td>${sub_name}</td>
                            <td>${name.val()}</td>
                            <td>${price.val()}</td>
                            <td>${dis.val()}</td>
                            <td>${price_dis.val()}</td>
                            <td>${od.val()}</td>
                            <td>${photo.val()}</td>
                            <td>${status.val()}</td>
                            <td>${btnEdit}</td>
                        </tr>
                    `;
                    tbl.find("tr").eq(0).after(tr);
                    id.val(data.id + 1);
                    od.val(data.id + 1);
                    fileimg.val('');
                    name.val('');
                    status.val('');
                    imgname.val('');
                }
                if (data.edit == true) {
                    $('.popup').remove();
                    imgbox.css({
                        'background-image': 'url(img/gallery.png)',
                    });
                    $('.waiting').remove();
                    tbl.find('tr:eq(' + ind + ') td:eq(1)').html(`<span>${cate_id.val()}</span> ` + cate_name);
                    tbl.find('tr:eq(' + ind + ') td:eq(2)').text(name.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(3)').text(od.val());
                    tbl.find('tr:eq(' + ind + ') td:eq(4) img').attr('src', 'img/product/' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(4) img').attr('alt', '' + imgname.val() + '');
                    tbl.find('tr:eq(' + ind + ') td:eq(5)').text(status.val());
                }
            }
        });
    }
    // edit slide
    function edit_product(eThis) {
        var tr = eThis.parents('tr');
        ind = tr.index();
        var id = tr.find('td').eq(0).text();
        $.ajax({
            url: 'action/get-edit-product.php',
            type: "POST",
            data: {
                id: id,
            },
            cache: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                var photo = data['photo'].trim();
                var ph = photo.split(' ');
                body.find('.frm #txt-edit').val(data['id']);
                body.find('.frm #txt-id').val(data['id']);
                body.find('.frm #txt-slide').val(data['slide_id']);
                body.find('.frm #txt-cate').val(data['cate_id']);
                body.find('.frm #txt-sub-cat4e').val(data['sub_id']);
                body.find('.frm #txt-od').val(data['od']);
                body.find('.frm #txt-status').val(data['status']);
                body.find('.frm #txt-name').val(data['name']);
                body.find('.frm #txt-price').val(data['price']);
                body.find('.frm #txt-dis').val(data['dis']);
                body.find('.frm #txt-price-dis').val(data['price_dis']);
                body.find('.frm #txt-des').val(data['des']);
                for (i = 0; i < ph.length; i++) {
                    body.find('.frm .img-box:eq(' + i + ')').css({
                        'background-image': 'url(img/product/' + ph[i] + ')',
                    });
                    body.find('.frm .txt-photo:eq(' + i + ')').val(ph[i]);
                }
                get_sub_by_cate(data['cate_id'], data['sub_id']);
            }
        });
    }



    //get auto id
    function get_auto_id() {
        $.ajax({
            url: 'action/get-id.php',
            type: "POST",
            data: {
                opt: frmopt
            },
            cache: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                $('#txt-id').val(`${data.id}`);
                $('#txt-od').val(data.id);
            }
        });
    }

    // get total data
    function get_count_data() {
        $.ajax({
            url: 'action/get-count-data.php',
            type: "POST",
            data: {
                opt: frmopt
            },
            // contentType: false,
            cache: false,
            // processData: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                totalData.text(data.total);
                totalPage.text(Math.ceil(data.total / e.val()));
            }
        });
    }

    function get_sub_by_cate(id, optSelect) {
        var txt = '';
        if (id == 0) {
            return;
        }
        $.ajax({
            url: 'action/get-sub-by-cate.php',
            type: 'POST',
            data: {
                id: id
            },
            cache: false,
            dataType: 'json',
            beforeSend: function() {},
            success: function(data) {
                var txt = `<option value="0">--------SELECT ONE ITEM--------</option>`;
                for (i = 0; i < data.length; i++) {
                    txt += `<option value="${data[i]['id']}">${data[i]['name']}</option>`;
                }
                $('.frm-product').find('#txt-sub-cate').html(txt);
                if (optSelect != 0) {
                    body.find('.frm-product #txt-sub-cate').val(optSelect);
                }
            }
        });
    }