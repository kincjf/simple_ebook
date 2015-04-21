/**
 * Created by PastelPlus on 2015-04-17.
 * - jQuery 1.11.1
 * - jQuery mobile 1.4.5
 * - jQuery mobile ios theme(Flat UI)
 * -
 *
 * - Swiper 3.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 */

(function () {

    var $panzoom = $('.swiper-wrapper');
    var $swiperSlide = $('.swiper-slide').css('overflow', 'hidden');
    var $bookImage = $('.book-image');

    var p_top, p_left;
    var img_h = parseInt($swiperSlide.css('height'));
    var img_w = parseInt($swiperSlide.css('width'));

    var scale = 1;

    $panzoom.on('mousewheel.focal', function (e) {
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        img_h = parseInt($bookImage.css('height'));
        img_w = parseInt($bookImage.css('width'));

        if (zoomOut == false) {
            if (scale < 5)
                scale = scale + 0.1;

            $bookImage.css('transform', 'scale(' + scale + ',' + scale + ')');
        } else {
            if (scale > 1)
                scale = scale - 0.1;

            $bookImage.css('margin-left', 0).css('margin-top', 0);
            $bookImage.css('transform', 'scale(' + scale + ',' + scale + ')');
        }
        p_top = (scale * img_h - img_h) / 2;
        p_left = (scale * img_w - img_w);

        $swiperSlide.css('height', parseInt($bookImage.css('height')));
    });

    var m_start = false;
    var startX, startY;
    var current_top;
    var current_left;

    $bookImage.mousedown(function (e) {
        if (scale != 1) {
            gallerySwiper.lockSwipes();
            m_start = true;
            startX = e.pageX;
            startY = e.pageY;
            //current_top = parseInt($('.swiper-slide:eq('+gallerySwiper.activeIndex+')').children().css('margin-top'));
            current_top = parseInt($(e.target).css('margin-top'));
            //current_left = parseInt($('.swiper-slide:eq('+gallerySwiper.activeIndex+')').children().css('margin-left'));
            current_left = parseInt($(e.target).css('margin-left'));
        }
    });

    $bookImage.mousemove(function (e) {
        if (m_start == true) {
            var top = current_top + e.pageY - startY;
            var left = current_left + e.pageX - startX;
            console.log('1 / ' + p_top + '/' + p_left);

            if (top > Math.abs(p_top)) {
                top = Math.abs(p_top);
            } else if (top < -Math.abs(p_top)) {
                top = -Math.abs(p_top);
            }

            if (left > Math.abs(p_left / 2)) {
                left = Math.abs(p_left / 2);
            } else if (left < -Math.abs(p_left)) {
                left = -Math.abs(p_left);
            }
            $(e.target).css('margin-left', left).css('margin-top', top);
            //$('.book-image').css('transform','translate3d('+e.pageX - startX+'px ,'+e.pageY - startY+'px ,0)');
        }
    });

    $bookImage.mouseup(function (e) {
        gallerySwiper.unlockSwipes();
        m_start = false;
    });

})();


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

    var bookImage = $(".book-image").css({});
    var bookImageNaturalWidth = bookImage[0].naturalWidth;
    var bookImageNaturalHeight = bookImage[0].naturalHeight;

    if (wrapWidth > bookImageNaturalWidth) {    // 이미지 가로크기가 화면보다 작은 경우
        if (wrapHeight > bookImageNaturalHeight) {       // 이미지 세로크기가 화면보다 더 작은 경우 - 4
            // 확대해도 되고, 안해도됨
        } else {        // 이미지 세로크기가 화면보다 더 큰 경우 - 2
            bookImage.height(wrapHeight * FACTOR);
        }
    } else {        // 이미지 가로크기가 화면보다 더 큰 경우
        if (wrapHeight > bookImageNaturalHeight) {       // 이미지 세로크기가 화면보다 작은 경우 - 3
            bookImage.width(wrapWidth * FACTOR);
        } else {        // 이미지 세로크기가 화면보다 더 큰 경우 - 1
            if ((wrapWidth - bookImageNaturalWidth) > (wrapHeight - bookImageNaturalHeight)) {        // 화면보다 이미지가 더 큰 경우
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
    loop: true,
    preventClicksPropagation: false     // event bubbling 방지
});

// 목차 설정
$("[data-behavior='contents'] .index").each(function (index, element) {
    $(element).click(function (event) {
        var order = $(this).data("order");
        gallerySwiper.slideTo(order + 1, 500, false);
    });
});
