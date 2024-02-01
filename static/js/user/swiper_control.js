'use strict'

/* swiper 이벤트 */
var mySwiper1, mySwiper2, mySwiper3, mySwiper4, mySwiper5, mySwiper1Clone = undefined;

// 제품 소개 (라인업)
function initSwiper1() {
    mySwiper1 = new Swiper("#product_intro_contents", {
        slidesPerView: "1",
        centeredSlides: true,
        spaceBetween: 20,
        allowTouchMove: false,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next"
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            dynamicMainBullets: 2,
            clickable: true,
        },
        breakpoints: {
            1000: {slidesPerView: "2",}
        }
    });
}

// 제품 소개 (전용 패키지)
function initSwiper2() {
    let screenWidth = $(window).width();
    if ((screenWidth < 999 && screenWidth > 500) && mySwiper2 == undefined) {
        mySwiper2 = new Swiper("#product_composition_contents", {
            slidesPerView: "3",
            spaceBetween: 20,
        });
        // console.log("Composition ON");
    } else if (screenWidth < 499 && mySwiper2 == undefined) {
        mySwiper2 = new Swiper("#product_composition_contents", {
            slidesPerView: "2",
            spaceBetween: 10,
        });
        // console.log("Composition Mobile ON");
    } else if (screenWidth > 1000 && mySwiper2 != undefined) {
        mySwiper2.destroy();
        mySwiper2 = undefined;
        $('.swiper-wrapper').removeAttr('style');
        $('.swiper-slide').removeAttr('style');
        // console.log("Composition OFF");
    }
}

// 제품 소개 (핵심 기능)
function initSwiper3() {
    let screenWidth = $(window).width();
    if (screenWidth < 768 && mySwiper3 == undefined) {
        mySwiper3 = new Swiper("#product_process_contents", {
            slidesPerView: "1",
            spaceBetween: 20,
        });
        // console.log("Process ON");
    } else if (screenWidth > 769 && mySwiper3 != undefined) {
        mySwiper3.destroy();
        mySwiper3 = undefined;
        $('.swiper-wrapper').removeAttr('style');
        $('.swiper-slide').removeAttr('style');
        // console.log("Process OFF");
    }
}

// 어플 소개 (이용 순서)
function initSwiper4() {
    let screenWidth = $(window).width();
    if ((screenWidth < 999 && screenWidth > 500) && mySwiper4 == undefined) {
        mySwiper4 = new Swiper("#app_process_contents", {
            slidesPerView: "1.5",
            spaceBetween: 20,
        });
        console.log("Process ON");
    } else if (screenWidth < 499 && mySwiper4 == undefined) {
        mySwiper4 = new Swiper("#app_process_contents", {
            slidesPerView: "1",
            spaceBetween: 20,
        });
        console.log("Process Mobile ON");
    } else if (screenWidth >= 1000 && mySwiper4 != undefined) {
        mySwiper4.destroy();
        mySwiper4 = undefined;
        $('.swiper-wrapper').removeAttr('style');
        $('.swiper-slide').removeAttr('style');
        console.log("Process OFF");
    }
}

// 홈 (실시간 데이터 센터)
function initSwiper5() {
    let screenWidth = $(window).width();
    if ((screenWidth < 999 && screenWidth > 500) && mySwiper5 == undefined) {
        mySwiper5 = new Swiper("#data_box", {
            slidesPerView: "1.5",
            spaceBetween: 20,
        });
        console.log("Data ON");
    } else if (screenWidth < 499 && mySwiper5 == undefined) {
        mySwiper5 = new Swiper("#data_box", {
            slidesPerView: "1",
            spaceBetween: 10,
        });
        console.log("Data Mobile ON");
    } else if (screenWidth > 1000 && mySwiper5 != undefined) {
        mySwiper5.destroy();
        mySwiper5 = undefined;
        $('.swiper-wrapper').removeAttr('style');
        $('.swiper-slide').removeAttr('style');
        console.log("Data OFF");
    }
}