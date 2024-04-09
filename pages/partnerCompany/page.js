import publicApi from "../../api/public"
import companyApi from "../../api/company"
import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    company: null,
    asset: null,
    car: null,
    edit: {company: false, asset: false, car: false},
    assetTitle: {
      "consumer": "新消费合伙资产",
      "car_manager": "使用权合伙资产",
      "car_owner": "CCER合伙资产"
    },
    // editAsset: false,
    // editCar: false,
    tab: 'company'
  },
  onLoad() {
    let {user, formOptions} = getApp().store.getState()
    if (user && user.challenge_type) {
      wx.setNavigationBarTitle({
        title: '我的' + user.challenge_type_label
      })
    }
    if (!formOptions){
      publicApi.formOptions()
    }
    userApi.partnerCompany()
     .then(res => {
      let company = res.data
      this.setData({company})
      // let asset = res.data.partnerAsset
      let {user} = getApp().store.getState()
    })
  },
  onEdit(e){
    let {type} = e.currentTarget.dataset
    let {edit} = this.data
    edit[type] = true
    this.setData({edit})
  },
  onTabsChange(event) {
    //console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    this.setData({tab: event.detail.value})
  },  
  onSubmit(e){
    console.log("------ COMPANY ON SUBMIT")
    console.log(e)
    let data = e.detail.value
    let {tab, company, edit} = this.data
    let request = (tab == 'company' ? companyApi.create(data) : (
      tab == 'asset' && company.id ? companyApi.partnerAsset(company.id, data) : 
      userApi.saveCar(data)
    ))
    request.then(res => {
      edit[tab] = false
      console.log("===edit")
      console.log(edit)
      // this.setData({edit})
      if (res.success) {
        // let data = this.data
        // data[tab] = res.data
        // data.edit = edit
        this.setData({edit})
        Toast({
          context: this,
          selector: '#t-toast',
          message: '保存成功！',
        });
      }else{
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.msg,
        });
      }
    })
  }
})
