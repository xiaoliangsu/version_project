/**
 * @file 动态参数
 **/

const state = {
  currentPath: [],//当前路径
  routeParams:{},//路由动态参数

}


const getters = {
  test: state => state.routeParams.test,

}

const mutations = {
  setTest(state,test){
    state.test = test;
  }
}

export default {
  state,
  getters,
  mutations
}
