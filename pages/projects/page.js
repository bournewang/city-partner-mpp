
import userApi from "../../api/user"
import Toast from '../../tdesign-miniprogram/toast/index';

Page({
  data: {
    tab: 1,
    popup: false,
    name: null,
    mobile: null
  },
  methods: {
    
  },
  onLoad(options){
       
  },
  onTabsChange(event) {
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },

  onTabsClick(event) {
    // console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
  showRegister(){
    this.setData({popup: true})
  },
  onVisibleChange(e){
    this.setData({
      popup: e.detail.visible,
    });
  },  
  bindInputName(e) {
    // console.log(e.type +"," + e.detail.value)
    this.setData({ 'name': e.detail.value })
  },  
  bindInputMobile(e) {
    // console.log(e.type +"," + e.detail.value)
    this.setData({ 'mobile': e.detail.value })
  },  
  register(){
    userApi.saveInfo({
      name: this.data.name, 
      mobile: this.data.mobile
    }).then(res => {
      if (res.success) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '注册成功！',
        });
      }      
    })
  },
  goFillProfile(){
    return wx.navigateTo({
      url: "/pages/profile/page"
    })
  }
})
