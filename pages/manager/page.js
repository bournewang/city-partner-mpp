import agentApi from "../../api/agent"
import publicApi from "../../api/public"

Page({
  data: {
    manager: null,
    tab: "manager"
  },
  onLoad(option) {
    let {formOptions} = getApp().store.getState()
    if (!formOptions){
      publicApi.formOptions()
    }
    let {user_id} = option
    console.log(option)
    agentApi.manager(user_id).then(res => {
      let {manager, partnerStats} = res.data
      this.setData({manager, partnerStats})
    })
  },
  onTabsChange(event) {
    //console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },
})
