import userApi from "../../api/user"
import authApi from "../../utils/auth"
import Toast from '../../tdesign-miniprogram/toast/index';

Page({
  data: {
    apply_type: null,
    edit_city: false,
    area_name: null, 
    stats: [],
    user: {}
  },
  onLoad(option) {
    this.setData({apply_type: option.type})
    
    const {user} = getApp().store.getState()
    this.setData({user})
  },
  toggleCitySelector(){
    this.setData({edit_city: !this.data.edit_city})
  },
  onAreaChange(e) {
    console.log("======= onAreaChange")
    console.log(e)
    this.setData({
      // area_name: e.detail.area_name,
      "user.province_code": e.detail.area_code[0],
      "user.city_code": e.detail.area_code[1] || "",
      "user.county_code": e.detail.area_code[2] || "",
      "user.province_name": e.detail.area_name[0],
      "user.city_name": e.detail.area_name[1] || "",
      "user.county_name": e.detail.area_name[2] || "",
    })
  },
  bindInputName(e) {
    this.setData({ 'user.name': e.detail.value })
  },
  bindInputIdNo(e) {
    this.setData({ 'user.id_no': e.detail.value })
  },
  bindInputMobile(e) {
    this.setData({ 'user.mobile': e.detail.value })
  },
  bindInputStreet(e) {
    this.setData({ 'user.street': e.detail.value })
  },
  

  submit(){
    // update profile
    const fields = ["name","id_no", "mobile","province_code","city_code","county_code","province_name","city_name","county_name","street"];
    let data = {};
    fields.map((key) => {data[key] = this.data.user[key]})

    console.log(data)
    data.apply_type = this.data.apply_type
    userApi.apply(data).then(res => {
      if (res.success) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '提交成功！',
        });
        wx.navigateBack({delta: 1})        
      }
    })

    // create challenge or crowdfunding
  }
})
