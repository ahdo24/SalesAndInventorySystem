$(() => {
    populateTable();

    $('.global_search').keyup((e) => {
        $('.sales_and_inventory').DataTable().search($(e.target).val()).draw()
    })

    $('.item_modal').mousedown(e => e.stopPropagation())

    $('.item_modal .submit_btn').click(() => {
        let valid_inputs = requiredInput($('.item_modal .req'))


        if (valid_inputs.length == 0) {
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
                fd: formData
            }

            insertDataWithImage(config).then(e => {
                let res = e

                sweetAlert({
                    icon: 'success',
                    title: 'Insert Success.'
                })

                $('.modal_login .cancel_btn').click();

                populateTable();
                //html +=
                //    `
                //    <tr data-id="${item.ID}">
                //        <td>
                //            <img loading="lazy" src="../Images/${item.Image}"/>
                //        </td>
                //        <td>
                //            <div class="item_details">
                //                 <div class="item_code top"> ${item.Barcode_Serial} </div>
                //                 <div class="item_desc top"> ${item.ItemDesc} </div>
                //                 <div class="item_price bottom"> P${item.Price} </div>
                //                 <div class="item_qty bottom"> ${item.Qty} Qty </div>
                //            </div>
                //        </td>
                //    </tr>                        
                //    `


            })


        }
        else {
            sweetAlert({
                icon: 'warning',
                title: 'Please fill-up required fields.'
            })
        }
    })

})


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
                    `
                    if (ROLE == "admin") { //Edit and delete the button if admin is logged
                        html += `<div class="table_buttons">
                            <div class="edit_btn" data-id="${item.ID}">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </div>
                            <div class="delete_btn" data-id="${item.ID}">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </div>
                        </div >`
                    }
                    html += `
                                 <div class="item_code top"> ${item.Barcode_Serial} </div>
                                 <div class="item_desc top"> ${item.ItemDesc} </div>
                                 <div class="item_price bottom"> P${item.Price} </div>
                                 <div class="item_qty bottom"> ${item.Qty} Qty </div>
                            </div>
                        </td>
                    </tr>                        
                    `
            })

            tbody.append(html);
        }

        $('.sales_and_inventory').DataTable({
            pageLength: 18,
            lengthMenu: [
                [6, 12, 18, 24, -1],
                [6, 12, 18, 24, "All"]
            ],
            dom: '<"header"lirp>t<"F">'
        });

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














