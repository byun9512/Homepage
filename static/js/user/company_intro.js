'use strict'

$(function() {
    // waypoint 스크롤 이벤트
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");
    
    // waypoint 애니메이션 이벤트
    WaypointAnimation("company_intro", "80%");
    WaypointAnimation("company_value", "80%");
    WaypointAnimation("company_history", "80%");
    WaypointAnimation("company_partners", "80%"); 
    
    // 연혁 애니메이션 이벤트
    // $(window).on("scroll", () => {
    //     let winScl = $(window).scrollTop();
    //     let winHei = $(window).height();
    //     let eleOff = $("#history_line").offset().top;
    //     let eleHei = $("#history_line").outerHeight();
    //     let viewOff = 600;
    //     let scrollVal = winScl - eleOff + viewOff

    //     console.log(scrollVal);
    //     // console.log(eleOff + eleHei - winHei);

    //     if (winScl > (eleOff + eleHei - winHei)) {
    //         $("#history_line").css("height", scrollVal);
    //     }

    //     if (scrollVal > 270) {
    //         $("#history_box ol li:nth-child(1)").addClass("dot");
    //     } else {
    //         $("#history_box ol li:nth-child(1)").removeClass("dot");
    //     }

    //     if (scrollVal > 570) {
    //         $("#history_box ol li:nth-child(2)").addClass("dot");
    //     } else {
    //         $("#history_box ol li:nth-child(2)").removeClass("dot");
    //     }

    //     if (scrollVal > 870) {
    //         $("#history_box ol li:nth-child(3)").addClass("dot");
    //     } else {
    //         $("#history_box ol li:nth-child(3)").removeClass("dot");
    //     }
    // });
});