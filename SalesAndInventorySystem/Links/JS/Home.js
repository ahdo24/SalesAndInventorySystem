$(() => {

    populateTable();


    $('.global_search').keyup((e) => {
        let val = $(e.target).val();

        $('.sales_and_inventory').DataTable().search(val).draw()
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

            tbody.html('');

            data.map(item => {
                html +=
                    `
                    <tr>
                        <td> <img loading="lazy" src="../Images/${item.Image}"/> </td>
                        <td> ${item.ItemDesc} </td>
                        <td> ${item.Price} </td>
                        <td> ${item.Qty} </td>
                        <td> ${item.Barcode_Serial} </td>
                    </tr>                        
                    `
            })

            tbody.html(html);
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

