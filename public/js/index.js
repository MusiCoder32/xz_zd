$(function () {
    //ajax("http://localhost:3000/index")
    $.ajax({
        url: "http://localhost:3000/index",
        type: "get",
        dataType: "json" //JSON.parse(res)
    })
        .then(products => {
        new Vue({
            el:"#main>div:nth-child(2)>h3:first-child",
            data:{products}
        })
        });
    var $divLift = $('#main>div:last-child');
    $(window).scroll(function () {
        var $fs = $('#main>div:nth-child(2)>h3');
        var $f1 = $fs.first();
        var scrollTop = $('html,body').scrollTop();
        var offsetTop = $f1.offset().top;
        if (innerHeight / 2 + scrollTop > offsetTop) {
            $divLift.removeClass('d-none');
        } else {
            $divLift.addClass("d-none");
        }

        $fs.each((i, f) => {
            offsetTop = $(f).offset().top;
            if (innerHeight / 2 + scrollTop > offsetTop) {
                $divLift.children(`:eq(${i})`).addClass('btn-danger')
                    .siblings().removeClass('btn-danger');
            }
        })
    })
    $divLift.on('click', 'button', function () {
        var i=$(this).index();
        var offsetTop=$(`#main>div:nth-child(2)>h3:eq(${i})`)
            .offset().top;
        $("html").animate({
            scrollTop:offsetTop
        },500)
    })
});