import publicApi from "../../api/public"

Page({
  data: {
  },
  onLoad() {
    // const {apps}  = getApp().store.getState()
    publicApi.market()  
  },
  openApp(e){
    console.log(e)
    let {type, url, category} = e.currentTarget.dataset
    console.log("url: "+ url+", category: "+category)
    if(!url) return
    // wx.navigateToMiniProgram({appId})
    let query = null
    let extraData = {}
    if (category == "app") {
      let {user} = getApp().store.getState()
      if (user) {
        extraData = {
          name: user.name,
          mobile: user.mobile,
          avatar: user.avatar
        }
        query = [
          "url="    + url, 
          "name="   + user.name,
          "mobile=" + user.mobile,
          "avatar=" + user.avatar,
        ].join("&")

        console.log("extra Data: ")
        console.log(extraData)
        console.log("query: ")
        console.log(query)
      }else{
        console.log("use not login -----")
      }
    }
    if (type == "web" || type == "outer_url") {
      wx.navigateTo({
        url: "/pages/web/page?"+(query || "")
      })
    }else if (type == "inner_url") {  
      wx.navigateTo({
        url: url,
      })
    }else if (type == "mpp") {
      wx.navigateToMiniProgram({
        appId: url,
        extraData
      })
    }
  },
})
