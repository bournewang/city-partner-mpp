import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    amount: 0,
    account: ""
  },
  onLoad() {
  },
  bindInputAmount(e){
    this.setData({amount: e.detail.value})
  },
  bindInputAccount(e){
    this.setData({account: e.detail.value})
  },
  submit(){
    let {amount, account} = this.data
    userApi.withdraw({amount, account}).then(res => {
      if (res.success) {
        getApp().store.setState({user: res.data})
        return Toast({
          context: this,
          selector: '#t-toast',
          message: '提现申请已提交',
        });
      }else{
        return Toast({
          context: this,
          selector: '#t-toast',
          message: res.msg,
        });
      }
    })
  }
})
