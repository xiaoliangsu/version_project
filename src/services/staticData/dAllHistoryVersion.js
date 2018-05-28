//deviceTemper需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';

export const classfyChart = {
  "chartId": "classfyChart",
  "option": {
    title: {
      text: '全年告警次数统计',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['引擎过热', '出水温度过高', '入水温度过高', '气路压力过大', '水路压力过大'],
      align: 'right',
      orient: 'vertical',
      right: 0,
      top: "10%",
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '次数',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} 次'
        }
      },
    ],
    series: [
      {
        name: '引擎过热',
        type: 'bar',
        data: []
      },
      {
        name: '出水温度过高',
        type: 'bar',
        data: []
      },
      {
        name: '入水温度过高',
        type: 'bar',
        data: []
      },
      {
        name: '气路压力过大',
        type: 'bar',
        data: []
      },
      {
        name: '水路压力过大',
        type: 'bar',
        data: []
      },
      // {
      //   name: 'GDP占比',
      //   type: 'pie',
      //   center: ['75%', '35%'],
      //   radius: '28%',
      //   z: 100,
      //   data:[
      //     {
      //       name:"引擎过热",
      //       value:111
      //     },
      //     {
      //       name:"出水温度过高",
      //       value:120
      //     }
      //   ]
      // }
    ]
  }
};

export const errorChart = {
  "chartId": "errorChart",
  "option": {
    title: {
      text: '全年故障次数统计',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['引擎过热', '出水温度过高', '入水温度过高', '气路压力过大', '水路压力过大'],
      align: 'right',
      orient: 'vertical',
      right: 0,
      top: "10%",
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '次数',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} 次'
        }
      },
      // {
      //   type: 'value',
      //   name: '温度',
      //   min: 0,
      //   max: 25,
      //   interval: 5,
      //   axisLabel: {
      //     formatter: '{value} °C'
      //   }
      // }
    ],
    series: [
      {
        name: '引擎过热',
        type: 'bar',
        data: []
      },
      {
        name: '出水温度过高',
        type: 'bar',
        data: []
      },
      {
        name: '入水温度过高',
        type: 'bar',
        data: []
      },
      {
        name: '气路压力过大',
        type: 'bar',
        data: []
      },
      {
        name: '水路压力过大',
        type: 'bar',
        data: []
      },

    ]
  }
};
export const warnErrorChart = {
  "chartId": "warnErrorChart",
  "option": {
    title: {
      text: '全年告警／停用次数统计',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['设备告警', '设备故障'],
      align: 'right',
      orient: 'vertical',
      right: 0,
      top: "10%",
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '次数',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} 次'
        }
      },
    ],
    series: [
      {
        name: '设备告警',
        type: 'bar',
        data: []
      },
      {
        name: '设备故障',
        type: 'bar',
        data: []
      }

    ]
  }
};


export const classfyPie = {
  "chartId": "classfyPie",
  "option":{
    title : {
      text: '全年告警统计',
      subtext: '全年12个月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['引擎过热','出水温度过高','入水温度过高','气路压力过大','水路压力过大']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:0, name:'引擎过热'},
          {value:0, name:'出水温度过高'},
          {value:0, name:'入水温度过高'},
          {value:0, name:'气路压力过大'},
          {value:0, name:'水路压力过大'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

};

export const errorPie={
  "chartId": "errorPie",
  "option":{
    title : {
      text: '全年故障统计',
      subtext: '全年12个月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['引擎过热','出水温度过高','入水温度过高','气路压力过大','水路压力过大']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:0, name:'引擎过热'},
          {value:0, name:'出水温度过高'},
          {value:0, name:'入水温度过高'},
          {value:0, name:'气路压力过大'},
          {value:0, name:'水路压力过大'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

};
export const warnErrorPie={
  "chartId": "warnErrorPie",
  "option":{
    title : {
      text: '全年告警／停用统计',
      subtext: '全年12个月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['设备告警','设备故障']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:0, name:'设备告警'},
          {value:0, name:'设备故障'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

}

