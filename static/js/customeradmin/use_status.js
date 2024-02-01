'use strict'

/* 모달 창 열기, 닫기 */
function basicModal(button, modal) {
    let targetBtn = document.getElementById(button);
    let targetModal = document.getElementById(modal);
    let targetClose = document.querySelectorAll('.modal_close');

    targetBtn.addEventListener('click', function() {targetModal.style.display = 'flex'});
    targetClose.forEach((btn) => {
        btn.addEventListener('click', function() {targetModal.style.display = 'none'});
    });
    window.addEventListener('click', function(event) {
        if (event.target == targetModal) {
            targetModal.style.display = 'none';
        }
    });
}

/* 유저 상세 열기, 닫기 */
function userModal(button, modal) {
    let targetBtn = document.getElementById(button);
    let targetModal = document.getElementById(modal);
    let targetClose = targetModal.children[0].children[0].children[1];

    targetBtn.addEventListener('click', () => {targetModal.style.display = 'flex'});
    targetClose.addEventListener('click', () => {targetModal.style.display = 'none'});
    window.addEventListener('click', (event) => {
        if (event.target == targetModal) {
            targetModal.style.display = 'none';
        }
    });
}

/* input number 타입 길이 조절 */
function maxLengthCheck(target){
    let object = document.getElementById(target);

    object.addEventListener("keydown", function(e) {
        let targetMaxLength = e.target.maxLength;
        let targetValueLength = e.target.value.length;

        if (targetValueLength > targetMaxLength) {
            e.target.value = e.target.value.substr(0, targetMaxLength);
        }
    });
}

/* 체크 박스 선택 및 해제 */
function listCheck() {
    /* 체크박스 전체 클릭 시 */
    $("#listCheckAll").on("click", () => {
        let checkAll = $("#listCheckAll").is(":checked");

        if (checkAll) {
            $("#device_user_list input").prop("checked", true);
        } else {
            $("#device_user_list input").prop("checked", false);
        }
    });

    $("#device_user_list input[type=checkbox]").on('change', function() {
        let printBtn = $("#user_result_print");
        let checking = $(this).is(":checked");

        if (checking) {
            printBtn.css('display', 'flex');
        } else {
            printBtn.css('display', 'none');
        }
    });
};

/* 컨텐츠 표시 항목 */
function contentSelect() {
    $("#contentSelect").on('change', function() {
        let val = this.value;
        let list = $("#device_user_list tbody tr td ul");
        let useData = document.querySelectorAll('.use_data')
        let scoreData = document.querySelectorAll('.score_data')
        let rateData = document.querySelectorAll('.rate_data')

        if (val == 'use') {
            list.css('height', '44px');
            $(useData).css('display', 'flex');
            $(scoreData).css('display', 'none');
            $(rateData).css('display', 'none');
        } else if (val == 'score') {
            list.css('height', '44px');
            $(useData).css('display', 'none');
            $(scoreData).css('display', 'flex');
            $(rateData).css('display', 'none');
        } else if (val == 'rate') {
            list.css('height', '54px');
            $(useData).css('display', 'none');
            $(scoreData).css('display', 'none');
            $(rateData).css('display', 'grid');
        }
    })
}

/* 운동 목적 중 대사성 질환 관리 선택 시 */
function metabolicSelect() {
    const purposeSelect = document.querySelectorAll('#user_purpose');
    const purposeMetabolic = document.querySelectorAll('#user_purpose_metabolic');
    const purposeEtc = document.getElementById('user_purpose_etc');

    purposeSelect.forEach((el) => {
        el.addEventListener('change', (e) => {
            if (e.target.value === '6.대사성 질환 관리') {
                purposeMetabolic[0].style.display = 'block';
            } else {
                purposeMetabolic[0].style.display = 'none';
                purposeEtc.style.display = 'none';
            }
        });
    });

    purposeMetabolic.forEach((el) => {
        el.addEventListener('change', (e) => {
            if (e.target.value === '기타(직접입력)') {
                purposeEtc.style.display = 'block';
            } else {
                purposeEtc.style.display = 'none';
                purposeEtc.value = "";
            }
        });
    });
}

