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
  return request({
    uri: url,
  }).then(res => {
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
  return request({
    uri: '/user/recommends'
  }).then(res => {
    getApp().store.setState({recommends: res.data})
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

export default {
  register,
  login,
  info,
  saveInfo,
  uploadImage,
  challenge,
  crowdFunding,
  recommends,
  apply,
  getLocalChallenge,
  start_challenge,
  qrcode,
  teamOverview,
  teamDetail
}