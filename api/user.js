import request, { uploadFile } from '../utils/request'
import authApi from "../utils/auth"
import {API_URL} from "../config"

export function login(data) {
  return request({
    uri: '/wxapp/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    uri: '/wxapp/register',
    method: 'post',
    data
  })
}

export function info(include_images = false) {
  var url = '/user/info';
  if (include_images) {
    url += "?include_images=1"
  }
  getApp().store.setState({loading: true})
  return request({
    uri: url,
  }).then(res => {
    getApp().store.setState({loading: false})
    if (res.success) {
      getApp().store.setState({user: res.data})
    }
    return res
  })
}
export function challenge() {
  return request({
    uri: '/user/challenge',
  }).then(res => {
    getApp().store.setState({challenge: res.data})
    return res
  })
}
export function crowdFunding() {
  return request({
    uri: '/user/crowdFunding',
  }).then(res => {
    getApp().store.setState({crowdFunding: res.data})
    return res
  })
}

export function company() {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/company',
  }).then(res => {
    getApp().store.setState({
      company: res.data.company, 
      partnerStats: res.data.partnerStats, 
      loading: false
    })
    return res
  })
}

export function partnerCompany() {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/partner-company',
  }).then(res => {
    let {partnerCompany, partnerAsset, car} = res.data
    getApp().store.setState({partnerCompany, partnerAsset, car, loading: false})
    return res
  })
}

export function agent() {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/agent',
  }).then(res => {
    getApp().store.setState({agent: res.data, loading: false})
    return res
  })
}

export function car() {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/car',
  }).then(res => {
    getApp().store.setState({car: res.data, loading: false})
    return res
  })
}

export function saveCar(data) {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/car',
    method: 'post',
    data
  }).then(res => {
    if (res.success) {
      getApp().store.setState({car: res.data, myCar: res.data, loading: false})
    }
    return res
  })
}

export function getLocalChallenge(){
  return wx.getStorageSync('my_challenge')
}

export function uploadImage(file_url, collection_name) {
  // return fileApi.upload(file_url, {collection: 'id_card_'+type})
  return wx.uploadFile({
    header: {Authorization: 'Bearer '+authApi.getLocalToken()},
    url: API_URL + '/user/images',
    filePath: file_url,
    name: 'img',
    formData: {collection: collection_name},
    success: () => {
      // this.setData({
      //   [`fileList[${length}].status`]: 'done',
      // });
    },
  })  
}

export function start_challenge(data={}){
  return request({
    method: 'post',
    uri: '/user/challenge',
    data
  }).then(res => {
    getApp().store.setState({challenge: res.data})
    return res
  })
}

export function qrcode() {
  return request({
    uri: '/user/qrcode',
  })
}

export function saveInfo(data) {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/info',
    method: 'post',
    data
  }).then(res => {
    getApp().store.setState({loading: false})
    if (res.success) {
      getApp().store.setState({user: res.data})
    }
    return res
  })
}

export function apply(data) {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/apply',
    method: 'post',
    data
  }).then(res => {
    getApp().store.setState({loading: false})
    if (res.success) {
      let state = {}
      if (data.apply_type == 'challenge') {
        state.challenge = res.data
      }else{
        state.crowdFunding = res.data
      }
      getApp().store.setState(state)
    }
    return res
  })
}

export function recommends(page=1) {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/paginate-recommends?page='+page
  }).then(res => {
    getApp().store.setState({loading:false})
    return res
  })
}

export function partnerStats() {
  return request({
    uri: '/user/partner-stats'
  }).then(res => {
    getApp().store.setState({partnerStats: res.data})
  })
}

export function submitSales(data) {
  getApp().store.setState({loading: true})
  return request({
    uri: '/user/sales',
    method: 'post',
    data
  }).then(res => {
    getApp().store.setState({loading: false})
    if (res.success) {
      getApp().store.setState({user: res.data})
    }
    return res
  })
}

export function topup(amount){
  return request({
    uri: '/user/topup',
    method: 'post',
    data: {amount}
  })
}

export function withdraw(data){
  return request({
    uri: "/user/withdraw",
    method: 'post',
    data
  })
}

// export function uploadCommonFile(filePath, data) {
//   return uploadFile({
//     uri: '/file',
//     filePath,
//     data
//   })
// }

// export function mobile(data) {
//   return request({
//     uri: '/user/mobile',
//     method: 'post',
//     data
//   })
// }

export function teamOverview(){
  return request({
    uri: `/user/team-overview`,
  })
}
// export function directMembersRange(){
//   return request({
//     uri: `/direct-members-range`,
//   })
// }

export function teamDetail(){
  return request({
    uri: `/user/team-detail`,
  })
}

export function consumer(id){
  return request({uri: "/consumer/"+id})
}

export default {
  register,
  login,
  consumer,
  info,
  saveInfo,
  uploadImage,
  challenge,
  crowdFunding,
  company,
  partnerCompany,
  partnerStats,
  agent,
  car,
  saveCar,
  recommends,
  apply,
  submitSales,
  topup,
  withdraw,
  getLocalChallenge,
  start_challenge,
  qrcode,
  teamOverview,
  teamDetail
}