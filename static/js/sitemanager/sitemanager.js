'use strict'

var isWorking = false;

// 리스트 클릭 시 세부 리스트 출력
function tempModiCompany(row) {
    isWorking = true;
    
    let id = row[1];
    let rowName = row[0];
    let temprow = "";
    let check = $("#active_"+id).val() == "1" ? "checked" : "";
    
    temprow += "<tr id=\"temp_"+id +"\" class='company_list_detail'>";
    temprow += "<td><input type=\"text\" value=\"" + id + "\" disabled/>";
    temprow += "<input name =\"Id\" type=\"hidden\" value=\"" + id + "\"/>";
    temprow += "<input name =\"Code\" type=\"hidden\" value=\"" + $("#comcode_" + id).val() + "\"/></td>";
    temprow += "<td><input name=\"Name\" type=\"text\" value=\"" + $("#companme_" + id).val() + "\"/></td>";
    temprow += "<td><input type=\"text\" value=\"" + $("#comcode_"+id).val() + "\" disabled/></td>";
    temprow += "<td><input name=\"MaxUserCount\" type=\"text\" value=\"" + $("#usermax_"+id).val() + "\"/></td>";
    temprow += "<td><input name=\"Address\" type=\"text\" value=\"" + $("#addr_"+id).val() + "\"/></td>";
    temprow += "<td><input class=\"activeCheck\" type=\"checkbox\" " + check + " value=\"1\"/><input id=\"hiddenActive\" name=\"IsActive\" type=\"hidden\" value=\"\"/></td>";
    temprow += "<td>";
    temprow += "<select name=\"LocationId\">";
    temprow += "<option value=\"1\" " + ($("#location_"+id).val() == "1" ? "selected" : "" ) + ">강원도</option>";
    temprow += "<option value=\"2\" " + ($("#location_"+id).val() == "2" ? "selected" : "" ) + ">경기도</option>";
    temprow += "<option value=\"3\" " + ($("#location_"+id).val() == "3" ? "selected" : "" ) + ">서울</option>";
    temprow += "<option value=\"4\" " + ($("#location_"+id).val() == "4" ? "selected" : "" ) + ">대전, 충청남도</option>";
    temprow += "<option value=\"5\" " + ($("#location_"+id).val() == "5" ? "selected" : "" ) + ">경상북도</option>";
    temprow += "<option value=\"6\" " + ($("#location_"+id).val() == "6" ? "selected" : "" ) + ">충청북도</option>";
    temprow += "<option value=\"7\" " + ($("#location_"+id).val() == "7" ? "selected" : "" ) + ">광주, 전라남도</option>";
    temprow += "<option value=\"8\" " + ($("#location_"+id).val() == "8" ? "selected" : "" ) + ">전라북도</option>";
    temprow += "<option value=\"9\" " + ($("#location_"+id).val() == "9" ? "selected" : "" ) + ">경상남도</option>";
    temprow += "<option value=\"10\" " + ($("#location_"+id).val() == "10" ? "selected" : "" ) + ">제주도</option>";
    temprow += "</select>";
    temprow += "</td>";
    temprow += "</tr>";
    temprow += "<tr id=\"temp_button_"+id +"\" class='company_list_submit'>";
    temprow += "<td>";
    temprow += "<button type=\"submit\">적용</button>";
    temprow += "<button type=\"button\" onclick=\"cancelmodiCompany(" + id + ");\">취소</button>";
    temprow += "</td>";
    temprow += "</tr>";
    
    $("#"+row[0]+"_"+row[1]).after(temprow);
}

