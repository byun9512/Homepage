'use strict'

/* 그룹 상세 열기, 닫기 */
function groupModal() {
    const groupCreate = document.getElementById('addGroupBtn');
    const groupList = document.querySelectorAll('.group_list')
    const groupModal = document.getElementById('group_detail_view');
    const modalClose = groupModal.children[0].children[0].children[1];

    const groupCreateBtn = document.getElementById('groupCreateBtn');
    const groupUpdateBtn = document.getElementById('groupUpdateBtn');
    const groupDeleteBtn = document.getElementById('groupDeleteBtn');
    const selectGroupList = document.getElementById('select_group_user_list');
    const currentGroupList = document.getElementById('current_group_user_list');
    const allInput = document.querySelectorAll('input');
    let groupTitle = document.getElementById('group_detail_title');

    let showButton = (target) => {target.classList.remove('off')}
    let hiddenButton = (target) => {target.classList.add('off')}

    // 그룹 목록을 누르면
    groupList.forEach((el) => {
        el.addEventListener('click', (e) => {
            groupModal.style.display = 'flex';
            groupTitle.innerHTML = '<i class="fa-solid fa-people-group"></i>그룹 수정';
            hiddenButton(groupCreateBtn);
            showButton(groupUpdateBtn);
            showButton(groupDeleteBtn);
        })
    });

    // 그룹 생성을 누르면
    groupCreate.addEventListener('click', () => {
        groupModal.style.display = 'flex';
        groupTitle.innerHTML = '<i class="fa-solid fa-user-plus"></i>그룹 생성';
        showButton(groupCreateBtn);
        hiddenButton(groupUpdateBtn);
        hiddenButton(groupDeleteBtn);
    });
    
    // 모달 닫기를 누르면
    modalClose.addEventListener('click', () => {
        groupModal.style.display = 'none';
        // allInput.forEach((el) => {el.value = ''});
        // selectGroupList.innerHTML = '';
        // currentGroupList.innerHTML = '';
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

/* 그룹 생성 클릭 (삭제 예정) */
function createButtonClick() {
    const groupModal = document.getElementById('group_detail_view');
    const groupCreateBtn = document.getElementById('groupCreateBtn');
    const groupName = document.getElementById('group_name');
    const currentGroupList = document.getElementById('current_group_user_list');
    const observerConfig = {childList: true};

    const observer = new MutationObserver(ms => {
        ms.forEach((m) => {
            if (m.type === 'childList') {
                if (currentGroupList.children.length != 0 && groupName.value != "") {
                    groupCreateBtn.disabled = false;
                } else {
                    groupCreateBtn.disabled = true;
                }
            }
        });
    });
    observer.observe(currentGroupList, observerConfig);

    // 그룹 생성 버튼 클릭 시
    groupCreateBtn.addEventListener('click', (el) => {
        if (groupName.value != '' && currentGroupList.children.length != 0) {
            alert('그룹이 생성되었습니다.');
            groupModal.style.display = 'none';
            groupName.value = "";
            groupCreateBtn.disabled = true;
        } else {
            groupName.nextElementSibling('p').style.display = 'block';
        }
    });
}


/* --- 작동 코드 --- */
/* 전체 체크박스 반응 핸들러 */
function listCheckHandler(target) {
    return function() {
        const targetGroupListInput = $(`#${target}_group_user_list input[type=checkbox]`);
        const targetCheckAll = $(`#${target}_check_all`);
    
        let selectChecked = targetGroupListInput.not(':checked').length === 0;
        targetCheckAll.prop("checked", selectChecked);
    }
};

/* 전체 체크박스 클릭 핸들러 */
function listCheckAllHandler(target) {
    return function() {
        const targetGroupListInput = $(`#${target}_group_user_list input[type=checkbox]`);
        const targetCheckAll = $(`#${target}_check_all`);
    
        let checkAll = targetCheckAll.is(":checked");
    
        if (checkAll) {
            targetGroupListInput.prop("checked", true);
        } else {
            targetGroupListInput.prop("checked", false);
        }
    }
}

/* 이동 버튼 반응 핸들러 */
function moveAbledHandler(target, button) {
    return function() {
        const targetGroupListInput = $(`#${target}_group_user_list input[type=checkbox]`);
        const targetMemberBtn = $(`#${button}`);
    
        // 데이터 체크 시 이동 버튼 활성화
        let selectNotChecked = targetGroupListInput.not(':checked').length;
        
        if (selectNotChecked < 4) {
            targetMemberBtn.prop("disabled", false);
        } else {
            targetMemberBtn.prop("disabled", true);
        }
    }
}

/* 이동 버튼 클릭 핸들러 */
function moveClickHandler(target, button, next) {
    return function() {
        const targetGroupListInput = $(`#${target}_group_user_list input[type=checkbox]`);
        const targetCheckAll = $(`#${target}_check_all`);
        const targetMemberBtn = $(`#${button}`);
    
        targetGroupListInput.filter(':checked').each(function() {
            let parentElement = $(this).closest('tr');
            parentElement.appendTo(`#${next}`);
    
            $(this).prop('checked', false);
            targetCheckAll.prop('checked', false);
            targetMemberBtn.prop('disabled', true);
        });
    }
}
/* ----------------- */


/* 이벤트 생성 및 삭제 */
function eventAdd(element, event, handler) {element.on(event, handler)}
function eventRemove(element, event, handler) {element.off(event, handler)}

/* 더미 데이터 생성 */
function dummyDataCreate() {
    // 더미 데이터
    let userIndex = [0, 1, 2, 3];
    let userName = ['일피티', '이피티', '삼피티', '사피티'];
    let userNum = ['010-1111-1111', '010-2222-2222', '010-3333-3333', '010-4444-4444'];

    // 더미 데이터 리스트 생성
    const selectGroupList = document.getElementById('select_group_user_list');
    const groupMemberSubmit = document.getElementById('group_member_submit');
    const checkAll = document.querySelectorAll('.check_all');
    const selectGroupRow = userIndex.map((i) => 
        `
        <tr id="data_list${i}">
            <td class="checkbox">
                <input type="checkbox" id="data_check${i}">
                <label for="data_check${i}"><div><span></span></div></label>
            </td>
            <td>${userName[i]}</td>
            <td>${userNum[i]}</td>
        </tr>
        `
    ).join('');

    groupMemberSubmit.addEventListener('click', () => {
        selectGroupList.innerHTML = selectGroupRow;
        checkAll.forEach((el) => {el.checked = false});
    });
}

$(function () {
    groupModal();
    maxLengthCheck('group_name');
    createButtonClick();
    dummyDataCreate();

    $("#group_member_submit").on('click', () => {
        const selectGroupListInput = $(`#select_group_user_list input[type=checkbox]`);
        const selectCheckAll = $(`#select_check_all`);
        const includeMemberBtn = $(`#includeMemberBtn`);
        let selectListCheckHandler = listCheckHandler('select');
        let selectListCheckAllHandler = listCheckAllHandler('select');
        let selectMoveAbledHandler = moveAbledHandler('select', 'includeMemberBtn');
        let selectMoveClickHandler = moveClickHandler('select', 'includeMemberBtn', 'current_group_user_list');

        eventAdd(selectGroupListInput, 'change', selectListCheckHandler, 'selectListCheckHandlerAdded')
        eventAdd(selectCheckAll, 'click', selectListCheckAllHandler, 'selectListCheckAllHandlerAdded')
        eventAdd(selectGroupListInput, 'change', selectMoveAbledHandler, 'selectMoveAbledHandlerAdded')
        eventAdd(includeMemberBtn, 'click', selectMoveClickHandler, 'selectMoveClickHandlerAdded')
    });
});

