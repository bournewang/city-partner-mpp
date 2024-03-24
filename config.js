const {miniProgram: {envVersion}} = wx.getAccountInfoSync()

// const API_URL = 'https://xiaofeice.com/api'
const HOST = envVersion == "release" || envVersion == "trial" ? 
  'https://xiaofeice.com' : 'http://localhost:8000'

const API_URL = HOST + "/api"  
const IMAGE_URL = HOST + "/storage/mpp"

console.log("envVersion: "+envVersion)
console.log("API_URL: "+API_URL)
console.log("IMAGE_URL: "+IMAGE_URL)

export {
  API_URL,
  IMAGE_URL
}