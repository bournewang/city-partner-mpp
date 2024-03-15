import authApi from './auth'
import { login } from '../api/user.js'
import { log } from './util'
import {API_URL} from "../config"

const accountInfo = wx.getAccountInfoSync()
console.log('accountInfo', accountInfo)

var request = async (config) => {
  log("request", config)
  const token = authApi.getLocalToken()
  if (!config.header) {
    config.header = {}
  }
  if (config.method === 'post' || config.method === 'POST') {
    config.header['content-type'] = 'application/x-www-form-urlencoded'
  }
  config.header['Accept'] = 'application/json'
  config.header.Authorization = 'Bearer ' + token
  if (token) {
    config.header['api-token'] = token
  }
  if (config.data) {
    for (let key in config.data) {
      if (config.data[key] === undefined) {
        delete (config.data[key])
      } else if (typeof config.data[key] === 'object' && config.data[key] !== null) {
        Object.keys(config.data[key]).forEach(k => {
          const form_k = `${key}[${k}]`
          config.data[form_k] = config.data[key][k]
        })
        delete (config.data[key])
        // config.data[key] = JSON.stringify(config.data[key])
      }
    }
  }
  const res = await new Promise((resolve, reject) => {
    wx.request({
      url: API_URL + config.uri,
      method: config.method,
      data: config.data,
      header: config.header,
      success(res) {
        // log('request success', res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 403) {
          reject(res)
        } else if (res.statusCode === 401) {
          console.log("statuscode 401====, clear local token& userInfo, and relogin")
          authApi.removeLocalUserInfo()
          authApi.removeLocalToken()
          authApi.wxLogin()
        } else {
          console.warn('服务器错误====', res.statusCode)
          if (res.statusCode == 401) {
            console.log("message: ", res.data)
          }

          reject(res)
        }

      },
      fail(res) {
        console.log("request fail========= ", res)
        reject(res)
      }
    })
  })
  log("request res", config.uri, res)
  if (!res) {
    return null
  }
  return res
}

export function uploadFile(config) {
  const token = authApi.getLocalToken()
  if (!config.header) {
    config.header = {}
  }
  config.header.Authorization = 'Bearer ' + token
  if (token) {
    config.header['api-token'] = token
  }
  config.header['content-type'] = 'multipart/form-data'
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${API_URL}${config.uri}`,
      filePath: config.filePath,
      header: config.header,
      formData: config.data,
      name: "img",
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        }
      },
      fail(res) {
        reject(res)
      }
    })
  })

}

export default request
