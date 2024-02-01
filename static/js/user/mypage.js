'use strict'

/* input number 타입 길이 조절 이벤트 */
function MaxLengthCheck(target){
    let object = document.getElementById(target);

    object.addEventListener("keydown", function(e) {
        let targetMaxLength = e.target.maxLength;
        let targetValueLength = e.target.value.length;

        if (targetValueLength > targetMaxLength) {
            e.target.value = e.target.value.substr(0, targetMaxLength);
            // console.log(e.target.value.length);
        }
    });
}

/* 사진 업로드 기능 */
function Uploadfile() {
    console.log("uploadfile");
    var form = $('#uploadFrm')[0]; // FormData 객체 생성
    var formData = new FormData(form);
    $.ajax({
        url: "/User/PictureUpload",
        data: formData, type: 'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: 'json',
        cache: false,
        success: function (result) {
            console.log(result);

            if (result.filePath.length > 5) {
                var d = new Date();
                $(".user-picture").attr("src", result.filePath + "?a=" + Math.random());
            }
        }
    });
}

/* 운동 목적 선택 기능 */
function SetPurpose(select) {
    if (select == "6.대사성 질환 관리") {
        $("#Purpose2").show();
        if ($("#Purpose2").val() == "기타(직접입력)") {
            $("#Purpose3").show();
        }
        else {
            $("#Purpose3").hide();
        }
    }
    else {
        $("#Purpose2").hide();
        $("#Purpose3").hide();
    }
}

/* 텍스트 박스 활성화 이벤트 */
function CheckboxEvent(section) {
    let Checkbox = $(`#${section}`).find("input[type=checkbox]")[0];
    let Textarea = $(`#${section}`).find("textarea")[0];

    $(Checkbox).on("change", function() {
        let TextareaContainer = (onText) => {
            if (Checkbox.checked == true) {
                $(Textarea).val(onText);
                $(Textarea).attr("disabled", true);
            } else {
                $(Textarea).val("");
                $(Textarea).attr("disabled", false);
            }
        }

        if (section === "mypage_info_history") {
            TextareaContainer("과거 병력 없음");
        } else if (section === "mypage_info_medication") {
            TextareaContainer("복용 중인 약물 없음");
        }
    });
}


$(function () {
    // waypoint 스크롤 이벤트
    // HeaderChange("main", "up", "-50", "transparent", "#FFFFFF", "white", "white");
    // HeaderChange("main", "down", "-50", "#FFFFFF", "#404040", "blue", "black");
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");
    
    // waypoint 애니메이션 이벤트
    WaypointAnimation("mypage_intro", "80%");
    WaypointAnimation("mypage_info", "80%");

    /* 과거 병력, 복용 약물 체크 박스 기능 */
    CheckboxEvent("mypage_info_history");
    CheckboxEvent("mypage_info_medication");

    // input maxlength 설정
    MaxLengthCheck("mypage_birth");
    MaxLengthCheck("mypage_height");
    MaxLengthCheck("mypage_weight");

    /* 스크롤에 따른 기능 (마이페이지) */
    $(".smooth_wrapper").on("scroll", () => {
        const scrollTop = $(".smooth_wrapper").scrollTop();
        console.log(scrollTop);

        // header 컨텐츠 색상 변경
        if (scrollTop >= 399 && scrollTop <= 1749) {
            header_change("#fff", "#404040", "text_black", "#fff");
        } else if (scrollTop <= 1750) {
            header_change("transparent", "#fff", "text_white", "#329EFF");
        } else {
            header_change("#1E1E1E", "#fff", "text_white", "#1E1E1E");
        }
    });

    /* 운동 목적 select 기능 */
    $("#Purpose1").change(function () {
        SetPurpose($(this).val());
    });
    $("#Purpose2").change(function () {
        if ($(this).val() == "기타(직접입력)") {
            $("#Purpose3").show();
        }
        else {
            $("#Purpose3").hide();
        }
    });
    SetPurpose($("#Purpose1").val());
});