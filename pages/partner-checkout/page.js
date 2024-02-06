// logs.js
// const util = require('../../utils/util.js')

Page({
  data: {
    current: 3000,
    options: [
      { value: 3000, label: '缴纳3000元权益金立即开始挑战' },
      { value: 500, label: '先缴纳500元占据前排座位，并与72小时内补齐3000元权益金。' }
    ]
  },
  onLoad() {
    
  },
  onChange(event){
    const { value } = event.detail;

    this.setData({ current: value });
  },
  checkout(){
    console.log("click checkout")
  }
})
