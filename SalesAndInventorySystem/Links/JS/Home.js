$(() => {
    populateTable();

    $('.global_search').keyup((e) => {
        $('.sales_and_inventory').DataTable().search($(e.target).val()).draw()
    })

    $('.item_modal').mousedown(e => e.stopPropagation())

    $('.item_modal .submit_btn').click(e => {
        let valid_inputs = requiredInput($('.item_modal .req'))
        let btn = $(e.target).text()

        if (valid_inputs.length == 0) {

            if (btn == "INSERT") {
                insertImage();
            }
            if (btn == "UPDATE") {
                    alert('update')
            }


        }
        else {
            sweetAlert({
                icon: 'warning',
                title: 'Please fill-up required fields.'
            })
        }
    })


})
const tableDependableEvents = () => {
    $('.add_btn').click(() => {
        $('.modal_login').addClass('show_modal_login')
        $('.item_modal').addClass('show_modal_child')

        if ($('.invalid_input').length > 0) {
            sweetAlert({
                icon: 'error',
                title: 'Please fill-up required fields.',
                time: 1000,
            })
        }
    })

    $('.edit_btn i').click(e => {
        $('.modal_login').addClass('show_modal_login')
        $('.item_modal').addClass('show_modal_child')
        let input = {
            id: $(e.target).parent()[0].dataset.id,
            image : $(e.target).parent()[0].dataset.img,
            code : $($(e.target).parent().parent().parent().find('.item_code')[0]).text(),
            desc : $($(e.target).parent().parent().parent().find('.item_desc')[0]).text(),
            price : $($(e.target).parent().parent().parent().find('.item_price')[0]).text(),
            qty : $($(e.target).parent().parent().parent().find('.item_qty')[0]).text(),
        }

        $('.preview_image')[0].src = '/Images/' + input.image
        $('.preview_image').addClass('show_image')
        $('.upload_image_label').removeClass('show_image')

        $('.input_code').val(input.code)
        $('.input_desc').val(input.desc)
        $('.input_price').val(input.price)
        $('.input_qty').val(input.qty)

        $('.item_modal .submit_btn').text('UPDATE').addClass('update_btn')

    })

    $('.edit_btn').click(e => {
        e.stopPropagation()
        $(e.target).children().click()
    })
}

const insertImage = () => {
    let file = $('#input_image')[0].files[0]
    let formData = new FormData();
    // input file
    formData.append("file", file);
    formData.append("folder", "Images");

    let fname = file.name
    let unique_name = randChar(fname.length) + "." + fname.substring(fname.lastIndexOf(".") + 1, fname.length)
    formData.append('filename', unique_name)

    // input text
    formData.append('input_code', $('.input_code').val())
    formData.append('input_desc', $('.input_desc').val())
    formData.append('input_price', $('.input_price').val())
    formData.append('input_qty', $('.input_qty').val())


    formData.append('sp', 'INSERT_INVENTORY')
    // *Inspect the form data
    //for (let i of formData.entries()) {
    //    let key = i[0], val = i[1]
    //    console.log(key + ': ' + val)
    //}

    let config = {
        url: '../Classes/UploadImage.ashx',
        fd: formData,
        contentType: false,
    }

    insertDataWithImage(config)

    setTimeout(() => {
        sweetAlert({
            icon: 'success',
            title: 'Insert Success.'
        })
        $('.modal_login .cancel_btn').click();
        populateTable();
    }, 100)

}

const populateTable = () => {
    getData({
        url: '/Pages/Home.aspx/GetData'
    }).then((e) => {
        let data = JSON.parse(e.d);
        let tbody = $('.sales_and_inventory tbody');


        if ($.fn.DataTable.isDataTable('.sales_and_inventory')) 
            $('.sales_and_inventory').DataTable().destroy();
        
            $('.sales_and_inventory tbody').empty();

        if (data.length > 0) {
            let html = ""
            if (ROLE == "admin") { // add button if admin is logged
                 html = `  <tr class="add_btn">
                                    <td>
                                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                    </td>
                                    <td></td>
                                </tr>`;
            }

            data.map(item => {
                    html += `
                    <tr data-id="${item.ID}">
                        <td>
                            <img loading="lazy" src="../Images/${item.Image}"/>
                        </td>
                        <td>
                            <div class="item_details">
                                <div class="table_buttons">
                    `
                if (ROLE == "admin") { //Edit and delete the button if admin is logged
                    html +=
                                `
                                    <div class="edit_btn" data-id="${item.ID}" data-img="${item.Image}">
                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </div>
                                    <div class="delete_btn" data-id="${item.ID}" data-img="${item.Image}">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </div>
                                `
                 }
                if (ROLE == "cashier") {
                    html +=
                                `
                                    <div class="add_to_cart" data-id="${item.ID}" data-img="${item.Image}">
                                       <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                    </div>
                                `

                }

                    html += `
                                </div >
                                 <div class="item_code top"> ${item.Barcode_Serial} </div>
                                 <div class="item_desc top"> ${item.ItemDesc} </div>
                                 <div class="item_price bottom"> P${item.Price} </div>
                                 <div class="item_qty bottom"> ${item.Qty} Qty </div>
                            </div>
                        </td>
                    </tr>                        
                    `
            })

            tbody.append(html)
        }

        $('.sales_and_inventory').DataTable({
            pageLength: 18,
            lengthMenu: [
                [6, 12, 18, 24, -1],
                [6, 12, 18, 24, "All"]
            ],
            dom: '<"header"lirp>t<"F">'
        });

       
        tableDependableEvents();
    })



}

const insertDataWithImage = obj => {
    obj.contentType ??= 'application/json;charset=utf-8'

    return $.ajax({
        type: 'post',
        url: obj.url,
        data: obj.fd,
        cache: false,
        processData: false,
        contentType: obj.contentType,
        //success: e => console.log(e),
        error: e => console.log(e)
    });
}














