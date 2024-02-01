'use strict'

$(function() {
    /* --- Chart.js 이벤트 --- */
    /* --- 공통 설정 --- */
    Chart.defaults.set('plugins', {
        title: {display: true, color: '#0D192B', font: {size: 24},},
        subtitle: {display: true, color: '#0D192B', font: {size: 16}, padding: {bottom: 30},},
        datalabels: {color: '#0D192B', font: {size: 16, weight: 600,},},
        legend: {position: 'bottom',},
    });
    Chart.defaults.set('font', {family: 'pretendard'});
    Chart.defaults.set('datasets', {bar: {borderRadius: {topLeft: 4, topRight: 4,},}});
    Chart.defaults.set('responsive', true);
    Chart.defaults.set('maintainAspectRatio', false);

    // 그래프별 유저 데이터
    let homeUseData = [153, 351, 164, 456, 352, 567, 951, 549, 668, 506, 447, 845];
    let homeNewMemberData = [50, 30, 40, 52, 63, 15, 92, 85, 46, 44, 65, 32];
    let homeAccMemberData = [800, 1055, 1659, 2312, 2648, 3336, 3958, 4487, 5831, 6554, 7011, 7999];
    let homeUseDistData = [40, 28.3, 21.7, 5, 5];
    let homeAgeDistData = [9.8, 28.2, 15, 21, 13, 8, 3, 2];
    let homeGenderDistData = [66.4, 33.6];

    // 그래프별 카테고리
    let monthArr = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    let contentArr = ['자세 검사', '체력 검사', '관절 움직임 검사', '퍼스널 트레이닝', '만성질환 운동처방'];
    let ageArr = ['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대 이상'];
    let genderArr = ['남성', '여성'];

    // 그래프별 그라데이션
    let homeUseColor = ['rgba(255, 70, 102, 1)', 'rgba(255, 70, 102, 0)'];
    let homeNewMemberColor = ['rgba(81, 119, 255, 1)', 'rgba(81, 119, 255, 0)'];
    let homeAccMemberColor = ['rgba(25, 193, 142, 1)', 'rgba(25, 193, 142, 0)'];
    let homeUseDistColor = ['rgba(25, 193, 142, 0.5)', 'rgba(25, 0, 246, 0.5)', 'rgba(31, 53, 218, 0.5)', 'rgba(50, 158, 255, 0.5)', 'rgba(249, 151, 70, 0.5)'];
    let homeAgeDistColor = ['rgba(83, 206, 154, 0.5)', 'rgba(82, 178, 186, 0.5)', 'rgba(82, 161, 206, 0.5)', 'rgba(82, 133, 240, 0.5)', 'rgba(100, 111, 244, 0.5)', 'rgba(122, 102, 232, 0.5)', 'rgba(184, 77, 198, 0.5)', 'rgba(253, 47, 158, 0.5)'];
    let homeGenderDistColor = ['rgba(50, 158, 255, 0.5)', 'rgba(222, 59, 59, 0.5)'];

    /* --- 그래프별 설정 --- */
    // 이용 횟수 그래프
    const homeUse = document.getElementById('home_statistics_use').getContext('2d');
    const homeUseGradient = homeUse.createLinearGradient(0, 100, 0, 300);
    homeUseGradient.addColorStop(0, homeUseColor[0]);
    homeUseGradient.addColorStop(1, homeUseColor[1]);

    let homeUseSetting = {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: monthArr, 
            datasets: [{
                label: '회원별 이용 횟수', 
                data: homeUseData,
                backgroundColor: homeUseGradient,
            },
        ]},

        options: {
            plugins: {
                title: {text: '이용 횟수',}, subtitle: {text: '키오스크',},
                legend: {display: false,},
                datalabels: {align: 'end', anchor: 'end', font: {size: 12,},},
            },

            scales: {
                x: {beginAtZero: true, grid: {color: 'transparent'}},
                y: {beginAtZero: true, grid: {color: 'transparent'},}
            },
            layout: {padding: {left: 20, right: 20, top: 0, bottom: 0}},
        }
    }
    new Chart(homeUse, homeUseSetting);


    // 신규 회원 그래프
    const homeNewMember = document.getElementById('home_statistics_new_member').getContext('2d');
    const homeNewMemberGradient = homeUse.createLinearGradient(0, 100, 0, 300);
    homeNewMemberGradient.addColorStop(0, homeNewMemberColor[0]);
    homeNewMemberGradient.addColorStop(1, homeNewMemberColor[1]);

    let homeNewMemberSetting = {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: monthArr, 
            datasets: [{
                label: '회원 수', 
                data: homeNewMemberData,
                backgroundColor: homeNewMemberGradient,
            }
        ]},

        options: {
            plugins: {
                title: {text: '신규 회원',}, subtitle: {text: '키오스크',},
                legend: {display: false,},
                datalabels: {align: 'end', anchor: 'end', font: {size: 12,},},
            },

            scales: {
                x: {beginAtZero: true, grid: {color: 'transparent'}},
                y: {beginAtZero: true, grid: {color: 'transparent'},}
            },
            layout: {padding: {left: 20, right: 20, top: 0, bottom: 0}},
        }
    }
    new Chart(homeNewMember, homeNewMemberSetting);


    // 누적 회원 그래프
    const homeAccMember = document.getElementById('home_statistics_accumulate_member').getContext('2d');
    const homeAccMemberGradient = homeUse.createLinearGradient(0, 100, 0, 300);
    homeAccMemberGradient.addColorStop(0, homeAccMemberColor[0]);
    homeAccMemberGradient.addColorStop(1, homeAccMemberColor[1]);

    let homeAccMemberSetting = {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: monthArr, 
            datasets: [{
                label: '회원 수', 
                data: homeAccMemberData,
                backgroundColor: homeAccMemberGradient,
            }
        ]},

        options: {
            plugins: {
                title: {text: '누적 회원',}, subtitle: {text: '키오스크',},
                legend: {display: false,},
                datalabels: {align: 'end', anchor: 'end', font: {size: 12,},},
            },

            scales: {
                x: {beginAtZero: true, grid: {color: 'transparent'}},
                y: {beginAtZero: true, grid: {color: 'transparent'},}
            },
            layout: {padding: {left: 20, right: 20, top: 0, bottom: 0}},
        }
    }
    new Chart(homeAccMember, homeAccMemberSetting);


    // 컨텐츠 이용 분포 그래프
    const homeUseDist = document.getElementById('home_statistics_use_distribution').getContext('2d');
    let homeUseDistSetting = {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
            labels: contentArr, 
            datasets: [{
                data: homeUseDistData,
                backgroundColor: homeUseDistColor,
            }
        ]},

        options: {
            plugins: {
                title: {text: '컨텐츠 이용 분포',}, subtitle: {text: '키오스크',},
                datalabels: {formatter: (value) => {return value + '%';}},
            },

            layout: {padding: {left: 30, right: 30, top: 30, bottom: 30}},
        }
    }
    new Chart(homeUseDist, homeUseDistSetting);


    // 연령층 분포 그래프
    const homeAgeDist = document.getElementById('home_statistics_age_distribution').getContext('2d');
    let homeAgeDistSetting = {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
            labels: ageArr, 
            datasets: [{
                data: homeAgeDistData,
                backgroundColor: homeAgeDistColor,
            }
        ]},

        options: {
            plugins: {
                title: {text: '연령층 분포',}, subtitle: {text: '키오스크',},
                datalabels: {formatter: (value) => {return value + '%';}},
            },
            layout: {padding: {left: 30, right: 30, top: 30, bottom: 30}},
        }
    }
    new Chart(homeAgeDist, homeAgeDistSetting);


    // 성별 분포 그래프
    const homeGenderDist = document.getElementById('home_statistics_gender_distribution').getContext('2d');
    let homeGenderDistSetting = {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
            labels: genderArr, 
            datasets: [{
                data: homeGenderDistData,
                backgroundColor: homeGenderDistColor,
            }
        ]},
        options: {
            plugins: {
                title: {text: '성별 분포',}, subtitle: {text: '키오스크',},
                datalabels: {formatter: (value) => {return value + '%';}},
            },
            layout: {padding: {left: 30, right: 30, top: 30, bottom: 30}},
        }
    }
    new Chart(homeGenderDist, homeGenderDistSetting);
});