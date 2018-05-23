// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routers} from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/style.scss'
import './style/layout.less'
import './style/common.less'
import BaiduMap from 'vue-baidu-map'

import store from './store/'
import Util from './utils/utils';


Vue.use(iView);
Vue.use(VueRouter);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'shtdnIPtrUgHv69aXpc3IO1zSoPFQA6O'
})

//路由配置
const RouterConfig = {
  routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.label);
  store.state.currentPath = to.path;
  store.state.routeParams = to.params;
  next();


});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);

});

Vue.config.productionTip = false
export default router;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  components: {App},
  template: '<App/>'
})
