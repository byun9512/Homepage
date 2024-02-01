'use strict'

/* 현재 시간 불러오기 */
function Clock() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1 ;
    const date = time.getDate();
    const week = time.getDay();
    const weekList = ["일", "월", "화", "수", "목", "금", "토"]
    const hour = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");

    $("#data_table_date").text(
        `(${year}년 ${month}월 ${date}일 ${hour}:${minutes}:${seconds} 기준)`
    );
}

$(function() {
    // waypoint 스크롤 이벤트
    // HeaderChange("main", "up", "-50", "transparent", "#FFFFFF", "blue", "white");
    // HeaderChange("main", "down", "-50", "#FFFFFF", "#404040", "blue", "black");
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");

    // Swiper 이벤트 설정
    $(window).on("resize", () => {initSwiper5();});
    initSwiper5();

    // 현재 시간 불러오기
    Clock();
    setInterval(Clock, 1000);
});