import {
  API_URL
} from "../config"
import authApi from "./auth"

function upload(file_url, form_data={}) {
  console.log("--------- upload file")
  console.log({Authorization: 'Bearer '+authApi.getLocalToken()})
  return wx.uploadFile({
    header: {Authorization: 'Bearer '+authApi.getLocalToken()},
    url: API_URL + '/image/upload',
    filePath: file_url,
    name: 'img',
    formData: form_data,
    success: () => {
      // this.setData({
      //   [`fileList[${length}].status`]: 'done',
      // });
    },
  })
}

export default {
  upload
}