/* 과거 병력, 약물 복용 유무 없음 */
function textareaDisabled() {
    const diseaseArea = document.getElementById('user_past_disease');
    const medicineArea = document.getElementById('user_medicine');
    let diseaseCheck = document.getElementById('user_past_disease_none');
    let medicineCheck = document.getElementById('user_medicine_none');

    diseaseCheck.addEventListener('change', (el) => {
        if (el.target.checked) {
            diseaseArea.disabled = true;
            diseaseArea.value = "";
            diseaseArea.placeholder = '과거 병력 없음';
        } else {
            diseaseArea.disabled = false;
            diseaseArea.placeholder = '자신이 가진 과거 병력을 자세하게 입력해 주세요.';
        }
    });

    medicineCheck.addEventListener('change', (el) => {
        if (el.target.checked) {
            medicineArea.disabled = true;
            medicineArea.value = "";
            medicineArea.placeholder = '복용 약물 없음';
        } else {
            medicineArea.disabled = false;
            medicineArea.placeholder = '현재 복용 중인 약물을 자세하게 입력해 주세요.';
        }
    });
}

/* 디바이스 선택 시 */
function deviceSelect() {
    const deviceSelect = document.querySelectorAll('#user_record_device');
    const kioskContents = document.querySelectorAll('#user_record_kiosk_contents');
    const mobileContents = document.querySelectorAll('#user_record_mobile_contents');
    const dateYearSelect = document.querySelectorAll('#user_record_year');
    const dateMonthSelect = document.querySelectorAll('#user_record_month');
    const dataSearch = document.getElementById('user_data_search_button');

    // 디바이스 선택 시
    deviceSelect.forEach((el) => {
        el.addEventListener('change', (e) => {
            if (e.target.value === 'kiosk') {
                kioskContents[0].style.display = 'block';
                mobileContents[0].style.display = 'none';
            } else {
                kioskContents[0].style.display = 'none';
                mobileContents[0].style.display = 'block';
            }
        });
    });

    // 컨텐츠 선택 시
    let selectContents = (t) => {
        t.forEach((el) => {
            el.addEventListener('change', (e) => {
                if (!e.target.value) {
                    dateYearSelect[0].disabled = true;
                    dateMonthSelect[0].disabled = true;
                } else {
                    dateYearSelect[0].disabled = false;
                    dateMonthSelect[0].disabled = false;
                }
            });
        });
    }
    selectContents(kioskContents);
    selectContents(mobileContents);

    // 기록 날짜 선택 시
    let dateContents = (t) => {
        t.forEach((el) => {
            el.addEventListener('change', (e) => {
                const yearValue = dateYearSelect[0].value
                const monthValue = dateMonthSelect[0].value

                if (!yearValue || !monthValue) {
                    dataSearch.disabled = true;
                } else {
                    dataSearch.disabled = false;
                }
            });
        });
    }
    dateContents(dateYearSelect);
    dateContents(dateMonthSelect);
}

/* 기록 날짜 선택 후 조회 시 */
function recordSearch() {
    const dataSearch = document.getElementById('user_data_search_button');
    const detailSelect = document.querySelectorAll('#user_record_detail');
    const recordDelete = document.getElementById('user_record_delete_button');

    // 조회 버튼 클릭 시
    dataSearch.addEventListener('click', () => {
        detailSelect[0].disabled = false;
        detailSelect[0].selectedIndex = 0;
        recordDelete.disabled = true;
    });

    // 기록 선택 시
    detailSelect.forEach((el) => {
        el.addEventListener('change', (e) => {
            if (e.target.value === "") {
                recordDelete.disabled = true;
            } else {
                recordDelete.disabled = false;
            }
        });
    });
}

$(function () {
    basicModal('calendarModalBtn', 'select_date_view');
    basicModal('filterModalBtn', 'filter_list_view');
    userModal('user_list_1', 'user_detail_view');
    userModal('user_list_2', 'user_detail_view');

    maxLengthCheck('user_name');
    maxLengthCheck('user_age');
    maxLengthCheck('user_weight');
    maxLengthCheck('user_height');
    maxLengthCheck('user_height');
    maxLengthCheck('user_past_disease');
    maxLengthCheck('user_medicine');

    listCheck();
    contentSelect();
    metabolicSelect();
    textareaDisabled();
    deviceSelect();
    recordSearch();
});    

