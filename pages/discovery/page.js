// logs.js
// const util = require('../../utils/util.js')
import "../../api/challenge";
import challengeApi from "../../api/challenge";
Page({
  data: {
    list: []
  },
  onLoad() {
    challengeApi.successList().then(res => {
      console.log("get challenge list ========")
      console.log(res.data)
      this.setData({ list: res.data })
      console.log("challenge list end ========")
    })
    // 
    
  }
})
