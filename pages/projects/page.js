
import userApi from "../../api/user"
// import Toast from '../../tdesign-miniprogram/toast/index';

Page({
  data: {
    tab: 'consumer',
    submitText: {
      'consumer': "消费商",
      'car_manager': "车管家",
      'car_owner': "车东家"
    }
    // popup: false,
    // name: null,
    // mobile: null,
  },
  methods: {
    
  },
  onLoad(options){
    let {user} = getApp().store.getState()
    if (user.challenge_type) {
      this.setData({tab: user.challenge_type})
    }
  },
  onTabsChange(event) {
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },
  goApply(e){
    let type = e.currentTarget.dataset.type
    return wx.navigateTo({
      url: "/pages/apply/page?type="+type
    })
  },

})
