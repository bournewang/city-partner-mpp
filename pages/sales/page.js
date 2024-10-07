import authApi from "../../utils/auth"
import publicApi from "../../api/public"
import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    resp: "non_resp",
    respOptions: [{label: "无责", value: "non_resp"}, {label: "有责", value:"resp"}]
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
    const {resp} = this.data
    userApi.submitSales({sales: resp})
  },
  gotoQrCode(){
    wx.navigateTo({
      url: '/pages/qrcode/page',
    })
  }
})
