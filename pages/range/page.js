// logs.js
// const util = require('../../utils/util.js')
import challengeApi from "../../api/challenge"
Page({
  data: {
    list: []
  },
  onLoad() {
    var that = this
    challengeApi.range().then(res => {
      that.setData({list: res.data})
    })
  }
})
