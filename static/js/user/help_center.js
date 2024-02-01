'use strict'

// 입력 박스 비활성화
function checkInputFields() {
    const boardTitle = $("input[name=BoardTitle]").val();
    const boardContent = $("textarea[name=BoardContents]").val();

    if (boardTitle != "" && boardContent != "") {
        $(".post_container input[type=submit]").attr("disabled", false);
    } else {
        $(".post_container input[type=submit]").attr("disabled", true);
    }
}

$(function() {
    // waypoint 스크롤 이벤트
    // HeaderChange("main", "up", "-50", "transparent", "#FFFFFF", "white", "white");
    // HeaderChange("main", "down", "-50", "#FFFFFF", "#404040", "blue", "black");
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");

    // waypoint 애니메이션 이벤트
    WaypointAnimation("notice_board", "80%");
    WaypointAnimation("notice_board_detail", "80%");
    WaypointAnimation("writing_board", "80%");
    WaypointAnimation("modify_board", "80%");
    WaypointAnimation("estimate", "80%");

    // 입력 박스 비활성화
    checkInputFields();
    $(".post_asset").on("propertychange change keyup paste input", () => {checkInputFields();});

    // 게시글 삭제 경고창
    $("#notice_board_delete").on("click", (e) => {
        if (!confirm("게시글을 삭제하시겠습니까?")) {e.preventDefault();}
    });
});