$(() => {
    populateTable();

    $('.global_search').keyup((e) => {
        $('.sales_and_inventory').DataTable().search($(e.target).val()).draw()
    })

    $('.item_modal').mousedown(e => e.stopPropagation())

    $('.item_modal .submit_btn').click(e => {
        let invalid_inputs = requiredInput($('.item_modal .req'))
        let btn = $(e.target).text()

        let formData = new FormData();

        // input text
        formData.append('input_code', $('.input_code').val())
        formData.append('input_desc', $('.input_desc').val())
        formData.append('input_price', $('.input_price').val())
        formData.append('input_qty', $('.input_qty').val())

        // *Inspect the form data
        //for (let i of formData.entries()) {
        //    let key = i[0], val = i[1]
        //    console.log(key + ': ' + val)
        //}

        if (btn == "INSERT"
            && requiredInput($('.item_modal .req_image')).length == 0
            && invalid_inputs.length == 0)
        {
            insertImage(formData);
        }

        else if (btn == "UPDATE" && invalid_inputs.length == 0) {
            let inputs = {
                code: $('.input_code').val(),
                desc: $('.input_desc').val(),
                price: $('.input_price').val(),
                qty: $('.input_qty').val()
            }

            updateImage(formData, inputs);
        }

        else {
             sweetAlert({
                icon: 'warning',
                title: 'Please fill-up required fields.'
             })
        }





    })

    $('.sales_con').click(() => {
        tableDependableEvents();
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
        $('.modal_header span').text('Update')

        let input = {
            id: $(e.target).parent()[0].dataset.id,
            image : $(e.target).parent()[0].dataset.img,
            code : $($(e.target).parent().parent().parent().find('.item_code')[0]).text(),
            desc: $($(e.target).parent().parent().parent().find('.item_desc')[0]).text(),
            price : $($(e.target).parent().parent().parent().find('.item_price span')[0]).text(),
            qty : $($(e.target).parent().parent().parent().find('.item_qty span')[0]).text(),
        }

        $('.preview_image').attr('data-original', input.image)
        $('.preview_image')[0].src = '/Images/' + input.image
        $('.preview_image').addClass('show_image')
        $('.upload_image_label').removeClass('show_image')

        $('.input_code').val(input.code)
        $('.input_desc').val(input.desc)
        $('.input_price').val(input.price)
        $('.input_qty').val(input.qty)

        $('.item_modal .submit_btn').text('UPDATE').addClass('update_btn').attr('data-id', input.id)

    })
    $('.edit_btn').click(e => {
        e.stopPropagation()
        $(e.target).children().click()
    })

    $('.delete_btn i').click(e => {
        let id = $(e.target).parent()[0].dataset.id

        sweetAlertConfirmation(() => {
            let data = {
                input_id : id,
                sp : 'DELETE_INVENTORY'
            }
            // Delete in Database
            getData({ 
                url: '/Pages/Home.aspx/DeleteData',
                data: JSON.stringify({ param: data })
            })

            // Delete in UI
            $(e.target).closest(`tr[data-id=${id}]`).remove()

        })

    })
    $('.delete_btn').click(e => {
        e.stopPropagation()
        $(e.target).children().click()
    })

    $('.add_to_cart i').click(e => {
        let mini_modal = $(e.target).parent().find('.add_to_cart_initial_inputs')
        let mini_modal_input = mini_modal.find('input')

        mini_modal.addClass('add_to_cart_initial_inputs_show')

        setTimeout(() => {
            mini_modal_input.focus();
        }, 100)

    })
    $('.add_to_cart').click(e => e.stopPropagation())
    $('.initial_btn_con').click(e => e.preventDefault())

    $('.initial_cancel').click(e => {
        $(e.target).parent().parent().removeClass('add_to_cart_initial_inputs_show')
    })

    $('.initial_qty').keyup(e => {
        let this_input = $(e.target)
        let item_details = this_input.parent().parent().parent().parent().parent()

        let price = item_details.find('.item_price span').text()
        let qty = item_details.find('.item_qty span')
        let input = this_input.val()

        let total_amount = price * input
        let total_qty = qty[0].dataset.qty - input

        $('.initial_qty').parent().find('div > .intial_total').text(total_amount)
        qty.text(total_qty)



    })

}

const insertImage = formData => {
    let file = $('#input_image')[0].files[0]
    // input file
    formData.append("file", file);
    formData.append("folder", "Images");

    let fname = file.name
    let unique_name = randChar(fname.length) + "." + fname.substring(fname.lastIndexOf(".") + 1, fname.length)
    formData.append('filename', unique_name)

    formData.append('sp', 'INSERT_INVENTORY')

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

const updateImage = (formData, inputs) => {
    let id = $('.item_modal .update_btn')[0].dataset.id
    let final_img = ""

    let file = $('#input_image')[0].files
    if (file.length > 0) {
        // input file
        formData.append("file", file[0]);
        formData.append("folder", "Images");
        formData.append("hasNewImage", "true");

        let fname = file[0].name
        let unique_name = randChar(fname.length) + "." + fname.substring(fname.lastIndexOf(".") + 1, fname.length)
        formData.append('filename', unique_name)
        formData.append('oringinal', $('.preview_image')[0].dataset.original)

        final_img = fname
    }
    else {
        formData.append('filename', $('.preview_image')[0].dataset.original)
        formData.append("hasNewImage", "false");

        final_img = $('.preview_image')[0].dataset.original;
    }

    formData.append('id', id)
    formData.append('sp', 'UPDATE_INVENTORY')

    let config = {
        url: '../Classes/UploadImage.ashx',
        fd: formData,
        contentType: false,
    }

    insertDataWithImage(config)  // Dynamic function poor naming convention T_T

    setTimeout(() => {
        sweetAlert({
            icon: 'success',
            title: 'Update Success.'
        })
        $('.modal_login .cancel_btn').click();

        // Update the table
        let tr = $(`.sales_and_inventory tbody tr[data-id="${id}"]`)

        tr.find('.item_details .item_code').text(inputs.code.trim())
        tr.find('.item_details .item_desc').text(inputs.desc.trim())
        tr.find('.item_details .item_price > span').text(inputs.price)
        tr.find('.item_details .item_qty > span').text(inputs.qty)
        tr.find('td.sorting_1 img')[0].src = `/Images/${final_img}`

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
                    html +=         tableBtnBasedOnRole(item);
                    html += `
                                    </div >
                                    <div class="item_code top">${item.Barcode_Serial}</div>
                                    <div class="item_desc top">${item.ItemDesc}</div>
                                    <div class="item_price bottom"> P <span>${item.Price}</span> </div>
                                    <div class="item_qty bottom"> <span data-qty="${item.Qty}">${item.Qty}</span> Qty </div>
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

const tableBtnBasedOnRole = item => {
    html = ""
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
                <div class="add_to_cart_initial_inputs">
                    <div class="initial_inputs_con">
                        <input type="text" class="initial_qty" placeholder="QTY"/>
                        <div>Total: P<span class="intial_total">0</span></div>
                    </div>
                    <div class="initial_btn_con">
                        <button class="initial_add" data-id="${item.ID}">Add</button>
                        <button class="initial_cancel data-id="${item.ID}"">Cancel</button>
                    </div>
                </div>
            </div>
            `
    }
    return html
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














