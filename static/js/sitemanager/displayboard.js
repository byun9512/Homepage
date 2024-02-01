'use strict'

$(function() {
    // 최신 날짜 불러오기
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    $("#today_year").html(year + "년");
    $("#today_month").html(month + "월");
    $("#today_date").html(year + "년" + "&nbsp;" + month + "월" + "&nbsp;" + day + "일 기준");

    setTimeout(() => location.reload(), 300000);
});