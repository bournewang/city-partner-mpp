import request from '../utils/request'
function index(){
  return request({
    uri: '/public/index',
  }).then(res => {
    // wx.setStorageSync('areaData', res.data)
    getApp().store.setState(res.data)
    return res
  })

}
function areaData() {
  const area = wx.getStorageSync('areaData')
  if (area) {
    return Promise.resolve(area)
  }
  return request({
    uri: '/public/area',
  }).then(res => {
    wx.setStorageSync('areaData', res.data)
    return res.data
  })
}

function privacy() {
  return request({
    uri: '/public/privacy',
  }).then(res => {
    getApp().store.setState({privacy: res.data})
    return res
  })
}

function formOptions() {
  return request({
    uri: '/public/form-options',
  }).then(res => {
    getApp().store.setState({formOptions: res.data})
    return res
  })
}

function apps(){
  return request({
    uri: '/public/apps',
  }).then(res => {
    getApp().store.setState({apps: res.data})
    return res
  })
}

function banners(){
  return request({
    uri: '/public/banners',
  }).then(res => {
    getApp().store.setState({banners: res.data})
    return res
  })
}

function market(){
  return request({
    uri: '/public/market',
  }).then(res => {
    getApp().store.setState({market: res.data})
    return res
  })
}

function rules(){
  getApp().store.setState({loading: true})
  return request({
    uri: '/public/rules',
  }).then(res => {
    getApp().store.setState({rules: res.data, loading: false})
    return res
  })
}

function userActivity(page=1, keyword) {
  getApp().store.setState({loading: true})
  return request({uri: `/public/user-activity?keyword=${keyword}&page=${page}`}).then(res => {
    getApp().store.setState({loading: false})
    return res
  })
}
export default {
  index,
  privacy,
  formOptions,
  apps,
  banners,
  market,
  rules,
  userActivity,
  areaData
}