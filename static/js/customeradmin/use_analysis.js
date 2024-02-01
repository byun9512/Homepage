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

/* 조회 버튼 활성화 */
function submitActive() {
    const kioskDataType = document.querySelectorAll("#analysis_kiosk_data_type");
    const mobileDataType = document.querySelectorAll("#analysis_mobile_data_type");
    const analysisDataSubmit = document.getElementById('analysis_data_submit');
    const deviceAnalysisList = document.getElementById('device_analysis_list');
    const deviceAnalysisDefault = document.getElementById('device_analysis_default');
    const reportPrintPtn = document.getElementById('reportPrintPtn');

    let dataType = (data) => {
        data.forEach((el) => {
            el.addEventListener('change', (e) => {
                if(!e.target.value) {
                    analysisDataSubmit.disabled = true;
                } else {
                    analysisDataSubmit.disabled = false;
                }
            });
        });
    }
    dataType(kioskDataType);
    dataType(mobileDataType);

    analysisDataSubmit.addEventListener('click', () => {
        deviceAnalysisDefault.style.display = 'none';
        deviceAnalysisList.style.display = 'table';
        reportPrintPtn.disabled = false;
    });
}


$(function () {
    basicModal('calendarModalBtn', 'select_date_view');
    submitActive();
});    

