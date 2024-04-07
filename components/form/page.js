import Toast from 'tdesign-miniprogram/toast/index';

Component({
  properties: {
    fieldOptions: {type: Array, value: []},
    value: {type: Object, value: {}},
    displayMode: {type: Boolean, value: false}
  },
  data: {
    pickerShow: {},
    model: {},
    pickerText: {},
    privacy_agree: false,
    showPrivacyError: false,  
    errors: {}    
  },
  ready: function(){
    let {value} = this.properties
    console.log("form ready -------- ")
    console.log(value)
    if (value) {
      this.setData({model: value})
    }
  },
  methods: {
    bindInput(e){
      console.log(e)
      let {model} = this.data
      model[e.currentTarget.dataset.name] = e.detail.value
      this.setData({model})
    },
    bindPicker(e){
      console.log(e)
      let {model, pickerText} = this.data
      let field_name = e.currentTarget.dataset.name
      let field_value = e.detail.value[0]
      model[field_name] = field_value

      // get options
      let options = []
      let {fieldOptions} = this.properties
      fieldOptions.map(item => {if (item.name == field_name) options = item.options})
      options.map(item => {if (item.value == field_value)pickerText[field_name] = item.label})
      this.setData({model, pickerText})
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
      let {model, privacy_agree} = this.data
      if (!privacy_agree) {
        this.setData({showPrivacyError: true});
        return;
      }        
      console.log(this.data.model)
      let {fieldOptions} = this.properties
      let requiredFields = [];
      let errors = {}
      fieldOptions.map( item => item.required && !model[item.name] ? errors[item.name] = true : "")
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
      let data = {}
      fieldOptions.map( item => {if (model[item.name])data[item.name] = model[item.name]})
      
      console.log("trigger bindSubmit event ------")
      console.log(data)
      this.triggerEvent('fireSubmit', {value: data});
    }
  }
})
