/**
 * @file 工具函数
 **/

import axios from 'axios';
import store from '../store/'
import {Message, Notice}from 'iview';
import api from '@/services/getApi.js';

let util = {};
let baseUrls = {
  "device":"http://localhost:8004",
  "alert":"http://localhost:8006",
  "realTime":"http://localhost:8007",
  "user":"http://localhost:8005",

}

//axios默认设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '/admin';
axios.defaults.withCredentials = true;
axios.defaults.baseURL= 'http://localhost:8004';



//网页标签吗
util.title = function (title) {
  title = title ? title + '-设备监控' : '设备监控';
  window.document.title = title;
}

/**
 * 从后端获取数据
 * data:{
 * url:string//接口地址
 * method :string//请求方式
 * params :object //参数
 * }
 **/

util.getData = function (data) {
  if (typeof(data) === 'object' && data.url) {
    // *开头的url从api.getUrl中拿动态url
    let url = '';
    if (data.url.substr(0, 1) === '*') {
      url = api.getUrl(data.url.slice(1));
    } else {
      url = data.url;
    }
    if(data.baseUrl){
      axios.defaults.baseURL = baseUrls[data.baseUrl];
    }else{
      axios.defaults.baseURL= 'http://localhost:8004';
    }

    // *开头的params从store.getter中拿动态数据
    let params = {};
    Object.assign(params, data.params);
    if (params) {
      for (let key in params) {
        if (typeof(params[key]) === 'string'
          && params[key].substr(0, 1) === '*') {
          store.getters[params[key].slice(1)]
            ? params[key] = store.getters[params[key].slice(1)]
            : delete params[key];
        }
      }
    }
    if (data.method === 'get') {
      return axios({
        method: data.method ? data.method : 'get',
        url: url,
        params: data.params, // 请求时带的参数
        timeout: 10000,
      }).then(
        (response) => {
          if (parseInt(response.status) === 200) {
            return response.data;
          } else {
            Message.error({
              content: response.data.msg,
              duration: 5,
              closable: true
            });
            return response.data;
          }
        }
      ).catch(function (response) {
        console.log(111);
        Message.error({
          content: response.message,
          duration: 5,
          closable: true
        });
      });
    } else {
      return axios({
        method: data.method ? data.method : 'get',
        url: url,
        data: data.params, // 请求时带的参数
        timeout: 10000,
        // headers: {
        //   'X-Requested-With': 'XMLHttpRequest'
        // }
      }).then(
        (response) => {
          if (parseInt(response.status) === 200) {
            return response.data;
          } else {
            Message.error({
              content: response.data.msg,
              duration: 5,
              closable: true
            });
            return response.data;
          }
        }
      ).catch(function (response) {
        Message.error({
          content: response.message,
          duration: 5,
          closable: true
        });
      });
    }


  } else {
    return {status: 0, data: data ? data : {}};
  }
};


// 从route数据中获取当前path
util.getPathName = function (route) {
  let pathName = '';
  if (route.name.substr(0, 1) === ':') {
    // 字符串前带':'表示是动态参数，需要获取参数名
    pathName = route.params[route.name.substr(1)];
  } else {
    pathName = route.name;
  }
  return pathName;
};

export default util;
