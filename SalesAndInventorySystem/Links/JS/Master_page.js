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

    if ($('.global_search:focus').length > 0) {
        nav.removeClass('nav_hide')
    }
})

$(() => {
    $('.user_con').click(() => {
        $('.modal_login').addClass('show_modal_login')
        $('.login').addClass('show_login')
    })

    $('.modal_login').click(() => {
        $('.modal_login').removeClass('show_modal_login')
        $('.login').removeClass('show_login')
    })

    $('.login').click(e => e.stopPropagation())





})

