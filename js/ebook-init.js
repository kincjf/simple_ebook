/**
 * Created by PastelPlus on 2015-04-17.
 * - jQuery 1.11.1
 * - jQuery mobile 1.4.5
 * - jQuery mobile ios theme(Flat UI)
 *
 * - Swiper 3.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 */
var scaleContentToDevice = function () {
    $.mobile.loading("show", {
        text: "loading...",
        textVisible: true
    });

    var wrapHeight = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    var wrap = $(".ui-content").height(wrapHeight);
    var wrapWidth = wrap.width();
    var wrapHeight = wrap.height();

    var bookImage = $(".book-image").height(wrapHeight * 0.95);
    var bookImageWidth = bookImage.outerWidth();

    if (wrapWidth > bookImageWidth * 2) {
        gallerySwiper.params.slidesPerView = 2;
    } else {
        gallerySwiper.params.slidesPerView = 1;
    }

    $.mobile.loading("hide");
}

$(document).on("pagecontainershow", function () {
    scaleContentToDevice();

    $(window).on("resize orientationchange", function () {
        scaleContentToDevice();
    })
});

var gallerySwiper = new Swiper('.gallery-top', {
    keyboardControl: true,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    preventClicksPropagation: false     // event bubbling 방지
});

// 목차 설정
$("[data-behavior='contents'] .index").each(function (index, element) {
    $(element).click(function (event) {
        var order = $(this).data("order");
        gallerySwiper.slideTo(order, 500, false);
    });
});