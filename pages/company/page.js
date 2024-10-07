import publicApi from "../../api/public"
import companyApi from "../../api/company"
import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    company: null,
    user: null,
    edit: {company: false, user: false},
    // editAsset: false,
    // editCar: false,
    tab: 'company'
  },
  onLoad() {
    let {user, formOptions} = getApp().store.getState()
    if (!user.is_partner) {
        return Toast({
          context: this,
          duration: 2000,
          selector: '#t-toast-precheck',
          message: '请先入伙登记',
        });
      }
    this.setData({user})
    if (user && user.challenge_type) {
      wx.setNavigationBarTitle({
        title: '我的' + user.challenge_type_label + "合作社"
      })
    }
    if (!formOptions){
      publicApi.formOptions()
    }
    userApi.company().then(res => {
      let {company} = res.data
      if (company && company.id) {
        this.setData({company})
      }else{
        // if (user.challenge_id) {
        let {formOptions} = getApp().store.getState()
        company = {}
        formOptions.companyOptions.map((item) => company[item.name] = item.defaultValue)
        this.setData({company, edit: {company: true, user:false}})
        // }
      }
    })
  },
  goBack(){
    wx.navigateBack();
  },
  onEdit(e){
    let {type} = e.currentTarget.dataset
    let {edit} = this.data
    edit[type] = true
    this.setData({edit})
  },
  onTabsChange(event) {
    this.setData({tab: event.detail.value})
  },  
  onSubmit(e){
    console.log("------ COMPANY ON SUBMIT")
    console.log(e)
    let formData = e.detail.value
    let {tab, edit} = this.data
    let request = (tab == "company" ? companyApi.save(formData) : userApi.saveInfo(formData))
    request.then(res => {
      edit[tab] = false
      // this.setData({edit})
      console.log(edit)
      if (res.success) {
        let data = this.data
        data[tab] = res.data
        data.edit = edit
        console.log("update success")
        console.log(data)
        this.setData(data)
        // let state = getApp().store.getState()
        // state[tab] = res.data
        // getApp().store.setState(state)
        Toast({context: this,selector: '#t-toast',message: '保存成功！',});
      }else{
        Toast({context: this,selector: '#t-toast',message: res.msg});
      }
    })
  },
  goAuditTopup(){
    wx.navigateTo({
      url: '/pages/topup-admin/page',
    })
  }
})
