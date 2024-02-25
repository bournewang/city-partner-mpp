import {login} from "../api/user"

function getLocalToken() {
  return wx.getStorageSync('token')
}

function setLocalToken(data) {
  wx.setStorageSync('token', data)
}
function removeLocalToken() {
  wx.removeStorageSync('token')
}

function getLocalUserInfo() {
  return wx.getStorageSync('userInfo')
}

function setLocalUserInfo(data) {
  wx.setStorageSync('userInfo', data)
}

function removeLocalUserInfo() {
  wx.removeStorageSync('userInfo')
}

function wxLogin(need_register = 0) {
  console.log("===== wxLogin")
  return new Promise((resolve, reject) => {
    wx.login({
      success: res2 => {
        login({ code: res2.code }).then(res3 => {
          // log('login', res3)
          if (res3.data.api_token) {
            setLocalToken(res3.data.api_token)
            setLocalUserInfo(res3.data)
            // resolve(res3.data)
          } else if (need_register){
            console.log('login reject, return with session_key: ', res3.data.session_key)
            wx.setStorageSync('session_key', res3.data.session_key)
            wx.navigateTo({
              url: '/pages/login/page',
            })
            // reject(res3.data)
          }
        })
      },
      error: res => {
        reject('获取code失败 ' + res)
      }
    })
  })
}


export default{
  getLocalToken,
  setLocalToken,
  removeLocalToken,
  getLocalUserInfo,
  setLocalUserInfo,
  removeLocalUserInfo,
  wxLogin
}