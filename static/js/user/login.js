'use strict'

$(function () {
    // waypoint 스크롤 이벤트
    // HeaderChange("main", "up", "-50", "transparent", "#FFFFFF", "white", "white");
    // HeaderChange("main", "down", "-50", "#FFFFFF", "#404040", "blue", "black");
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");
    
    // 로그인 정보 입력 시 버튼 활성화
    $("#login input").on("propertychange change keyup paste input", () => {
        let loginPhone = $("input[id=Phone]").val();
        let loginPw = $("input[id=Password]").val();

        if (loginPhone != "" && loginPw != "") {
            $("#login input[type=submit]").attr("disabled", false);
        } else {
            $("#login input[type=submit]").attr("disabled", true);
        }
    });

    // 로그인 오류 시 포커스 유지
    if ($("input[id=Phone]").val() !="") {
        $("input[id=Phone]").parent().addClass("input_focus");
    }
});