function tempModiAdmin(row) {
    isWorking = true;

    let id = parseFloat(row[1]);
    let rowName = row[0];
    let belong = $('#BelongCompanyId_' + id).val();
    let temprow = "";

    let sendData = { userId: id }

    $.ajax({
        type: "POST",
        url: "/api/AdminEnter/GetList",
        data: JSON.stringify(sendData) ,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.isSuccess) {

                let o = result.companyList;
                let c = result.authorityList;
                
                o.forEach(function (v) {
                    let checked = "";
                    let checked2 = belong == v.id ? "disabled" : "";

                    c.forEach(function (a, i) {
                        if (a.concurrent == v.id) {
                            checked = "checked ";

                            c.splice(i, 1);
                            
                        } else if (a.concurrent > v.id) {
                            return;
                        }
                    });

                    temprow += "<tr id=\"temp_" + v.id + "\" class='authority_list_detail'>";
                    temprow += "<td>" + v.id + "</td>";
                    temprow += "<td>" + v.name + "</td>";
                    temprow += "<td><input type=\"checkbox\" class='authority_check' " + checked + checked2 + " value='" + v.id + "'/></td>";
                    temprow += "</tr>";
                });


                temprow += "<tr id=\"temp_button_" + id + "\" class='authority_list_submit'>";
                temprow += "<td colspan='3'>";
                temprow += "<button type=\"button\" onclick=\"saveModiAuthority(" + id + ");\">적용</button>";
                temprow += "<button type=\"button\" onclick=\"cancelModiAuthority();\">취소</button>";
                temprow += "</td>";

                $("#" + row[0] + "_" + row[1]).after(temprow);

            }
                
        }
    });

}

// 리스트 취소 클릭 시 세부 리스트 삭제
function cancelmodiCompany(id) {
    $("#temp_"+ id).remove();
    $("#temp_button_"+ id).remove();

    isWorking = false;
}

function cancelModiAuthority() {
    $(".authority_list_detail").remove();
    $(".authority_list_submit").remove();

    isWorking = false;
} 
function saveModiAuthority(id) {

    let sendData = { userId: id }
    let companyList = [];

    $('.authority_check:checked').each(function (i, v) {
        companyList[i] = $(v).val();
    })

    sendData.companyList = companyList;

    $.ajax({
        type: "POST",
        url: "/api/AdminEnter/ModifyAdminAuthority",
        data: JSON.stringify(sendData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.isSuccess) {

                $(".authority_list_detail").remove();
                $(".authority_list_submit").remove();

                isWorking = false;

            } else {
                alert("정보변경 실패");
            }
            

        }
    });
    
}

/* 고객사 추가 버튼 활성화 */
function NewBelongCompanyButton() {
    let belongCompanyName = $("#belong_company_name").val();
    let belongCompanyMaxUser = $("#belong_company_max_user").val();
    let belongCompanyAddress = $("#belong_company_address").val();

    if (belongCompanyName != "" &&
        belongCompanyMaxUser != "" &&
        belongCompanyAddress != "")
    {
        $("#add_belong_company").attr("disabled", false);
    } else {
        $("#add_belong_company").attr("disabled", true);
    }
}

function NewCustomerAdminButton() {
    let loginName = $("#LoginName").val();
    let password = $("#Password").val();

    if (loginName != "" && password != "") {
        $("#add_admin").attr("disabled", false);
    } else {
        $("#add_admin").attr("disabled", true);
    }
}

$(function() {
    // waypoint 스크롤 이벤트
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");

    // waypoint 애니메이션 이벤트
    WaypointAnimation("site_manager_board", "80%");

    // 리스트 클릭 이벤트
    $(document).on("click", ".company_list", function () {
        let row = $(this).attr("id").split("_");

        if (row != null && row[0] != "" && !isWorking) {
            switch (row[0]) {
                case "comprow": tempModiCompany(row); break;
                default: break;
            }
        }
    });

    $(document).on("click", ".admin_list", function () {

        let row = $(this).attr("id").split("_");

        if (row != null && row[0] != "" && !isWorking) {
            switch (row[0]) {
                case "adminrow": tempModiAdmin(row); break;
                default: break;
            }
        }

    });

    $("#new_customer_admin input[type=text]").on("change", () => { NewCustomerAdminButton() });

    // 고객사 추가 버튼 활성화
    $("#new_belong_company input[type=text]").on("change", () => { NewBelongCompanyButton() });

    // 고객사 내용 추가 및 수정
    $('form').on('submit', function (e) {
        if ($('.activeCheck').is(':checked')) {
            $('#hiddenActive').val('true');
        } else {
            $('#hiddenActive').val('false');
        }
    });

    $('#rsbox').text($('#smres').val());
});


