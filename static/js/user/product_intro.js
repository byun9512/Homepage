'use strict'

// 스크롤에 따른 이미지 변경
function ProductData() {
    let winWid = $(window).width();
    
    if (winWid <= 780) {
        $("#product_data_contents ul li:first-child img")
        .attr("src", "/static/img/product_intro/img_product_intro_data1_resize.png")
        .css("width", "70%");

        $("#product_data_contents ul li:last-child img")
        .attr("src", "/static/img/product_intro/img_product_intro_data2_resize.png")
        .css("width", "70%");
    } else if (winWid > 779) {
        $("#product_data_contents ul li:first-child img")
        .attr("src", "/static/img/product_intro/img_product_intro_data1.png")
        .css("width", "100%");

        $("#product_data_contents ul li:last-child img")
        .attr("src", "/static/img/product_intro/img_product_intro_data2.png")
        .css("width", "100%");
    } 
    
    if (winWid < 500) {
        $("#product_data_contents img")
        .css("width", "100%");
    }
}

$(function() {
    // Swiper 이벤트 설정
    $(window).on("resize", () => {
        initSwiper2();
        initSwiper3();
        ProductData();
    });

    initSwiper1();
    initSwiper2();
    initSwiper3();
    ProductData();

    // waypoint 애니메이션 이벤트
    WaypointAnimation("product_intro", "80%");
    WaypointAnimation("product_composition", "80%");
    WaypointAnimation("product_data", "80%");
    WaypointAnimation("product_content", "80%");
    WaypointAnimation("product_process", "80%");
    WaypointAnimation("product_protect", "80%");
    WaypointAnimation("product_estimate", "80%");

    // waypoint 스크롤 위쪽 이벤트
    const White = "rgba(255, 255, 255, 0.9)";
    const LightBlack = "rgba(64, 64, 64, 0.9)";
    const Black = "rgba(0, 0, 0, 0.9)";

    // HeaderChange(타겟, 스크롤 방향, 도달 범위, 배경색, 텍스트 색, 로고 색, 아이콘 색)
    HeaderChange("#product_process", "up", "10%", White, "#404040", "blue", "black");
    HeaderChange("#product_process", "down", "10%", LightBlack, "#FFFFFF", "white", "white");
    HeaderChange("#product_protect", "up", "50%", LightBlack, "#FFFFFF", "white", "white");
    HeaderChange("#product_protect", "down", "50%", Black, "#FFFFFF", "white", "white");
    HeaderChange("#product_estimate", "up", "10%", Black, "#FFFFFF", "white", "white");
    HeaderChange("#product_estimate", "down", "10%", White, "#404040", "blue", "black");
});