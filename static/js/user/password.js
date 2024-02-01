'use strict'

// 인증번호 발송 버튼 활성화
function SendAuthCheck() {
    $("#Phone").on("propertychange change paste input", () => {
        var phone = $("#Phone").val();

        if (phone.length > 10) {
            $("#SendAuthKey").attr("disabled", false);
        } else {
            $("#SendAuthKey").attr("disabled", true);
        }
    });
}

// 인증번호 발송 클릭 시
function SendAuthProcess() {
    var phone = $("#Phone").val();
    var data = new Object();

    data.Phone = phone;
    $("#PhoneSpan").html("인증번호를 발송 중입니다.");

    $.ajax({
        url: "/api/UserService/SendAuthKey",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        data: JSON.stringify(data),

        success: function (data) {
            if (data.isSuccess == 1) {
                $("#find_password").css("display", "block");
                $("#SendAuthKey").val("인증번호 재전송");
                $("#Phone").attr("readonly", true);
                $("#PhoneSpan").html(data.message + " 로 인증번호를 발송 했습니다.");
            } else {
                $("#PhoneSpan").html("가입되어 있지 않은 휴대폰 번호입니다.");
            }
        },
        error: function (xhr, textStatus, errorThrwown) {
            return false;
        }
    });
}

// 비밀번호 변경 완료 클릭 시
function NewPasswordProcess() {
    var phone = $("#Phone").val();
    var authKey = $("#AuthKey").val();
    var password = $("#Password").val();
    var confirmPassword = $("#ConfirmPassword").val();
    var isError = false;

    if (phone.length < 11) {
        $("#PhoneSpan").html("휴대폰 번호를 입력해 주세요.");
        isError = true;
    }
    if (authKey.length < 1) {
        $("#AuthKeySpan").html("인증번호를 입력해 주세요.");
        isError = true;
    }
    if (password.length < 6) {
        $("#PasswordSpan").html("비밀번호는 6자 이상 입력해 주세요.");
        isError = true;
    }
    if (password.length < 1) {
        $("#PasswordSpan").html("비밀번호를 입력해 주세요.");
        isError = true;
    }
    if (password != confirmPassword) {
        $("#PasswordConfirmSpan").html("비밀번호가 일치하지 않습니다.")
        isError = true;
    }

    if (isError == true) {
        return false;
    } else {
        var data = new Object();
        data.Phone = phone;
        data.AuthKey = authKey;
        data.Password = password;
        data.ConfirmPassword = confirmPassword;

        $.ajax({
            url: "/api/UserService/FindPassword",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            data: JSON.stringify(data),
            success: function (data) {
                $("#SendAuthKey").attr("disabled", false);
                if (data.isSuccess == 1) {
                    alert("비밀번호 변경에 성공했습니다.");
                    location.href = "/User/Login"; // 유저
                } else {
                    $("#AuthKeySpan").html("인증 키가 일치하지 않습니다.");
                }
            },
            error: function (xhr, textStatus, errorThrwown) {
                return false;
            }
        });
    }
}

$(function () {
    // waypoint 스크롤 이벤트
    // HeaderChange("main", "up", "-50", "transparent", "#FFFFFF", "white", "white");
    // HeaderChange("main", "down", "-50", "#FFFFFF", "#404040", "blue", "black");
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");
    
    // 비밀번호 변경 기능
    SendAuthCheck();
    $("#SendAuthKey").on("click", () => {SendAuthProcess()});
    $("#NewPasswordChange").on("click", () => {NewPasswordProcess()});

    // waypoint 애니메이션 이벤트
    WaypointAnimation("password_find", "80%");
    WaypointAnimation("password_change", "80%");
});