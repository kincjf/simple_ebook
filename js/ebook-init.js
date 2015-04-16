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

    var FACTOR = 0.95;

    var screenHeight = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    var wrap = $(".ui-content").height(screenHeight);
    var wrapWidth = wrap.width();
    var wrapHeight = wrap.height();

    var bookImage = $(".book-image").css({
    });
    var bookImageNaturalWidth = bookImage[0].naturalWidth;
    var bookImageNaturalHeight = bookImage[0].naturalHeight;

    if(wrapWidth >  bookImageNaturalWidth) {    // 이미지 가로크기가 화면보다 작은 경우
        if(wrapHeight > bookImageNaturalHeight) {       // 이미지 세로크기가 화면보다 더 작은 경우 - 4
            // 확대해도 되고, 안해도됨
        } else {        // 이미지 세로크기가 화면보다 더 큰 경우 - 2
            bookImage.height(wrapHeight * FACTOR);
        }
    } else {        // 이미지 가로크기가 화면보다 더 큰 경우
        if(wrapHeight > bookImageNaturalHeight) {       // 이미지 세로크기가 화면보다 작은 경우 - 3
            bookImage.width(wrapWidth * FACTOR);
        } else {        // 이미지 세로크기가 화면보다 더 큰 경우 - 1
            if((wrapWidth - bookImageNaturalWidth) > (wrapHeight - bookImageNaturalHeight)) {        // 화면보다 이미지가 더 큰 경우
                // 가로 차이가 더 적은경우 - 세로를 줄임
                bookImage.height(wrapHeight * FACTOR);
            } else {
                // 세로 차이가 더 적은경우 - 가로를 줄임
                bookImage.width(wrapWidth * FACTOR);
            }
        }
    }

    var bookImageWidth = bookImage.width();

    if (wrapWidth > 900) {
        gallerySwiper.params.slidesPerView = 2;
    } else {
        gallerySwiper.params.slidesPerView = 1;
    }

    gallerySwiper.onResize();

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