
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const alertColumn = {
  columns: [{
    'title': '设备ID',
    'key': 'hardwareId',
    'width': 70
  }, {
    'title': '报警类型',
    'key': 'type',
    'minWidth': 100
  }, {
    'title': '报警等级',
    'key': 'level',
    'minWidth': 100
  },  {
    title: '报警等级',
    key: 'level',
    'minWidth': 100,
    render: (h, params) => {
      const row = params.row;
      const color = row.level =="Warning" ? 'blue' :  'red';
      const text = row.level =="Warning" ? 'Warning' : "Error";

      return h('Tag', {
        props: {
          type: 'dot',
          color: color
        }
      }, text);
    }
  }, {
    'title': '报警消息',
    'key': 'message',
    'minWidth': 100
  }, {
    'title': '报警时间',
    'key': 'eventDate',
    'minWidth': 300
  },
  ],
}
