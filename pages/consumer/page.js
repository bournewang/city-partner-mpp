import userApi from "../../api/user"
import publicApi from "../../api/public"

Page({
  data: {
    consumer: null,
    consumerFields: null, 
    car: null, 
    carFields: null,
    tab: 0
  },
  onLoad(option) {
    let {formOptions} = getApp().store.getState()
    if (!formOptions){
      publicApi.formOptions()
    }
    let {user_id} = option
    console.log(option)
    userApi.consumer(user_id).then(res => {
      let {consumer,  car,  partnerAsset,} = res.data
      // console.log(info)
      this.setData({consumer, car,  partnerAsset})
    })
  },
  onTabsChange(event) {
    //console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },
})
