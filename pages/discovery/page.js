// logs.js
// const util = require('../../utils/util.js')
import "../../api/challenge";
import { successList } from "../../api/challenge";
Page({
  data: {
    list: []
  },
  onLoad() {
    successList().then(res => {
      console.log("get challenge list ========")
      console.log(res.data)
      this.setData({ list: res.data })
      console.log("challenge list end ========")
    })
    // 
    
  }
})
