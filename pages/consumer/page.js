import userApi from "../../api/user"
Page({
  data: {
    consumer: null,
    consumerFields: null, 
    car: null, 
    carFields: null,
    tab: 0
  },
  onLoad(option) {
    let {user_id} = option
    console.log(option)
    userApi.consumer(user_id).then(res => {
      let {consumer, consumerFields, 
          car, carFields,
          partnerAsset, partnerAssetFields
        } = res.data
      // console.log(info)
      this.setData({
        consumer, consumerFields, 
        car, carFields, 
        partnerAsset, partnerAssetFields
      })
    })
  },
  onTabsChange(event) {
    //console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },
})
