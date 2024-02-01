'use strict'

$(function() {
    var HealthColor = "253, 128, 135";
    var ExerciseColor = "50, 158, 255"
    var CaloriesColor = "249, 151, 70"

    let date = new Date();
    let monthArr = new Array();
    
    date.setMonth(date.getMonth() - 4);
    for (let i = 0; i < 5; i++)
    {
        monthArr[i] = (date.getMonth() + 1) + "월";
        date.setMonth(date.getMonth() + 1);
    }
     /* highchart.js 이벤트 */
    // 기본 옵션 설정
    Highcharts.setOptions({
        chart: {
            zoomType: 'x',                  // 차트 타입
            height: "140px",                // 차트 높이
        },
        title: {text: null},                // 제목 없음
        subtitle: {text: null},             // 부제목 없음

        xAxis: {                            // X축
            crosshair: true,                // X축 라인
            categories: monthArr,
            labels: {                       
                style: {                    // X축 스타일
                    fontSize: "16px",       // X축 텍스트 크기
                },
            }
        },

        yAxis: {                            // Y축
            title: {text: "개선율"},        // Y축 제목 없음
            min: 0,                         // Y축 최소값
            max: 200,                       // Y축 최대값
            labels: {                       
                style: {                    // Y축 스타일
                    fontSize: "18px",       // Y축 텍스트 크기
                },
                formatter: function() {     // Y축 출력 포맷 설정
                    return this.value + "%"
                }
            }
        },

        plotOptions: {                      // 표 속성
            line: {                         // 표 라인
                dataLabels: {enabled: true},// 포인트 위에 수치값 표시
                enableMouseTracking: false  // 마우스 따라가기 기능 없음
            },
            area: {
                fillColor: {                // 그래프 색
                    linearGradient: {       // 그래프 그라디언트
                        x1: 0, 
                        y1: 0, 
                        x2: 0, 
                        y2: 1
                    },
                },
            }
        },

        series: [{                          // 표 데이터
            name: '',                       // 표 제목
        }],

        credits: {enabled: false},          // 출처 설정 제거
        legend: {enabled: false},           // 범례 설정 제거
        tooltip: {                          // 툴팁 설정
            formatter: function() {         // 툴팁 출력 포맷 설정
                return "<b>" + this.y + "%</b>"
            },
            style: {                        // 툴팁 스타일
                fontSize: "18px",
            }
        },
        exporting: {enabled: false},        // 햄버거 설정 제거

        responsive: {                       // 반응형
            rules: [{
                condition: {
                    maxWidth: 500,          // 최대 넓이 500
                },
            }],
        }
    });

    // 체력 1등 그래프
    var HealthGraph = Highcharts.chart('data_graph_health', {
        plotOptions: {
            area: {
                fillColor: {
                    stops: [
                        [0, `rgba(${HealthColor}, 0.5)`],
                        [1, `rgba(${HealthColor}, 0)`]
                    ]
                },
            }
        },

        series: [{
            type: 'area',
            marker: {fillColor: `rgba(${HealthColor}, 1)`},
            color: `rgba(${HealthColor}, 1)`,
            data: []
        }],
    });

    // 근력 1등 그래프
    var ExerciseGraph = Highcharts.chart('data_graph_exercise', {
        plotOptions: {
            area: {
                fillColor: {
                    stops: [
                        [0, `rgba(${ExerciseColor}, 0.5)`],
                        [1, `rgba(${ExerciseColor}, 0)`]
                    ]
                },
            }
        },

        series: [{
            type: 'area',
            marker: {fillColor: `rgba(${ExerciseColor}, 1)`},
            color: `rgba(${ExerciseColor}, 1)`,
            data: []
        }]
    });

    // 칼로리 1등 그래프
    var CaloriesGraph = Highcharts.chart('data_graph_calories', {
        plotOptions: {
            area: {
                fillColor: {
                    stops: [
                        [0, `rgba(${CaloriesColor}, 0.5)`],
                        [1, `rgba(${CaloriesColor}, 0)`]
                    ]
                },
            }
        },

        series: [{
            type: 'area',
            marker: {fillColor: `rgba(${CaloriesColor}, 1)`},
            color: `rgba(${CaloriesColor}, 1)`,
            data: []
        }]
    });

    // 그래프 수치 설정
    var heaths = [126.2, 131.1, 135.6, 140.1, 144.3];
    var exercises = [15.1, 22.2, 29.3,35.4, 39.8];
    var calories = [97.0, 102.1, 110.6, 116.7, 121.1];

    HealthGraph.series[0].setData(heaths);
    ExerciseGraph.series[0].setData(exercises);
    CaloriesGraph.series[0].setData(calories);

    $("#health_up").html((heaths[4] - heaths[3]).toFixed(1) + "%");
    $("#exercise_up").html((exercises[4] - exercises[3]).toFixed(1) + "%");
    $("#calorie_up").html((calories[4] - calories[3]).toFixed(1) + "%");
});