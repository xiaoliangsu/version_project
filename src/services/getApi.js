/**
 * @file 动态api
 **/
import store from '../store/'

let api = {};
api.getUrl = type =>{
  let url = '';
  switch(type){
    case 'testApi':
      url = 'dev/type' + store.getters.devicetype + '/test';
      break;
  }
  return url;
};
export default api;
