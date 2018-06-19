//deviceTemper需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
var max = 480, min = 9; //
var maxSize4Pin = 100, minSize4Pin = 20;


export const cityMap = {
  "chartId": "cityMap",
  "cityName": '',
  "geoJson": '',
  "option": {
    backgroundColor: '#4f5555',
    title: {
      text: '设备运行状态监控',
      subtext: '如果设备报警，会有气泡显示',
      x: 'center',
      textStyle: {
        color: '#7bbfea',
        fontWeight:'bolder',
        fontSize:22,
        // textShadowColor:'transparent',
        // textShadowBlur:3
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.name;
      }
    },
    legend: {
      orient: 'horizontal',
      left:'left',
      top:'top',
      zlevel:100,
      data: ['Running','Warning','Error',"Stop"],
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
      }
    },

    geo: {
      show: true,
      map: '',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false,
        }
      },
      roam: true,
      itemStyle: {
        areaColor: '#323c48',
        borderColor: '#111',
        emphasis: {
          areaColor: '#323c60'
        }
      }
    },
    series: [
      {
        name: 'Running',
        type: 'effectScatter',
        hoverAnimation: 'false',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 10,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true,
            color:'#ddb926',
            fontStyle:'italic',
            fontWeight:'800',
            fontSize: 15,
          },
          emphasis: {
            show: true
          }
        },
        rippleEffect: {
          period: 15,
          scale: 4,
          brushType: 'fill',
        },
        itemStyle: {
          normal: {
            color: '#7bbfea',
            shadowBlur: 30,
          }
        }
      },

      {
        type: 'map',
        map: '',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: true, // 存在legend时显示
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#ddb926',
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        animation: false,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#ddb926',
              fontSize: 10
            },
          },
          emphasis: {
            textStyle: {
              color: '#ddb926',
              fontSize: 10
            },
          }

        },
        data: []
      },
      {
        name: 'Stop',
        type: 'effectScatter',
        hoverAnimation: 'false',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 10,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true,
            color:'#ddb926',
            fontStyle:'italic',
            fontWeight:'800',
            fontSize: 15,
          },
          emphasis: {
            show: true
          }
        },
        rippleEffect: {
          period: 15,
          scale: 4,
          brushType: 'fill',
        },
        itemStyle: {
          normal: {
            color: '#7bbf88',
            shadowBlur: 30,
          }
        }
      },
      {
        name: 'Warning',
        type: 'scatter',
        coordinateSystem: 'geo',
        hoverAnimation:true,
        symbol: 'pin',
        symbolSize: 80,
        label: {
          show:true,
          color: '#fff',
          fontWeight:"bolder",
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value;
            res = "Warning";
            return res;
          },
        },
        itemStyle: {
          normal: {
            color: '#F62157', //标志颜色
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(12, 204, 104, 0.92)',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value;
            res = "<span style='color:#fff;'>告警内容：" + name + "</span><br/>告警时间：" + value[2];
            return res;
          }
        },
        zlevel: 6,
        data: [],
      },
      {
        name: 'Error',
        type: 'effectScatter',
        hoverAnimation: 'false',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 10,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(12, 204, 104, 0.92)',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value;
            res = "<span style='color:#fff;'>告警内容：" + name + "</span><br/>告警时间：" + value[2];
            return res;
          }
        },
        rippleEffect: {
          period: 15,
          scale: 4,
          brushType: 'fill',
        },
        itemStyle: {
          normal: {
            color: 'red',
            shadowBlur: 30,
          }
        }
      },


    ]
  }

};

