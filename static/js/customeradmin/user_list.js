'use strict'

const checkerConfig = {
    attributes: true,
    attributeFilter: ['class']
};

let selectedDate = document.querySelectorAll('.date_checker');
let selectedFilter = document.querySelectorAll('[class*="_one_checker"]');
let checkedAllChecker = document.querySelectorAll('[class*="_all_checker"].selected_checker');
let selectedFilterZone = document.getElementById('selected_filter_zone');

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

function filterSelector() {
    filters.forEach(function (filter) {
        let filterValue = document.getElementById('arr_{0}'.format(filter)).value.trim();
        if (filterValue !== 'all') {
            let allCheckers = document.querySelectorAll('.' + filter + '_all_checker');
            allCheckers.forEach(function (checker) {
                checker.classList.remove('selected_checker');
            });

            let filterValues = filterValue.split(',');
            filterValues.forEach(function (value) {
                let filterElement = document.getElementById(filter + '_filter_' + value);
                if (filterElement) {
                    filterElement.classList.add('selected_checker');
                }
            });
        }
    });
}

var callback = function (mutationsList, observer) {
    for (var mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            onOffChecker();
            
            let targetElement = mutation.target;
            let content = targetElement.textContent.trim();
            let selectedFilterList = document.querySelectorAll('.selected_filter');
            let temp_id = 1;

            if (targetElement.classList.contains('selected_checker')) {
                if (!Array.from(selectedFilterList).some(el => el.textContent.trim() === content)) {
                    let newElement = document.createElement('li'); 
                    newElement.textContent = content; 
                    newElement.className = 'selected_filter ' + targetElement.id;
                    newElement.id = targetElement + temp_id++;
                }
                allCheckerFilter(targetElement.className, false);
            } else {
                Array.from(selectedFilterList).forEach(el => {
                    if (el.textContent.trim() === content) {
                        selectedFilterZone.removeChild(el); 
                    }
                });
                allCheckerFilter(targetElement.className, true);
            }
        }
    }
};

function getSelectedFilters() {
    let selectedFilters = {};

    filters.forEach(function (type) {

        let allChecker = $('.' + type + '_all_checker');
        let oneCheckers = $('.' + type + '_one_checker.selected_checker');
        if (allChecker.hasClass('selected_checker')) {
            selectedFilters[type] = ['all'];
        } else {
            selectedFilters[type] = oneCheckers.map(function () {
                return this.id.match(type + '_filter_(\\d+)')[1];
            }).get();
        }

        selectedFilters[type].forEach(function (v) {
            $('<input>').attr({
                type: 'hidden',
                name: type,
                value: v
            }).appendTo('#user_list_form');
        });
    });

    var form = document.getElementById('user_list_form');
    var inputs = form.querySelectorAll('input[type="hidden"]');
    var seen = {};

    inputs.forEach(function (input) {
        var name = input.name;
        var value = input.value;

        if (!seen[name]) {
            seen[name] = new Set();
        }

        if (seen[name].has(value)) {
            input.remove();
        } else {
            seen[name].add(value);
        }
    });

}

function onOffChecker() {
    let isNotAll = 0;
    isNotAll += dateFormChecker() ? 1 : 0;
    isNotAll += fillterFormChecker() ? 1 : 0;
    isNotAll += keywordFormChecker() ? 1 : 0;

    if (isNotAll > 0) {
        $('#defaultSettingBtn').removeClass('on');
    } else {
        $('#defaultSettingBtn').addClass('on');
    }
}

function dateFormChecker() {
    let isDateCheck = document.querySelectorAll('.date_checker.selected_checker');
    let startDt = $('#startDt').val();
    let endDt = $('#endDt').val();

    if (startDt == setMinDate && endDt == dateStr) {
        $('#calendarModalBtn').removeClass('on');
        return false;
    }

    if (isDateCheck.length > 0) {
        $('#calendarModalBtn').addClass('on');
        return true;
    } else {
        $('#calendarModalBtn').removeClass('on');
    }
    return false;
}

function fillterFormChecker() {
    let isFilterCheck = document.querySelectorAll('[class*="_one_checker"].selected_checker');    

    if (isFilterCheck.length > 0) {
        $('#filterModalBtn').addClass('on');
        return true;
    } else {
        $('#filterModalBtn').removeClass('on');
    }
    return false;
}

function keywordFormChecker() {
    let isKeyCheck = $('#keyword_box').val();

    if (isKeyCheck.length > 0) {
        $('#keyword_box_box').addClass('on');
        return true;
    } else {
        $('#keyword_box_box').removeClass('on');
        return false;
    }
}

function allCheckerFilter(classNames, isView) {
    filters.forEach(function (filter) {
        if (classNames.toString().includes('{0}_one_checker'.format(filter))) {
            let tempName = '.{0}_all_checker'.format(filter);
            tempName = '{0}.selected_filter'.format(tempName);

            let allSelector = document.querySelector(tempName);
            let cnt = document.querySelectorAll('[class*="{0}_one_checker"].selected_checker'.format(filter));
            isView = cnt.length > 0 ? false : true;

            if (isView) {
                allSelector.className = "{0} selected_checker".format(allSelector.className);
                allSelector.style = 'none';
            } else {
                allSelector.style.display = "none";
            }
        }
    });
}

function getDefaultSetting(){
    calendarReset();
    filterReset();
    keywordReset();
}

function calendarReset() {
    $('#startDt').val(setMinDate);
    $('#endDt').val(dateStr);
    selectedDate.forEach(function (item) {
        $(item).removeClass("selected_checker");
    })

    dateFormChecker();
}

function filterReset() {
    let allChecker = document.querySelectorAll('.filter_checker');

    allChecker.forEach(function (item) {
        if (item.className.includes('_all_checker')) {
            $(item).addClass("selected_checker");
        } else {
            $(item).removeClass("selected_checker");
        }
    })
}

function keywordReset() {
    $('#keyword_box').val("");
    keywordFormChecker();
}

$(function () {
    filterSelector();
    onOffChecker();
    basicModal('calendarModalBtn', 'select_date_view');
    basicModal('filterModalBtn', 'filter_list_view');

    selectedDate.forEach(function (node) {
        let observer = new MutationObserver(callback);
        observer.observe(node, checkerConfig);
    });

    selectedFilter.forEach(function (node) {
        let observer = new MutationObserver(callback);
        observer.observe(node, checkerConfig);
    });

    $('#startDt, #endDt').on('change', function () {
        onOffChecker();
    });

    $('#keyword_box').on('change', function () {
        onOffChecker();
    });

    $(document).on("click", ".filter_checker", function () {
        filteringBoxAllchecking($(this));
    });
});