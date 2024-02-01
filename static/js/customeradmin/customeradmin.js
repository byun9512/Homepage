'use strict'

const defaultSet = true;
const filters = ['age', 'gender', 'height', 'weight', 'purpose'];
const nowDate = new Date();
const year = nowDate.getFullYear();
const month = ('0' + (nowDate.getMonth() + 1)).slice(-2);
const day = ('0' + nowDate.getDate()).slice(-2);
const dateStr = `${year}-${month}-${day}`;
const setMinDate = '2020-01-01';

function filteringBoxAllchecking(obj) {
    $(obj).toggleClass('selected_checker');
    let classPrefix = $(obj).attr('class').match(/(\w+)_checker/)[1];
    classPrefix = classPrefix.replace('all', '').replace('one', '');
    if ($(obj).hasClass(classPrefix + 'all_checker')) {

        $('.' + classPrefix + 'all_checker').addClass('selected_checker');
        $('.' + classPrefix + 'one_checker').removeClass('selected_checker');
    } else if ($(obj).hasClass(classPrefix + 'one_checker')) {
        $('.' + classPrefix + 'all_checker').removeClass('selected_checker');

        if ($('.' + classPrefix + 'one_checker.selected_checker').length === 0) {
            $('.' + classPrefix + 'all_checker').addClass('selected_checker');
        }
        if ($('.' + classPrefix + 'one_checker.selected_checker').length ===
            $('.' + classPrefix + 'one_checker').length) {
            $('.' + classPrefix + 'all_checker').addClass('selected_checker');
            $('.' + classPrefix + 'one_checker').removeClass('selected_checker');
        }
    }
}

function userListSubmmit() {
    let moreThanOneCompany = false;
    let moreThanOneDevice = false;

    $('.company_checker.selected_checker').each(function () {
        let idParts = this.id.split('_');
        let idValue = idParts[idParts.length - 1];
        let checkerValue = $('#company_checker_value_' + idValue).val();

        $('<input>').attr({
            type: 'hidden',
            name: 'BelongCompanyId',
            value: checkerValue
        }).appendTo('#user_list_form');

        moreThanOneCompany = true;
    });

    if (!moreThanOneCompany) {
        alert("하나 이상의 회사를 선택해야 합니다..");
    }

    $('.device_checker.selected_checker').each(function () {
        let idParts = this.id.split('_');
        let idValue = idParts[idParts.length - 1];
        let checkerValue = $('#device_serial_' + idValue).val();
        
        $('<input>').attr({
            type: 'hidden',
            name: 'KioskSerial',
            value: checkerValue
        }).appendTo('#user_list_form');

        moreThanOneDevice = true;
    });

    $('<input>').attr({
        type: 'hidden',
        name: 'StartDt',
        value: $('#startDt').val()
    }).appendTo('#user_list_form');

    $('<input>').attr({
        type: 'hidden',
        name: 'EndDt',
        value: $('#endDt').val()
    }).appendTo('#user_list_form');

    if (!moreThanOneDevice) {
        alert("하나 이상의 기기를 선택해야 합니다..");
    }

    if ($('#keyword_box').val().length > 0) {
        $('<input>').attr({
            type: 'hidden',
            name: 'Key',
            value: $('#keyword_selecter option:selected').val()
        }).appendTo('#user_list_form');      

        $('<input>').attr({
            type: 'hidden',
            name: 'Keyword',
            value: $('#keyword_box').val()
        }).appendTo('#user_list_form');   
    }

    $('.device_checker.selected_checker').each(function () {
        let idParts = this.id.split('_');
        let idValue = idParts[idParts.length - 1];
        let checkerValue = $('#device_serial_' + idValue).val();

        $('<input>').attr({
            type: 'hidden',
            name: 'KioskSerial',
            value: checkerValue
        }).appendTo('#user_list_form');

        moreThanOneDevice = true;
    });

    getSelectedFilters();
    $('#user_list_form').submit();
}

function getKioskName() {
    let deviceTypes = document.querySelectorAll('.device_type');
    deviceTypes.forEach(function (span) {
        if (span.textContent.trim() === 'kiosk') {
            let spanIdParts = span.id.split('_');
            let n = spanIdParts[spanIdParts.length - 1];
            let lastDeviceSerial = document.getElementById('last_device_' + n).value;
            let deviceCheckers = document.querySelectorAll('.device_checker_value');

            deviceCheckers.forEach(function (checker) {
                if (checker.value === lastDeviceSerial) {
                    let checkerIdParts = checker.id.split('_');
                    let description = document.getElementById('device_' + checkerIdParts[checkerIdParts.length - 1]);

                    document.getElementById('device_type_' + n).textContent = description.textContent;
                }
            });
        }
    });
}

async function downloadPDF() {
    let element = document.getElementById('customer_amdin_user_list');
    let canvas = await html2canvas(element);
    let imageData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jspdf.jsPDF();
    
    pdf.addImage(imageData, 'JPEG', 0, 0);
    pdf.save('RealPT_test.pdf');
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function linkOn() {
    let currentPath = window.location.pathname;
    $('#navbar_list a').each(function () {
        if ($(this).attr('href') === currentPath) {
            $(this).parent('li').addClass('on');
        }
    });
}

String.prototype.format = function () {
    let str = this;
    for (let i = 0; i < arguments.length; i++) {
        let reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
};

/* TOP 버튼 기능 */
function topButton() {
    $("#top div").on("click", () => {
        $("html").stop().animate({scrollTop: 0}, 500);
    });
}

$(function () {
    getKioskName();
    topButton();
    linkOn();

    // 윈도우 스크롤 시
    $(window).on("scroll", () => {
        let winScl = $(window).scrollTop();
        const topButton = $("#top");

        winScl > 500 ? topButton.fadeIn() : topButton.fadeOut()
    });

    $(document).on("click", ".company_checker", function () {
        this.classList.toggle('selected_checker');
    });

    $(document).on("click", ".device_checker", function () {
        $(this).toggleClass('selected_checker');

        if ($('#device_999999').hasClass('selected_checker') && $(this).not('#device_999999')) {
            $('.device_checker').removeClass('selected_checker');
            $(this).toggleClass('selected_checker');
        } else {
            if ($('.device_checker.selected_checker').not('#device_999999').length > 0) {
                $('#device_999999').removeClass('selected_checker');
            } else {
                $('#device_999999').addClass('selected_checker');
            }
        }

    });

    $(document).on("click", "#user_list_submit", function () {userListSubmmit()});

    $('.date_checker').click(function () {

        $('.date_checker').removeClass('selected_checker');
        $(this).addClass('selected_checker');
        
        let id = $(this).attr('id');
        let days = parseInt(id.split('_')[2]);

        let currentDate = new Date();

        let startDate = new Date();
        startDate.setDate(currentDate.getDate() - days);
        let formattedStartDate = formatDate(startDate);
        $('#startDt').val(formattedStartDate);

        let formattedEndDate = formatDate(currentDate);
        $('#endDt').val(formattedEndDate);

    });

    $('#select_all_company').click(function () {
        if ($('.company_checker.selected_checker').length === $('.company_checker').length) {
            $('.company_checker').removeClass('selected_checker');
        } else {
            $('.company_checker').addClass('selected_checker');
        }
    });

    $('#select_all_device').click(function () {
        if ($('.device_checker.selected_checker').length === $('.device_checker').length) {
            $('.device_checker').removeClass('selected_checker');
        } else {
            $('.device_checker').addClass('selected_checker');
        }
    });
});