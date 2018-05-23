//deviceTemper需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';

export const gasPaChart = {
  "chartId": "gasPaChart",
  "option": {
    title: {
      text: '气路运行压力实时变化',
      subtext: '最近一小时内'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['气路运行压力']
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °MPa'
      },
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '气路运行压力',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      },
      data: [],
    },]

  },


};
export const waterPaChart = {
  "chartId": "waterPaChart",
  "option": {

    title: {
      text: '水路运行压力实时变化',
      subtext: '最近一小时内'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['水路运行压力']
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLabel: {
        formatter: '{value} °MPa'
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '水路运行压力',
      type: 'line',
       itemStyle:{
        normal:{
          lineStyle:{
            color:"#6eaaee"
          }
        }
       },
      showSymbol: false,
      hoverAnimation: false,
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ],
        itemStyle:{
         color:"#6eaaee"
        },
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ],
        itemStyle:{
          color:"#6eaaee"
        },
      },
      data: [],
    },]

  },


}
