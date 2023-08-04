$(() => {

    populateTable();


    $('.global_search').keyup((e) => {
        $('.sales_and_inventory').DataTable().search($(e.target).val()).draw()
    })

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

    $('.item_modal').mousedown(e => e.stopPropagation())

    $('.submit_btn').click(() => {
        let valid_inputs = requiredInput($('.req'))


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
                sweetAlert({
                    icon: 'success',
                    title: 'Insert Success.'
                })

                $('.modal_login .cancel_btn').click();
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
                icon: 'error',
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

        if (data.length > 0) {
            let html = '';

            data.map(item => {
                html +=
                    `
                    <tr data-id="${item.ID}">
                        <td>
                            <img loading="lazy" src="../Images/${item.Image}"/>
                        </td>
                        <td>
                            <div class="item_details">
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
            ]
        });

    })



}

const insertDataWithImage = obj => {
    return $.ajax({
        type: 'post',
        url: obj.url,
        data: obj.fd,
        cache: false,
        processData: false,
        contentType: false,
        error: e => console.log(e)
    });
}














