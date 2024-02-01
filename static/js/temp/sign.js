'use strict'

/* --- 현재 안쓰는 페이지 --- */

/* input number 타입 길이 조절 이벤트 */
function maxLengthCheck(target){
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

/* 회원가입 유효성 검사 (이메일) */
function emailCheck(email){
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));
}

/* 회원가입 유효성 검사 (생일) */
function isBirthday(dateStr)
{
    var year = Number(dateStr.substr(0,4)); // 입력한 값의 0~4자리까지 (연)
    var month = Number(dateStr.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
    var day = Number(dateStr.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
    var today = new Date(); // 날짜 변수 선언
    var yearNow = today.getFullYear(); // 올해 연도 가져옴
    if (dateStr.length <=8) { // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
        if (1900 > year || year > yearNow){ return false; }
        else if (month < 1 || month > 12) { return false; }
        else if (day < 1 || day > 31) { return false; }
        else if ((month==4 || month==6 || month==9 || month==11) && day==31) { return false; }
        else if (month == 2)
        {
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day>29 || (day==29 && !isleap)) { return false; }
            else { return true; } //end of if (day>29 || (day==29 && !isleap))
        } else { return true; }//end of if
        } else { //1.입력된 생년월일이 8자 초과할때 : auth:false
        return false;
    }
}

/* 회원가입 유효성 검사 */
function checkSignupData() {
    let isError = false;
    const phone = $("#signup_phone").val();
    const name = $("#signup_name").val();
    const password = $("#signup_pw").val();
    const confirmPassword = $("#signup_repw").val();
    const birth = $("#signup_birth").val();
    const weight = $("#signup_weight").val();
    const height = $("#signup_height").val();
    const belongCom = $("#signup_belong_company").val();
    const belongComCode = $("#signup_belong_company_code").val();

    let signupCheck = (target, message) => {
        $(`#signup_${target}_span`).css("display", "block");
        $(`#signup_${target}_span`).html(message);
        isError = true;
    }

    if (phone.length < 11) {
        signupCheck("phone", "휴대폰 번호는 11자로 입력해 주세요.");
    } else {
        $("#signup_phone_span").css("display", "none");
    }

    if (name.length < 1) {
        signupCheck("name", "이름을 입력해 주세요.");
    } else {
        $("#signup_name_span").css("display", "none");
    }
    
    if (password.length < 6) {
        signupCheck("pw", "비밀번호는 6자 이상 입력해 주세요.");
    } else {
        $("#signup_pw_span").css("display", "none");
    }

    if (confirmPassword != password) {
        signupCheck("repw", "동일한 비밀번호를 입력해 주세요.");
    } else {
        $("#signup_repw_span").css("display", "none");
    }

    if (birth < 6 || birth > 100) {
        signupCheck("birth", "6세 ~ 100세 사이로 입력해 주세요.");
    } else {
        $("#signup_birth_span").css("display", "none");
    }

    if (height < 50 || height > 230) {
        signupCheck("height", "50cm ~ 230cm 사이로 입력해 주세요.");
    } else {
        $("#signup_height_span").css("display", "none");
    }
    if (weight < 15 || weight > 200) {
        signupCheck("weight", "15kg ~ 200kg 사이로 입력해 주세요.");
    } else {
        $("#signup_weight_span").css("display", "none");
    }

    if (belongCom == "none") {
        signupCheck("belong_company", "고객사를 선택해 주세요.");
    } else {
        $("#signup_belong_company_span").css("display", "none");
    }

    if (belongComCode.length < 4) {
        signupCheck("belong_company_code", "정확한 고객사 코드를 입력해 주세요.");
    } else {
        $("#signup_belong_company_code_span").css("display", "none");
    }

    return !isError;
}

/* 회원가입 절차 버튼 */
function signupPagination(button, content) {
    $("#signup_terms .animated").addClass("fade-in-top");
    $(button).on("click", () => {
        if (button === "#signup_terms_confirm") {
            if ($("input:checkbox[id=signup_terms_check]").is(":checked") == false) {
                alert("이용 약관에 동의해 주세요.");
                return;
            }
            if ($("input:checkbox[id=signup_privacy_check]").is(":checked") == false) {
                alert("개인정보 수집 및 이용에 동의해 주세요.");
                return;
            }
            $("#signup_terms, #signup_terms_clone").removeClass("on");
            $("#signup_terms, #signup_terms_clone").next().addClass("on");
            $(content).addClass("fade-in-top");

        } else if (button === "#signup_prev_btn") {
            $("#signup_basic, #signup_basic_clone").removeClass("on");
            $("#signup_basic, #signup_basic_clone").prev().addClass("on");
            $(content).addClass("fade-in-top");
            
        } else if (button === "#signup_finish_btn") {
            if (check_signup_data() == false) {
                console.log("signup fail");
                return;
            }

            var data = new Object();
            data.Phone = $("#signup_phone").val();
            data.Password = $("#signup_pw").val();
            data.ConfirmPassword = $("#signup_repw").val();
            data.Email = $("#signup_email").val();
            data.Name = $("#signup_name").val();
            data.Age = Number($("#signup_birth").val());
            data.Height = parseFloat($("#signup_height").val());
            data.Weight = parseFloat($("#signup_weight").val());
            data.BelongCompany = $("#signup_belong_company").val();
            data.BelongCompanyCode = $("#signup_belong_company_code").val();

            if ($("input:radio[id=signup_gender_male]").is(":checked") == true) {
                data.Gender = "m";
            } else {
                data.Gender = "f";
            }

            if ($("input:checkbox[id=signup_ad_check]").is(":checked") == true) {
                data.IsMarketing = true;
            } else {
                data.IsMarketing = false;
            }

            console.log(data);
            console.log(JSON.stringify(data));
            $.ajax({
                url: "/api/UserService/Register",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                data: JSON.stringify(data),
                success: function (data) {
                    console.log(data);
                    if (data.isSuccess == 1) {
                        location.href = "/User/Success";
                    } else {
                        if(data.resultCode == 410){
                            $("#signup_phone_span").html("이미 가입 되어있는 휴대폰 번호입니다.");
                            $("#signup_phone_span").show();
                        }
                        else if (data.resultCode == 415 || data.resultCode == 416) {
                            $("#signup_belong_company_code_span").html(data.message);
                            $("#signup_belong_company_code_span").show();
                        }
                        else {
                            alert(data.message);
                        }
                    }
                },
                error: function (xhr, textStatus, errorThrwown) {
                    console.log(xhr);
                    return false;
                }
            });
        }
    });
}

/* 회원가입 체크 박스 선택 / 해제 */
function signupChecked() {
    /* 모두 체크 시 전체 동의도 체크 */
    $("#signup input").on("change", function() {
        let checking = $("input:checkbox[name='signup_check']:checked");
        
        if (checking.length === 3) {
            $("#signup_check_all").prop("checked", true);
        } else {
            $("#signup_check_all").prop("checked", false);
        }
    });

    /* 전체 동의 클릭 시 */
    $("#signup_check_all").on("click", function() {
        let checkAll = $(this).is(":checked");

        if (checkAll) {
            $("#signup_terms input").prop("checked", true);
        } else {
            $("#signup_terms input").prop("checked", false);
        }
    });
};

$(function () {
    // 회원가입 기능
    signupPagination("#signup_terms_confirm", "#signup_basic .animated");
    signupPagination("#signup_prev_btn", "#signup_terms .animated");
    signupPagination("#signup_finish_btn");
    signupChecked();

    // input maxlength 설정
    maxLengthCheck("signup_birth");
    maxLengthCheck("signup_height");
    maxLengthCheck("signup_weight");
});