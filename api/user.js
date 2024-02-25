import request, { uploadFile } from '../utils/request'
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

export function info() {
  return request({
    uri: '/user/info',
  })
}
export function challenge() {
  return request({
    uri: '/user/challenge',
  })
}

export function start_challenge(){
  return request({
    method: 'post',
    uri: '/user/challenge'
  })
}

export function qrcode() {
  return request({
    uri: '/user/qrcode',
  })
}

// export function saveInfo(data) {
//   return request({
//     uri: '/user/info',
//     method: 'post',
//     data

//   })
// }

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
  challenge,
  start_challenge,
  qrcode,
  teamOverview,
  teamDetail
}