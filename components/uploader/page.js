import userApi from "../../api/user"
Component({
  properties: {
    text: {type: String, value: "选择文件"},
    collection: {type: String, value: "default"},
    preview: {type: String, value: null}
  },
  data: {
    fileList: []
  },
  ready: function(options){
    console.log("uploader ready ---- ")
    console.log(options)
    console.log(this.properties)
    if (this.properties.preview) {
      this.setData({fileList: [{url: this.properties.preview}]})
      // console.log(fileList)
    }
  },
  methods:{  
    handleAdd(e) {
      console.log("handle add: "+e.currentTarget.dataset['type'])
      const type = e.currentTarget.dataset['type']
      const { fileList } = this.data;
      const { files } = e.detail;
      console.log(e.detail)
  
      // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
      this.setData({fileList: [...fileList, ...files]});
      // 方法2：每次选择图片都上传，展示每次上传图片的进度
      // files.forEach(file => this.onUpload(file))
      const file = files[0]
      this.onUpload(file, type)
    },
    onUpload(file, type) {
      const { fileList } = this.data;
      this.setData({fileList: [...fileList, { ...file, status: 'loading' }]});
      
      const { length } = fileList;
      const task = userApi.uploadImage(file.url, this.properties.collection) 
      // fileApi.upload(file.url, {collection: 'id_card_'+type})
      task.onProgressUpdate((res) => {
        this.setData({
          [`fileList[${length}].percent`]: res.progress,
        });
        console.log("progress: "+res.progress)
        if (res.progress == 100) {
          this.setData({
            [`fileList[${length}].status`]: 'done',
          });
        }
      });
    },
    handleRemove(e) {
      const { index } = e.detail;
      const { fileList } = this.data;
  
      fileList.splice(index, 1);
      this.setData({
        fileList,
      });
    } 
  }

})
