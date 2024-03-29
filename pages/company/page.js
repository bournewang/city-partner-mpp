import publicApi from "../../api/public"
import companyApi from "../../api/company"
import userApi from "../../api/user"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    pickerShow: {},
    company: {},
    pickerText: {},
    privacy_agree: false,
    showPrivacyError: false,  
    errors: {}
  },
  onLoad() {
    let {user, companyOptions} = getApp().store.getState()
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
        this.setData({company, pickerText: {bank: company.bank_label}})
      }else{
        let {companyOptions} = getApp().store.getState()
        company = {}
        companyOptions.fieldOptions.map((item) => company[item.name] = item.defaultValue)
        this.setData({company})
      }
    })
  },
  bindInput(e){
    console.log(e)
    let {company} = this.data
    company[e.currentTarget.dataset.name] = e.detail.value
    this.setData({company})
  },
  bindPicker(e){
    console.log(e)
    let {company, pickerText} = this.data
    let field_name = e.currentTarget.dataset.name
    let field_value = e.detail.value[0]
    company[field_name] = field_value

    let {companyOptions} = getApp().store.getState()
    // get options
    let options = []
    companyOptions.fieldOptions.map(item => {if (item.name == field_name) options = item.options})
    options.map(item => {if (item.value == field_value)pickerText[field_name] = item.label})
    this.setData({company, pickerText})
  },
  showPicker(e){
    console.log()
    console.log(e.currentTarget.dataset.name)
    let field = e.currentTarget.dataset.name
    let show = this.data.pickerShow
    show[field] = true
    console.log(show)
    this.setData({pickerShow: show})
  },
  onPickerCancel(e){
    console.log("cancel picker")
    let field = e.currentTarget.dataset.name
    let show = this.data.pickerShow
    show[field] = false
    console.log(show)
    this.setData({pickerShow: show})
  },
  onAgreeChange(e){
    console.log("checked: "+e.detail.value)
    this.setData({privacy_agree: e.detail.value})
  },
  onSubmit(){
    let {company, privacy_agree} = this.data
    if (!privacy_agree) {
      this.setData({showPrivacyError: true});
      return;
    }        
    console.log(this.data.company)
    let {fieldOptions} = getApp().store.getState().companyOptions
    let requiredFields = [];
    let errors = {}
    fieldOptions.map( item => item.required && !company[item.name] ? errors[item.name] = true : "")
    console.log(errors)
    if (Object.keys(errors).length) {
      this.setData({errors})
      console.log(errors)
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请填写所有项目',
      });
      
      return;
    }
    // fieldOptions.map( item => {Array.isArray(company[item.name]) ? company[item.name] = JSON.stringify(company[item.name]) : {}})
    let data = {}
    fieldOptions.map( item => {if (company[item.name])data[item.name] = company[item.name]})
    
    companyApi.create(data).then(res => {
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
