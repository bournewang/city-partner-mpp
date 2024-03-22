import request from '../utils/request'

function fundingStats(include_activity) {
  return request({
    uri: '/car-manager/funding-stats' +
      (include_activity ? "?activity=1" : "")
  })
}

function fundingConfig() {
  return request({
    uri: '/car-manager/funding-config'
  }).then(res => {
    // wx.setStorageSync('fundingConfig', res.data)
    getApp().store.setState({fundingConfig: res.data})
    return res
  })
}

export default{
  fundingConfig,
  fundingStats
}