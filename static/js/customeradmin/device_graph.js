'use strict'

// Chart 기본 설정
function createChartConfig(graphTitle, graphSubtitle, graphColor, labels, dataSets) {
    // 데이터 셋 설정
    let data = {
        labels: labels,
        datasets: dataSets
    }

    // 데이터 옵션 설정
    let option = {
        plugins: {
            title: {text: graphTitle,},
            subtitle: {text: graphSubtitle, color: graphColor,},
            datalabels: {font: {size: 12}, rotation: 0,},
            legend:{display: false,},
        },
        scales: {
            x: {grid: {color: 'transparent'},}, y: {grid: {color: 'transparent'},},
        }
    }

    // 데이터 값 세로 방향 전환 여부
    if (graphTitle == '일자별 이용 회원' || graphTitle == '자세 개선율') {
        option.plugins.datalabels.font.size = 10,
        option.plugins.datalabels.rotation = -90;
    }

    // 데이터 목차 출력 여부
    if (graphTitle == '자세 개선율' || graphTitle == '심폐 능력 개선율') {
        option.plugins.legend.display = true
    }

    // 데이터 출력
    return {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: data,
        options: option
    }
}


$(function() {
    /* --- Chart.js 이벤트 --- */
    /* --- 공통 설정 --- */
    Chart.defaults.set('plugins', {
        title: {display: true, color: '#0D192B', font: {size: 24},},
        subtitle: {display: true, font: {size: 20, weight: 700,}, padding: {bottom: 30},},
        datalabels: {
            color: '#0D192B', align: 'end', anchor: 'end',
            font: {
                size: 12,
                weight: 600,
            },
        },
        legend: {display: false, position: 'bottom',},
    });
    Chart.defaults.set('font', {family: 'pretendard'});
    Chart.defaults.set('datasets', {bar: {borderRadius: {topLeft: 4, topRight: 4,},}});
    Chart.defaults.set('layout', {padding: {left: 20, right: 20, top: 0, bottom: 0}});
    Chart.defaults.set('responsive', true);
    Chart.defaults.set('maintainAspectRatio', false);

    // 그래프별 유저 데이터
    let kioskMonthData = [153, 351, 164, 456, 352, 567, 951, 549, 668, 506, 447, 845];
    let kioskDayData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 100, 210, 220, 230, 240, 250, 200, 270, 280, 290, 300, 310];
    let kioskSpineData = [80, 15, 16, 23, 28, 36, 38, 44, 51, 64, 71, 79];
    let kioskHipData = [80, 15, 16, 23, 28, 36, 38, 44, 51, 64, 71, 79];
    let kioskNeckData = [80, 15, 16, 23, 28, 36, 38, 44, 51, 64, 71, 79];
    let kioskHealthData = [13, 51, 64, 56, 52, 67, 51, 49, 68, 6, 47, 45];
    let kioskJointData = [15, 35, 16, 45, 35, 56, 95, 54, 66, 50, 44, 84];
    let kioskCardioData = [13, 31, 14, 46, 32, 57, 91, 59, 68, 56, 47, 85];
    let kioskRecoveryData = [13, 31, 14, 46, 32, 57, 91, 59, 68, 56, 47, 85];

    // 그래프별 카테고리
    let monthArr = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    let dayArr = ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일', '20일', '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일'];

    // 그래프별 총 횟수
    let kioskMonthTotal = '00000';
    let kioskDayTotal = '0000';
    let kioskMeasureTotal = '00';
    let kioskHealthTotal = '00';
    let kioskJointTotal = '00';
    let kioskCardioTotal = '00';

    // 그래프별 컬러
    let kioskMonthColor = '#5177ff';
    let kioskDayColor = '#f4666d';
    let kioskSpineColor = '#19c18e';
    let kioskHipColor = '#4dcbf2';
    let kioskNeckColor = '#f5cf13';
    let kioskHealthColor = '#ff619a';
    let kioskJointColor = '#1f35da';
    let kioskCardioColor = '#f99746';
    let kioskRecoveryColor = '#329eff';


    /* --- 그래프별 설정 --- */
    // 월별 이용 회원 그래프
    const kioskMonth = document.getElementById('device_month_use').getContext('2d');
    const kioskMonthSetting = createChartConfig(
        '월별 이용 회원', // 그래프 메인 타이틀
        kioskMonthTotal + '명', // 그래프 서브 타이틀
        kioskMonthColor, // 그래프 바 컬러
        monthArr, // 그래프 라벨 배열
        [{label: '회원 수', data: kioskMonthData, backgroundColor: kioskMonthColor}] // 데이터 내용
    )
    new Chart(kioskMonth, kioskMonthSetting);


    // 일자별 이용 회원 그래프
    const kioskDay = document.getElementById('device_day_use').getContext('2d');
    const kioskDaySetting = createChartConfig(
        '일자별 이용 회원', // 그래프 메인 타이틀
        kioskDayTotal + '명', // 그래프 서브 타이틀
        kioskDayColor, // 그래프 바 컬러
        dayArr, // 그래프 라벨 배열
        [{label: '회원 수', data: kioskDayData, backgroundColor: kioskDayColor}] // 데이터 내용
    )
    new Chart(kioskDay, kioskDaySetting);


    // 자세 개선율 그래프
    const kioskMeasure = document.getElementById('device_measure_rate').getContext('2d');
    const kioskMeasureSetting = createChartConfig(
        '자세 개선율', // 그래프 메인 타이틀
        kioskMeasureTotal + '%', // 그래프 서브 타이틀
        kioskSpineColor, // 그래프 바 컬러
        monthArr, // 그래프 라벨 배열
        [{// 데이터 내용
            label: '척추 개선율', data: kioskSpineData, backgroundColor: kioskSpineColor
            },{
            label: '골반 개선율', data: kioskHipData, backgroundColor: kioskHipColor
            },{
            label: '거북목 개선율', data: kioskNeckData, backgroundColor: kioskNeckColor
        }]
    )
    new Chart(kioskMeasure, kioskMeasureSetting);


    // 체력 개선율 그래프
    const kioskHealth = document.getElementById('device_health_rate').getContext('2d');
    const kioskHealthSetting = createChartConfig(
        '체력 개선율', // 그래프 메인 타이틀
        kioskHealthTotal + '%', // 그래프 서브 타이틀
        kioskHealthColor, // 그래프 바 컬러
        monthArr, // 그래프 라벨 배열
        [{label: '개선율', data: kioskHealthData, backgroundColor: kioskHealthColor}] // 데이터 내용
    )
    new Chart(kioskHealth, kioskHealthSetting);


    // 관절 움직임 개선율 그래프
    const kioskJoint = document.getElementById('device_joint_rate').getContext('2d');
    const kioskJointSetting = createChartConfig(
        '관절 움직임 개선율', // 그래프 메인 타이틀
        kioskJointTotal + '%', // 그래프 서브 타이틀
        kioskJointColor, // 그래프 바 컬러
        monthArr, // 그래프 라벨 배열
        [{label: '개선율', data: kioskJointData, backgroundColor: kioskJointColor}] // 데이터 내용
    )
    new Chart(kioskJoint, kioskJointSetting);


    // 심폐 능력 개선율 그래프
    const kioskCardio = document.getElementById('device_cardio_rate').getContext('2d');
    const kioskCardioSetting = createChartConfig(
        '심폐 능력 개선율', // 그래프 메인 타이틀
        kioskCardioTotal + '%', // 그래프 서브 타이틀
        kioskCardioColor, // 그래프 바 컬러
        monthArr, // 그래프 라벨 배열
        [{ // 데이터 내용
            label: '심폐 능력', data: kioskCardioData, backgroundColor: kioskCardioColor
            },{
            label: '회복력', data: kioskRecoveryData, backgroundColor: kioskRecoveryColor
        }]
    )
    new Chart(kioskCardio, kioskCardioSetting);
});