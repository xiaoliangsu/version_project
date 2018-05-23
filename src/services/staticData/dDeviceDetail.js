import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';



export const deviceInfo = {
  data: [
    {
      name: "hardwareId",
      label: "设备id号"
    }, {
      name: "comments",
      label: "设备详情",
    },
    {
      name: "city",
      label: "所在城市",
    },
    {
      name: "location",
      label: "详细地址",
    },
  ]
}

export const safemanInfo = {
  data: [
    {
      name: "assetName",
      label: "安全管理员姓名",
    },
    {
      name: "assetId",
      label: "安全管理员电话",
    },
  ]
}


export const specificationInfo = {
  data: [{
    name: "name",
    label: "设备规格",
  },
    {
      name: "description",
      label: "设备类别描述",
    },
    {
      name: "gasPa",
      label: "气路设计压力",
    },
    {
      name: "waterPa",
      label: "水路设计压力",
    },
    {
      name: "heatArea",
      label: "最大供热面积",
    },
    {
      name: "inMaxTemp",
      label: "回水最高温度",
    },
    {
      name: "outMaxTemp",
      label: "出水最高温度",
    },
    {
      name: "maxAge",
      label: "工作年限",
    },
    {
      name: "maxHeatParams",
      label: "设备最大供暖参数",
    },
    {
      name: "scale",
      label: "设备尺寸",
    },
    {
      name: "totalPowerComsum",
      label: "总耗电量",
    },
    {
      name: "totalWeight",
      label: "总重量",
    },


  ]
}


export const siteInfo = [
  {
    inline: false,
    submitBtn: true,
    data: [{
      name: 'name',
      label: '站点名称'
    }, {
      name: 'siteCity',
      label: '站点城市'
    }, {
      name: 'siteLocation',
      label: '站点详细地址'
    }, {
      name: 'description',
      label: '站点描述'
    },]
  }
]
