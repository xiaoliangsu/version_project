//地理位置监控地图数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';

export const siteTable = {
  name: 'siteTable',
  size: 'small',
  noLoad: true,  // 默认不加载
  columns: [{
    'title': 'ID',
    'key': 'id',
    'width': 70
  }, {
    'title': '名字',
    'key': 'name',
    'minWidth': 100

  }, {
    'title': '创建日期',
    'key': 'createdDate',
    'minWidth': 300
  }, {
    'title': '所在城市',
    'key': 'locationCity',
    'minWidth': 100
  }, {
    'title': '详细地址',
    'key': 'locationDetial',
    'minWidth': 300
  }, {
    'title': '操作',
    'key': 'action',
    'width': 200,
    render: (h, params) => {
      switch (router.history.current.query.kind) {
        case "1":
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                loading: false
              },
              on: {
                click: () => {
                  store.commit('SET_SITE_TOKEN', {
                    siteToken: params.row.token
                  })
                  localStorage.setItem("siteToken", params.row.token)
                  store.commit('SET_SITE_NAME', {
                    siteName: params.row.name
                  })
                  store.commit('SET_SITE_LOCATION', {
                    siteLocation: params.row.map.metadata
                  })
                  if (localStorage.getItem("siteToken")) {
                    router.push({
                      path: "deviceLocMap",
                      query: {
                        "lng": params.row.map.metadata.centerLongitude,
                        "lat": params.row.map.metadata.centerLatitude,
                        "siteToken": params.row.token
                      }
                    });
                  }

                }
              }
            }, '位置监控'),
          ]);
          break;
        case "2":
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                loading: false
              },
              on: {
                click: () => {
                  localStorage.setItem("siteToken", params.row.token)
                  if (localStorage.getItem("siteToken")) {
                    let locationCity = '';
                    if (params.row.locationCity.split(',').length == 1) {
                      locationCity = params.row.locationCity.split(',')[0];
                    } else {
                      if (params.row.locationCity.split(',')[1] !== "市辖区") {
                        locationCity = params.row.locationCity.split(',')[1];
                      } else {
                        locationCity = params.row.locationCity.split(',')[0];
                      }
                    }
                    router.push({
                      path: "runStatus",
                      query: {
                        "lng": params.row.map.metadata.centerLongitude,
                        "lat": params.row.map.metadata.centerLatitude,
                        "siteToken": params.row.token,
                        "city": locationCity
                      }
                    });
                  }

                }
              }
            }, '运营状态监控'),
          ]);
          break;

      }

    }
  }
  ],
  defaultColumns: ['id', 'name', 'createdDate', 'locationCity', 'locationDetial', 'action'],
  data: {
    url: 'device/getSite',
    params: {
      pageSize: 15,
      page: 1,
      "sitewhereToken": localStorage.getItem("sitewhereToken")
    },
    method: "get"
  }
};
