import agentApi from "../../api/agent"
import { agent } from "../../api/user"

Page({
  data: {
  },
  onLoad() {
    agentApi.managers()    
  },
  showUser(e){
    console.log(e)
    // console.log()
    let {userid} = e.currentTarget.dataset
    console.log("userid: "+userid)
    let {user} = getApp().store.getState()
    if (user.is_agent) {
      wx.navigateTo({
        url: '/pages/manager/page?user_id='+userid,
      })
    }
  }  
})
