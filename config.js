const {miniProgram: {envVersion}} = wx.getAccountInfoSync()

// const API_URL = 'https://xiaofeice.com/api'
const API_URL = envVersion == "develop" ? 
  'http://localhost:8000/api' : 'https://xiaofeice.com/api'

export {
  API_URL
}