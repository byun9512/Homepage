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

/* 회원가입 유효성 검사 */
function CheckSignupData() {
    let isError = false;
    const password = $("#signup_pw").val();
    const confirmPassword = $("#signup_repw").val();
    const weight = $("#signup_weight").val();
    const height = $("#signup_height").val();
    const belongCom = $("#signup_belong_company").val();
    const belongComCode = $("#signup_belong_company_code").val();

    let SignupCheck = (target, message) => {
        $(`#signup_${target}_span`).css("display", "block");
        $(`#signup_${target}_span`).html(message);
        isError = true;
    }
    
    if (password.length < 6) {
        SignupCheck("pw", "비밀번호는 6자 이상 입력해 주세요.");
    } else {
        $("#signup_pw_span").css("display", "none");
    }

    if (confirmPassword != password) {
        SignupCheck("repw", "동일한 비밀번호를 입력해 주세요.");
    } else {
        $("#signup_repw_span").css("display", "none");
    }

    if (height < 50 || height > 230) {
        SignupCheck("height", "50cm ~ 230cm 사이로 입력해 주세요.");
    } else {
        $("#signup_height_span").css("display", "none");
    }
    if (weight < 15 || weight > 200) {
        SignupCheck("weight", "15kg ~ 200kg 사이로 입력해 주세요.");
    } else {
        $("#signup_weight_span").css("display", "none");
    }

    if (belongCom == "none") {
        SignupCheck("belong_company", "고객사를 선택해 주세요.");
    } else {
        $("#signup_belong_company_span").css("display", "none");
    }

    if (belongComCode.length < 6) {
        SignupCheck("belong_company_code", "정확한 고객사 코드를 입력해 주세요.");
    } else {
        $("#signup_belong_company_code_span").css("display", "none");
    }

    return !isError;
}

/* 회원가입 완료 버튼 */
function SignupSubmit(button) {
    $(`#${button}`).on("click", () => {
        if (CheckSignupData() == false) {
            console.log("signup fail");
            return;
        }

        var data = new Object();
        data.Sid = $("#sid").val();
        data.Password = $("#signup_pw").val();
        data.ConfirmPassword = $("#signup_repw").val();
        data.Email = $("#signup_email").val();
        data.Height = parseFloat($("#signup_height").val());
        data.Weight = parseFloat($("#signup_weight").val());
        data.BelongCompany = $("#signup_belong_company").val();
        data.BelongCompanyCode = $("#signup_belong_company_code").val();

        $.ajax({
            url: "/api/UserService/Signup",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                if (data.isSuccess == 1) {
                    location.href = "/User/SignupSuccess";
                } else {
                    if (data.resultCode == 415 || data.resultCode == 416) {
                        $("#signup_belong_company_code_span").html(data.message);
                        $("#signup_belong_company_code_span").show();
                    }
                    else {alert(data.message);}
                }
            },
            error: function (xhr, textStatus, errorThrwown) {
                console.log(xhr);
                return false;
            }
        });
    });
}

/* 회원가입 체크 박스 선택 / 해제 */
function SignupChecked() {
    /* 모두 체크 시 전체 동의도 체크 */
    $("#signup_terms input").on("change", function() {
        let checking = $("input:checkbox[name='signup_require_check']:checked");
        
        if (checking.length === 3) {
            $("#signup_check_all").prop("checked", true);
            $(".signup_button input").attr("disabled", false);
        } else {
            $("#signup_check_all").prop("checked", false);
            $(".signup_button input").attr("disabled", true);
        }
    });

    /* 전체 동의 클릭 시 */
    $("#signup_check_all").on("click", function() {
        let checkAll = $(this).is(":checked");

        if (checkAll) {
            $("#signup_terms input").prop("checked", true);
            $(".signup_button input").attr("disabled", false);
        } else {
            $("#signup_terms input").prop("checked", false);
            $(".signup_button input").attr("disabled", true);
        }
    });
};

$(function () {
    // waypoint 스크롤 이벤트
    // HeaderChange("main", "up", "-50", "transparent", "#FFFFFF", "white", "white");
    // HeaderChange("main", "down", "-50", "#FFFFFF", "#404040", "blue", "black");
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");

    // waypoint 애니메이션 이벤트
    WaypointAnimation("signup_user", "80%");
    WaypointAnimation("signup_terms", "80%");
    WaypointAnimation("signup_parent_auth", "80%");
    WaypointAnimation("signup_self_auth", "80%");
    WaypointAnimation("signup_info", "80%");
    WaypointAnimation("signup_success", "80%");

    // 회원가입 기능
    SignupChecked();
    SignupSubmit("sign");
});

