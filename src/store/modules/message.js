
import {
  GET_REMINDER,
  GET_READ_REMINDER,
  GET_SYSTEM_MSG,
  SET_REMINDER,
  SET_READ_REMINDER,
  SET_SYSTEM_MSG
} from '../../constants/message.js'

const state = {
  reminder:'',
  readReminder:'',
  systemMsg:'',
}

const actions = {
  getReminder({commit}, res) {
    commit(SET_REMINDER, res)
  },



}

const getters = {
  reminder: state => state.reminder,

}

const mutations = {
  [SET_REMINDER](state, status) {
    state.reminder = status;
    alert(1);
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
