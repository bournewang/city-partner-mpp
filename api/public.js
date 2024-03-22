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

export default {
  index,
  privacy,
  areaData
}