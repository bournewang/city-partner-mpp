import request from '../utils/request'

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

export default {
  areaData
}