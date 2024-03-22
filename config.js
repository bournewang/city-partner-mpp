const {miniProgram: {envVersion}} = wx.getAccountInfoSync()

// const API_URL = 'https://xiaofeice.com/api'
const API_URL = envVersion == "release" || envVersion == "trial" ? 
  'https://xiaofeice.com/api' : 'http://localhost:8000/api'

console.log("envVersion: "+envVersion)
console.log("api: "+API_URL)
export {
  API_URL
}