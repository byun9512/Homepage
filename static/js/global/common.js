'use strict'

/* --- 공통 함수 정의 --- */
/* 공통 버튼 호버 */
function Hover(target) {
    $(target).on("mouseover", () => {
        $(target).children().css({width: "100%", height: "100%", color: "#fff"});
    });
    $(target).on("mouseout", () => {
        $(target).children().css({width: "0", height: "0", color: "inherit"});
    });
}

/* 공통 탭 메뉴 클릭 */
function TabMenu(category, list) {
    $(category).on("click", function() {
        let tapID = $(this).data("tab");

        $(category).removeClass("on");
        $(list).removeClass("on");
        $(this).addClass("on");
        $(list + "[data-content='" + tapID + "']").addClass("on");
    });
}

/* input focus */
function InputFocus(target) {
    $(target).on("focus", function() {
        $(this).parent().addClass("input_focus");
    });

    $(target).on("blur", function() {
        const inputValue = $(this).val();

        if (inputValue === "") {
            $(this).parent().removeClass("input_focus");
        }
    });
}

/* TOP 버튼 기능 */
function TopButton() {
    $("#top_button").on("click", function() {
        $("html").stop().animate({scrollTop: 0}, 500);
    });
}

/* waypoint 애니메이션 */
function WaypointAnimation(target, offset) {
    $(`#${target}`).waypoint(function(way) {
        if (way === "down") {
            $(`#${target} .animated`).removeClass("fade-out-right");
            $(`#${target} .animated`).addClass("fade-in-left");
        } else {
            $(`#${target} .animated`).removeClass("fade-in-left");
            $(`#${target} .animated`).addClass("fade-out-right");
        }

    }, {offset: offset});
}

/* waypoint 스크롤 올릴 시 */
function HeaderChange(target, direction, offset, bg, color, logo, icon) {
    $(`${target}`).waypoint(function(way) {
        if (way === direction) {
            $("#header").css("background", bg);
            $("#header_logo a img").attr("src", `/static/img/ic_main_logo_text_${logo}.svg`);
            $("#header_menu>li>a, .header_login>div a").css("color", color);
            $("#header_hidden_menu_icon").attr("src", `/static/img/ic_header_menu_${icon}.svg`);        
        }
    }, {offset: offset});
}
function HeaderChange2(target, direction, offset, background, bordercolor) {
    $(`${target}`).waypoint(function(way) {
        if (way === direction) {
            $("#header").css("background", background);
            $("#header").css("borderColor", bordercolor);
        }
    }, {offset: offset});
}

/* 견적 문의 버튼 활성화 */
function EstimateButton() {
    const estimateCompany = $("#estimate_company_name").val();
    const estimateLocation = $("#estimate_company_location").val();
    const estimateName = $("#estimate_user_name").val();
    const estimatePhone = $("#estimate_phone").val();

    if (estimateCompany != "" && 
        estimateLocation != "" &&
        estimateName != "" &&
        estimatePhone != "") {
        $("#estimate_confirm").attr("disabled", false);
    } else {
        $("#estimate_confirm").attr("disabled", true);
    }
}
function EstimateDoubleSubmit(form) {
    let isSubmit = false;

    if (isSubmit == false) {
        isSubmit = true;
        form.submit();
        $("#estimate_confirm").attr("disabled", true);
    }
}


$(function() {
    // 로딩 화면
    $("#page_loader_bg").delay("1000").fadeOut();

    // 윈도우 스크롤 시
    $(window).on("scroll", () => {
        let winScl = $(window).scrollTop();

        if (winScl > 500) {
            $("#top_button").fadeIn();
        } else {
            $("#top_button").fadeOut();
        }
    });

    // 페이지 상단으로 올리기 기능
    TopButton();

    // 슬로건 버튼 클릭 시
    Hover("#top_button button");

    // 메뉴 클릭 시
    TabMenu("#product_data_contents ol li", "#product_data_contents ul li");
    TabMenu("#product_content_list ol li", "#product_content_list ul li");
    TabMenu("#policy_menu ul li", "#policy_contents>div");

    // input focus
    InputFocus("#login input");
    InputFocus("#signup_info input");
    InputFocus("#password_find input");
    InputFocus("#password_change input");
    InputFocus(".estimate_container input");
    InputFocus("#site_manager_board_list input");
    InputFocus(".post_container input");

    // 견적 문의 버튼 활성화
    $(".estimate_container input").on("change", () => {EstimateButton();});
});