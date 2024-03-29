import {login} from "../api/user"
function getLocalToken() {
  // return wx.getStorageSync('token')
  let {token} = getApp().store.getState()
  return token 
}

function setLocalToken(data) {
  // wx.setStorageSync('token', data)
  getApp().store.setState({token: data});
}
function removeLocalToken() {
  // wx.removeStorageSync('token')
  getApp().store.setState({token: null});
}

function getLocalUserInfo() {
  // return wx.getStorageSync('userInfo')
  let {user} = getApp().store.getState()
  return user
}

function setLocalUserInfo(data) {
  // wx.setStorageSync('userInfo', data)
  getApp().store.setState({user: data});
}

function removeLocalUserInfo() {
  // wx.removeStorageSync('userInfo')
  getApp().store.setState({user: null});
}

function wxLogin(callback = null) {
  console.log("===== wxLogin")
  return new Promise((resolve, reject) => {
    wx.login({
      success: res2 => {
        let {jump_user} = getApp().store.getState()
        let param = { code: res2.code, referer_id: wx.getStorageSync('referer_id') }
        if (jump_user) {
          Object.keys(jump_user).map(key => {
            if (jump_user[key]){
              param[key] = jump_user[key]
            }
          })
        }
        login(param).then(res3 => {
          // log('login', res3)
          if (res3.data.api_token) {
            console.log("------ set token "+res3.data.api_token)
            setLocalToken(res3.data.api_token)
            setLocalUserInfo(res3.data)
            callback && callback()
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