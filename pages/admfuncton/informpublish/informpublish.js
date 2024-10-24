Page({
  data: {
    noticeType: '', // 通知类型
    title: '', // 标题
    content: '', // 内容
    department: '', // 发布部门
    publisher: '', // 发布人
    urgency_status: '', // 是否是警告信息
    images: [], // 存储选择的图片路径
    uploadedImageUrls: [] // 存储已经上传的图片URL
  },
  onReady() {
    this.setData({
      publisher: wx.getStorageSync('user_Name')
    });
  },
  
  // 其他选择处理方法...
 // 选择通知类型
 selectNoticeType() {
  wx.showActionSheet({
    itemList: ['公告', '警告', '提醒'], // 选择项
    success: (res) => {
      if (res.cancel) {
        // 用户点击了取消
        console.log('用户点击取消');
      } else {
        // 设置选择的通知类型
        this.setData({ noticeType: ['公告', '警告', '提醒'][res.tapIndex] });
      }
    },
    fail: (err) => {
      console.error('选择通知类型失败', err);
    },
  });
},
//选择发布部门
selectDepartment(){
wx.showActionSheet({
  itemList: ['技术部', '行政部', '物业部','车场部','财务部','商业部'], // 选择项
  success: (res) => {
    if (res.cancel) {
      // 用户点击了取消
      console.log('用户点击取消');
    } else {
      // 设置选择的通知类型
      this.setData({ department: ['技术部', '行政部', '物业部','车场部','财务部','商业部'][res.tapIndex] });
    }
  },
  fail: (err) => {
    console.error('选择部门失败', err);
  },
});
},
selectUrged(){
wx.showActionSheet({
  itemList: ['非警告信息(0)', '警告信息(1)'], // 选择项
  success: (res) => {
    if (res.cancel) {
      // 用户点击了取消
      console.log('用户点击取消');
    } else {
      // 设置选择的通知类型
      this.setData({ urgency_status: ['0', '1'][res.tapIndex] });
    }
  },
  fail: (err) => {
    console.error('选择警告信息失败', err);
  },
});
},
// 标题输入事件
onTitleInput(event) {
  this.setData({ title: event.detail.value });
},

// 内容输入事件
onContentInput(event) {
  this.setData({ content: event.detail.value });
},
  // 选择图片
  chooseImage() {
    const maxImages = 6;
    if (this.data.images.length >= maxImages) {
      wx.showToast({
        title: '最多只能上传6张图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.chooseMedia({
      count: 6, // 允许选择的媒体数量
      mediaType: ['image'], // 仅选择图片
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      success: (res) => {
        const tempFilePaths = res.tempFiles.map(file => file.tempFilePath);
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        });
      },
      fail: (err) => {
        console.error('选择图片失败', err);
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    this.data.images.splice(index, 1);
    this.setData({
      images: this.data.images
    });
  },

  // 上传图片
  uploadImages() {
    const { images } = this.data;
    const uploadPromises = images.map(filePath => {
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: 'http://localhost:8080/Notification/inserimage',
          filePath: filePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: (res) => {
            const data = JSON.parse(res.data);
            
            console.log("data:",data);
            if (data.code==0) {
              
              this.data.uploadedImageUrls.push(data.data);
              resolve(data.data);
            } else {
              reject(data.message || '上传失败');
            }
          },
          fail: (err) => {
            reject(err.errMsg || '上传失败');
          }
        });
      });
    });

    return Promise.all(uploadPromises);
  },

  // 提交按钮点击事件
  submitClick() {
    const { noticeType, title, content, department, publisher } = this.data;

    if (!noticeType || !title || !content || !department || !publisher) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    this.uploadImages()
      .then(uploadedUrls => {
        if (uploadedUrls.length === 0) {
          wx.showToast({
            title: '请先选择图片',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        console.log("进去1");
        // 提交其他数据
        wx.request({
          url: 'http://localhost:8080/Notification/insertnotification', // 数据提交接口
          method: 'POST',
          data: {
            noticeType: noticeType,
            title: title,
            content: content,
            department: department,
            publisher: publisher,
            urgency_status: this.data.urgency_status,
            imagePaths: this.data.uploadedImageUrls
          },
          success: (res) => {
            if (res.data.code==0) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              });
              console.log('数据提交成功：', res.data);
            } else {
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 2000
              });
              console.error('数据提交失败：', res.data.message);
            }
          },
          fail: (err) => {
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 2000
            });
            console.error('请求失败：', err);
          }
        });
      })
      .catch(error => {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none',
          duration: 2000
        });
        console.error('图片上传出错：', error);
      });
  }
});