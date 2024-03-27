import publicApi from "../../api/public"

Page({
  data: {
  },
  onLoad() {
    // const {apps}  = getApp().store.getState()
    publicApi.apps()    
  },
  openApp(e){
    console.log(e)
    let {type, url} = e.currentTarget.dataset
    console.log("url: "+ url)
    if(!url) return
    // wx.navigateToMiniProgram({appId})
    let {user} = getApp().store.getState()
    let query = [
      "url="    + url, 
      "name="   + user.name,
      "mobile=" + user.mobile,
      "avatar=" + user.avatar,
    ]
    if (type == "web") {
      wx.navigateTo({
        url: "/pages/web/page?"+query.join("&")
      })
    }else if (type == "mpp") {
      wx.navigateToMiniProgram({
        appId: url,
        extraData: {
          name: user.name,
          mobile: user.mobile,
          avatar: user.avatar
        }
      })
    }
  },
})
