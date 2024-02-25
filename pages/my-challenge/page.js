// logs.js
// const util = require('../../utils/util.js')
import userApi from "../../api/user"

Page({
  data: {
    teamData: [],
    loading: true
  },
  onLoad() {
    var that = this
    // that.setData({loading: true})
    userApi.teamDetail().then(res => {
      console.log(res.data)
      that.setData({teamData: res.data, loading: false})
    })
  }
})
