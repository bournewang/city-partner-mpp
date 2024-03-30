import userApi from "../../api/user"
import publicApi from "../../api/public"
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    isShowKeyboard: false, //是否显示键盘,默认显示
    plate: [],
    privacy_agree: false,
    showPrivacyError: false,  
    car: {}
  },
  onLoad() {
    publicApi.carOptions()
    userApi.car()
  },
  onPlateKeyboardValueChange(e) {
    let {car} = this.data
    car.plate_no = e.detail.join("")
    this.setData({
        plate: e.detail,
        car
    })
    console.log(e.detail)
  },
  onFocusTap() {
    console.log("======= on focus tap")
      this.setData({
          isShowKeyboard: true
      })
  },  
  bindVin(e){
    let {car} = this.data
    car.vin = e.detail.value
    this.setData({car})
  },
  onAgreeChange(e){
    console.log("checked: "+e.detail.value)
    this.setData({privacy_agree: e.detail.value})
  },  
  onSubmit(e){
    let {car, privacy_agree} = this.data
    if (!privacy_agree) {
      this.setData({showPrivacyError: true});
      return;
    }        
    console.log(this.data.car)
    let errors = {}
    if (!car.plate_no) errors.plate_no = true
    if (!car.vin) errors.vin = true
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
    
    if (car.vin.length != 17) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入正确的17位车架号码',
      });
      return
    }

    userApi.addCar(car).then(res => {
      if (!res.success) {
      // this.setData({errors: {vin: true}})
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.msg,
        });
      }
    })
  }
})
