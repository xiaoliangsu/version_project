//deviceTemper需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const inOutTempChart = {
  "chartId": "inOutTempChart",
  "option": {

    title: {
      text: '出入水温度实时变化',
      subtext: '最近一小时内'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['入水温度', '出水温度']
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
        formatter: '{value} °C'
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '入水温度',
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
    }, {
      name: '出水温度',
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
    }]

  },


};
export const deviceTempChart = {
  "chartId": "deviceTempChart",
  "option": {

    title: {
      text: '设备运行温度实时变化',
      subtext: '最近一小时内'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['设备运行温度']
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
        formatter: '{value} °C'
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '设备运行温度',
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


}
