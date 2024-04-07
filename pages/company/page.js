import publicApi from "../../api/public"
import companyApi from "../../api/company"
import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    company: {},
    display: false
  },
  onLoad() {
    let {user, company, companyOptions} = getApp().store.getState()
    console.log("set company from state")
    console.log(company)
    this.setData({company})
    if (user.challenge_type) {
      wx.setNavigationBarTitle({
        title: '我的' + user.challenge_type_label
      })
    }
    if (!companyOptions){
      publicApi.companyOptions()
    }
    userApi.company().then(res => {
      let company = res.data
      if (company && company.id) {
        // company.partner_role = JSON.parse(company.partner_role)
        console.log("set company data ***")
        this.setData({company, display: 1, pickerText: {bank: company.bank_label}})
      }else{
        let {companyOptions} = getApp().store.getState()
        company = {}
        companyOptions.fieldOptions.map((item) => company[item.name] = item.defaultValue)
        this.setData({company, display: 0})
      }
    })
  },
  onEdit(){
    this.setData({display: !this.data.display})
  },
  onSubmit(e){
    console.log("------ COMPANY ON SUBMIT")
    console.log(e)
    let data = e.detail.value
    companyApi.create(data).then(res => {
      this.setData({display: 1})
      if (res.success) {
        getApp().store.setState({company: res.data})
        Toast({
          context: this,
          selector: '#t-toast',
          message: '保存成功！',
        });
        wx.navigateTo({
          url: "/pages/my/page"
        })
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
