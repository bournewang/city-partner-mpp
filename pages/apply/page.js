import userApi from "../../api/user"
import authApi from "../../utils/auth"
import publicApi from "../../api/public"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    apply_type: null,
    edit_city: false,
    edit_city1: false,
    area_name: null, 
    popup: false,
    privacy_agree: false,
    showPrivacyError: false,    
    challengeOptions: [
      {value: "consumer", label: "消费商"},
      {value: "car_manager", label: "车管家"},
      {value: "car_owner", label: "车东家"}
    ],
    submitText: null,
    agent_area_text: null,
    payPrompt: null,
    user: {},
    errors: {}
  },
  onLoad(option) {
    const propmpts = {
      challenge:{title: "征召授职申请表", payPrompt: "征召权益金", submitText: "确认征召"},
      funding:  {title: "加入互助申请表", payPrompt: "风险保证金", submitText: "确认加入互助"},
      consumer: {title: "入伙申请表",     payPrompt: "实缴",      submitText: "确认入伙"},
      agent:    {title: "征召代理申请表",  payPrompt: "代理保证金", submitText: "确认申请代理"}
    };
    let {title, payPrompt, submitText} = propmpts[option.type];
    this.setData({
      apply_type: option.type, 
      payPrompt,
      submitText
    })
    wx.setNavigationBarTitle({title})
    // const {user} = getApp().store.getState()
    // this.setData({user})
    userApi.info("include_images").then(res => {
      console.log(res)
      this.setData({user: res.data})
    })
    
  },
  onChallengeChange(e){
    console.log(e)
    this.setData({"user.challenge_type": e.detail.value})
  },
  onChange(e){
    console.log(e)
    this.setData({"user.partner_role": JSON.stringify(e.detail.value)})
  },
  
  toggleCitySelector(){
    this.setData({edit_city: !this.data.edit_city})
  },
  toggleCitySelector1(){
    this.setData({edit_city1: !this.data.edit_city1})
  },
  onAreaChange(e) {
    console.log("======= onAreaChange")
    console.log(e)
    this.setData({
      // area_name: e.detail.area_name,
      "user.province_code": e.detail.area_code[0],
      "user.city_code":     e.detail.area_code[1] || "",
      "user.county_code":   e.detail.area_code[2] || "",
      "user.province_name": e.detail.area_name[0],
      "user.city_name":     e.detail.area_name[1] || "",
      "user.county_name":   e.detail.area_name[2] || "",
    })
  },
  onAreaChange1(e) {
    console.log("======= onAreaChange")
    console.log(e)
    this.setData({
      // area_name: e.detail.area_name,
      "user.agent_province_code": e.detail.area_code[0],
      "user.agent_city_code":     e.detail.area_code[1] || "",
      "user.agent_county_code":   e.detail.area_code[2] || "",
      "user.agent_province_name": e.detail.area_name[0],
      "user.agent_city_name":     e.detail.area_name[1] || "",
      "user.agent_county_name":   e.detail.area_name[2] || "",
      agent_area_text: (e.detail.area_name[0] || "")
                      + (e.detail.area_name[1] || "") 
                      + (e.detail.area_name[2] || "")
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
  onAgreeChange(e){
    console.log("checked: "+e.detail.value)
    this.setData({privacy_agree: e.detail.value})
  },
  submit(){
    let {apply_type, privacy_agree} = this.data
    if (!privacy_agree) {
      this.setData({showPrivacyError: true});
      return;
    }    
    
    // update profile
    const fields = [
      "name","id_no", "mobile",
      "province_code","city_code","county_code","province_name","city_name", "county_name","street"
    ];
    if (apply_type == "challenge") {
      fields.push("challenge_type")
    }
    if (apply_type != "agent") {
      fields.push("partner_role")
    }else{
      fields.push("agent_province_code")
      fields.push("agent_city_code")
      fields.push("agent_province_name")
      fields.push("agent_city_name")
    }
    let errors = {};
    let {user} = getApp().store.getState()
    fields.map((key) => {
      if (key != 'city_name' 
        && key != 'agent_city_name' 
        && !this.data.user[key] 
        && !user[key])
      errors[key] = true
    })
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

    let data = {};
    fields.map((key) => {data[key] = this.data.user[key]})

    // console.log(data)
    data.apply_type = this.data.apply_type
    userApi.apply(data).then(res => {
      if (res.success) {
        // getApp().store.setState({user: res.data})
        authApi.setLocalUserInfo(res.data)
        wx.navigateTo({
          url: "/pages/my/page"
        })
      }
    })

    // create challenge or crowdfunding
  }
})
