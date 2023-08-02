$(window).scroll(e => {
    let nav = $('.nav_con')
    let current_pos = $(window).scrollTop()
    let prev_pos = $('.nav_con').attr('data-position')

    $('.nav_con').attr('data-position', current_pos)

    if (current_pos > 150 && current_pos > prev_pos) {
        nav.addClass('nav_hide')
    } else {
        nav.removeClass('nav_hide')
    }

    if (
        $('.global_search:focus').length > 0
        || 
        $('.global_search').val() != ""
        ) {
        nav.removeClass('nav_hide');
        nav.mouseover();
    }
})

$(() => {
    $('.user_con').click(() => {
        $('.modal_login').addClass('show_modal_login')
        $('.login').addClass('show_modal_child')
    })

    $('.modal_login').mousedown(() => {
        $('.modal_login').removeClass('show_modal_login')
        $('.show_modal_child').removeClass('show_modal_child')
    })

    $('.login').mousedown(e => e.stopPropagation())

    $('.search_btn').click((e) => {
        e.stopPropagation();
        $('.global_search').addClass('global_search_width');
        $('.global_search').focus();
    })

    $('body').click(e => {
        if (
            !$(e.target).hasClass('global_search_width') && $('.global_search').hasClass('global_search_width')
        ) {
            $('.global_search').removeClass('global_search_width')
        }
        if ($('.global_search').val() != "") {
            $('.global_search').addClass('global_search_width')
        }
    })


    $('.preview_image_con').click(() => {
        $('.preview_image_con .input_image')[0].click();
    })

    $('.input_image').change(e => {
        let prev_image = $('.preview_image')[0]
        let file = e.target.files[0]

        if (file) {
            prev_image.src = URL.createObjectURL(file);

            $('.preview_image').addClass('show_image')
            $('.upload_image_label').removeClass('show_image')
        }
        else {
            prev_image.src = '#'

            $('.preview_image').removeClass('show_image')
            $('.upload_image_label').addClass('show_image')

        }

    })

    $('.cancel_btn').click(() => {
        $('.modal_login').removeClass('show_modal_login')
        $('.show_modal_child').removeClass('show_modal_child')

        $('.modal_input').val('')
        $('.input_image').change()
    })



})



const getData = (obj) => {
    let data = obj.data ?? ''

    return $.ajax({
        url: obj.url,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: data,
        fail: (e, msg) => { console.log(msg) },
    })
}