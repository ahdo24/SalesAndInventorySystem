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
        $('.modal_input').removeClass('invalid_input')
        $('.preview_image_con').removeClass('invalid_input')

        $('.modal_input').val('')
        $('.input_image').change()
    })

    $('.req').change(e => {
        $(e.target).removeClass('invalid_input')

        if (e.target.classList[0] == $("#input_image")[0].classList[0]) {
            $('.preview_image_con').removeClass('invalid_input')
        }
    })
})



const getData = obj => {
    obj.data ??= ''

    return $.ajax({
        url: obj.url,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: obj.data,
        fail: (e, msg) => { console.log(msg) },
    })
}

const requiredInput = inputs => {
    
    let input = inputs.map((i, field) => {
        if (field.value == '') {
            $(field).addClass('invalid_input')

            if (field.classList[0] == $("#input_image")[0].classList[0]) {
                $('.preview_image_con').addClass('invalid_input')
            }

            return field
        }
    })

    return input
}

const sweetAlert = config => {
    config.time ??= 2000;

    var Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: config.time
    });
    Toast.fire({
        icon: config.icon,
        title: config.title
    })
}

const randChar = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ctr = 0;
    let range = length => 20 ? 20 : length
        range = length <= 11 ? 11 : length

    while (ctr < range) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        ctr++;
    }

    var d = new Date();
    var time_date = d.getSeconds().toString() +
        d.getMinutes().toString() +
        d.getHours().toString() +
        d.getDate().toString() +
        d.getMonth().toString() +
        d.getFullYear().toString();

    return time_date + result;
}
















