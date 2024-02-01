'use strict'

/* --- header 관련 기능 --- */
/* header 햄버거 메뉴 */
function HeaderHiddenMenuResize() {
    let winWid = $(window).innerWidth();
    
    if (winWid > 890) {
        $("#header_hidden_background").fadeOut();
        $("#header_hidden_menu").removeClass("on");
    }
}
function HeaderHiddenMenu() {
    $("#header_hidden_menu_icon").on("click", () => {
        $("#header_hidden_background").fadeIn();
        $("#header_hidden_menu").addClass("on");
    });

    $("#header_hidden_background, #header_hidden_menu_exit").on("click", () => {
        $("#header_hidden_background").fadeOut();
        $("#header_hidden_menu").removeClass("on");
    });
}

/* header 사이드 메뉴 */
function HeaderSideMenu() {
    $("#header_menu li:last-child").on("mouseover", () => {
        $("#header_side_menu").addClass("on");
    });

    $("#header_menu li:last-child, #header_side_menu").on("mouseout", () => {
        $("#header_side_menu").removeClass("on");
    });
}

$(function() {
    // header 햄버거 메뉴 기능
    HeaderHiddenMenuResize();
    HeaderHiddenMenu();
    $(window).on("resize", () => {HeaderHiddenMenuResize();});

    // header 사이드 메뉴 기능
    HeaderSideMenu();
});