// logs.js
// const util = require('../../utils/util.js')
import "../../api/challenge";
import challengeApi from "../../api/challenge";
Page({
  data: {
    list: [],
    loading: true
  },
  onLoad() {
    challengeApi.activity().then(res => {
      console.log("get challenge list ========")
      console.log(res.data)
      this.setData({ list: res.data, loading: false })
      console.log("challenge list end ========")
    })
    // 
    
  }
})
