$(() => {

    populateTable();


    $('.global_search').keyup((e) => {
        $('.sales_and_inventory').DataTable().search($(e.target).val()).draw()
    })

    $('.add_btn').click(() => {
        $('.modal_login').addClass('show_modal_login')
        $('.item_modal').addClass('show_modal_child')
    })

    $('.item_modal').mousedown(e => e.stopPropagation())



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

