import publicApi from "../../api/public"

Page({
  data: {
  },
  onLoad() {
    let {rules} = getApp().store.getState()
    if (!rules || !rules.agent) {
      publicApi.rules()
    }
  },
  goApply(){
    return wx.navigateTo({
      url: "/pages/apply/page?type=agent"
    })
  }
})
