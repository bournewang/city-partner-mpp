import request from '../utils/request'

function fundingStats(include_activity) {
  return request({
    uri: '/car-manager/funding-stats' +
      (include_activity ? "?activity=1" : "")
  })
}

function fundingRules() {
  return request({
    uri: '/car-manager/funding-rules'
  }).then(res => {
    wx.setStorageSync('fundingRules', res.data)
    return res
  })
}

export default{
  fundingRules,
  fundingStats
}