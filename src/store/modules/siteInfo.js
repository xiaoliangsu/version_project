import  {
  SET_SITE_TOKEN,
  SET_SITE_NAME,
  SET_SITE_LOCATION
} from  '../../constants/siteInfo.js'

const state = {
  siteToken:'',
  siteName:'',
  siteLocation:{}
}

const getters ={
  getSiteToken : state=> state.siteToken,
  getSiteName: state => state.siteName,
  getSiteLocation: state=> state.siteLocation
}

const mutations = {
  [SET_SITE_TOKEN](state, payload) {
    state.siteToken = payload.siteToken;
  },
  [SET_SITE_NAME](state, payload) {
    state.siteName = payload.siteName;
  },
  [SET_SITE_LOCATION](state, payload) {
    state.siteLocation = payload.siteLocation;
    // console.log(state)
  },
}

export default  {
  state,
  getters,
  mutations

}
