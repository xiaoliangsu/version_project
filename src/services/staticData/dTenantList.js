//tenantList需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const tenantColumn = {
  columns: [{
    'title': '创建时间',
    'key': 'createdDate',
    'minWidth': 150
  }, {
    'title': '用户名',
    'key': 'name',
    'minWidth': 100
  }, {
    'title': '用户id',
    'key': 'id',
    'minWidth': 100

  }, {
    'title': '用户状态',
    'key': 'status',
    'minWidth': 100
  }, {
    'title': '管理员',
    'key': 'authorizedUserIds',
    'minWidth': 300
  },

    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        switch (params.row.status) {
          case "Started":
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: async () => {
                    let params1 = {
                      "sitewhereToken": params.row.id

                    };
                    let data = {
                      url: '/admin/stopTenant',
                      params: params1,
                      method: 'get',
                      baseUrl: 'user'
                    };
                    let res = await utils.getData(data);
                    store.state.tenantList.getData();

                  }
                }
              }, '停用')
            ]);
            break;
          case "Stopped":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false,
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    store.state.tenantList.editTenantModal = true;
                    let temp = editTenantForm.data;
                    temp[0].defaultValue = params.row.id;
                    temp[1].defaultValue = params.row.name;
                    temp[2].defaultValue = params.row.authenticationToken;
                    temp[3].defaultValue = params.row.logoUrl;
                    temp[4].defaultValue = params.row.authorizedUserIds;
                    temp[4].data.params.sitewhereToken = params.row.authenticationToken;

                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  loading: false
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: async () => {
                    let params1 = {
                      "tenantId": params.row.id,
                      "name": params.row.name

                    };
                    let data = {
                      url: '/admin/deleteTenant',
                      params: params1,
                      method: 'get',
                      baseUrl: 'user'
                    };
                    let res = await utils.getData(data);
                    store.state.tenantList.getData();

                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: async () => {
                    let params1 = {
                      "sitewhereToken": params.row.id
                    };
                    let data = {
                      url: '/admin/startTenant',
                      params: params1,
                      method: 'get',
                      baseUrl: 'user'
                    };
                    let res = await utils.getData(data);
                    store.state.tenantList.getData();

                  }
                }
              }, '启用')
            ]);
            break;
          default:
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "devicePa",
                      query: {
                        "token": params.row.assignToken
                      }
                    });
                  }
                }
              }, '故障中')
            ]);
        }


      }
    }
  ],
};
export const editTenantForm = {
  inline: false,
  submitBtn: true,
  data: [{
    type: 'Input',
    name: 'id',
    label: '用户id',
    defaultValue: ''
  }, {
    type: 'Input',
    name: 'name',
    label: '用户名',
    defaultValue: ''
  }, {
    type: 'Input',
    name: 'authenticationToken',
    label: '用户token',
    defaultValue: ''
  }, {
    type: 'Input',
    name: 'logoUrl',
    label: '用户图片',
    defaultValue: ''
  }, {
    type: 'Select',
    name: 'authorizedUserIds',
    label: '管理员',
    multiple: true,
    data: {
      url: '/admin/getTenantAdminUsers',
      params: {"sitewhereToken": ''},
      method: 'get',
      baseUrl: 'user'
    },
    defaultValue: ''
  }]
};
