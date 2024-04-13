
import userApi from "../../api/user"
import Toast from '../../tdesign-miniprogram/toast/index';

Page({
  data: {
    tab: 'consumer',
    submitText: {
      'consumer': "消费商",
      'car_manager': "车管家",
      'car_owner': "车东家"
    },
    partnerCompany: null,
    // popup: false,
    // name: null,
    // mobile: null,
  },
  methods: {
    
  },
  onLoad(options){
    let {user} = getApp().store.getState()
    if (user && user.challenge_type) {
      this.setData({tab: user.challenge_type})
    }
    if (user.is_partner) {
      userApi.partnerCompany().then(res => {
        this.setData({
          partnerCompany: res.data.company
        })
      })
      userApi.partnerStats()
    }
  },
  onTabsChange(event) {
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },
  goApply(e){
    let type = e.currentTarget.dataset.type
    let {user} = getApp().store.getState()
    if (user.level < 1) {// REGISTER_CONSUMER
      return Toast({
        context: this,
        selector: '#t-toast',
        message: '请先扫码注册消费者',
      });
    }

    return wx.navigateTo({
      url: "/pages/apply/page?type="+type
    })
  },
  showRules(e) {
    let {type} = e.currentTarget.dataset
    console.log(type);
    wx.navigateTo({
      url: '/pages/rules/page?page=partner&type='+type,
    })
  },  

})
