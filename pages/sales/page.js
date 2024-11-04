import authApi from "../../utils/auth"
import publicApi from "../../api/public"
import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    resp: "non_resp",
    respOptions: [{label: "无责", value: "non_resp"}, {label: "有责", value:"resp"}],
    operationOptions: [{label: "市场总监", value: "marketing_director"}, {label: "总监助理", value:"director_assistant"}],
    tab: 'sales',
    user: {}
  },
  onLoad() {
    const {user, rules, formOptions} = getApp().store.getState()
    console.log("form options ==== ")
    console.log(formOptions)
    if (!user) {
      authApi.wxLogin(function(){
        console.log("wxLogin returns ======== ")

        if (!formOptions){
          console.log("formOptions is null, retrieve")
          publicApi.formOptions()
        }
      })
    }
    if (!rules) {
      publicApi.rules()
    }    
    
  },
  bindInput(e){
    console.log(e)
    this.setData({resp: e.detail.value})
  },
  onSubmit(){
    const {user} = getApp().store.getState()
    if (user.level < 1) {
      return Toast({
        context: this,
        selector: '#t-toast',
        message: '请先扫码注册消费者',
      });
    }
    const {resp, tab} = this.data
    const data = {}
    data[tab] = resp
    const that = this
    userApi.submitSales(data).then(res => {
      that.onLoad()
    })
  },
  onTabsChange(event) {
    //console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },  
  gotoQrCode(){
    wx.navigateTo({
      url: '/pages/qrcode/page',
    })
  }
})
