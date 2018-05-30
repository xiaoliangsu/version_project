//tenantList需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const userColumn = {
  columns: [{
    'title': '创建时间',
    'key': 'createdDate',
    'minWidth': 200
  }, {
    'title': '用户名',
    'key': 'username',
    'minWidth': 100
  }, {
    'title': 'hashedPassword',
    'key': 'hashedPassword',
    'minWidth': 300
  }, {
    'title': 'firstName',
    'key': 'firstName',
    'minWidth': 80
  }, {
    'title': 'lastName',
    'key': 'lastName',
    'minWidth': 80
  }, {
    'title': 'status',
    'key': 'status',
    'minWidth': 100
  },


    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        switch (params.row.status) {
          case "Active":
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
                      "name": params.row.username
                    };
                    let data = {
                      url: '/adminUser/deleteUser',
                      params: params1,
                      method: 'get',
                      baseUrl: 'user'
                    };
                    let res = await utils.getData(data);
                    store.state.userList.getData();

                  }
                }
              }, '删除')
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
}

export const addUserForm = {
  inline: false,
  submitBtn: true,
  data: [{
    type: 'Input',
    name: 'username',
    label: '用户名'
  }, {
    type: 'Input',
    name: 'password',
    label: '用户密码'
  }, {
    type: 'Input',
    name: 'confirmPassword',
    label: '确认密码'
  }, {
    type: 'Input',
    name: 'firstName',
    label: 'first name'
  }, {
    type: 'Input',
    name: 'lastName',
    label: 'last name'
  },{
    type: 'Select',
    name: 'status',
    label: '用户状态',
    data:[
      {
        label:'Active',
        value:'Active'

      },
      {
        label:'Expired',
        value:'Expired'

      },
      {
        label:'Locked',
        value:'Locked'

      }
    ]
  }]
};

