// pages/QuickService/Repair/AddRepair/AddRepair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],//图片选择的路径
    repairType:'',//维修类型
    repairaddress:'',//维修地址
    repairdescription:'',//维修描述
    userid:'',//用户id
    uploadedImageUrls: [] // 存储已经上传的图片URL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onReady() {
    this.setData({
      userid: wx.getStorageSync('user_Id')
    });
  },
  repairNoticeType() {
    wx.showActionSheet({
      itemList: ['公共设备', '其他'], // 选择项
      success: (res) => {
        if (res.cancel) {
          // 用户点击了取消
          console.log('用户点击取消');
        } else {
          // 设置选择的通知类型
          this.setData({ repairType: ['公共设备', '其他'][res.tapIndex] });
        }
      },
      fail: (err) => {
        console.error('选择通知类型失败', err);
      },
    });
  },
  repairaddressInput(event) {
    this.setData({ repairaddress: event.detail.value });
  },
  repairdescriptionInput(event) {
    this.setData({ repairdescription: event.detail.value });
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
          url: 'http://localhost:8080/RepairRequest/inserimage',
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
  submitClick() {
    const { repairType, repairaddress, repairdescription, userid } = this.data;

    if (!repairType || !repairaddress || !repairdescription || !userid ) {
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
          url: 'http://localhost:8080/RepairRequest/addRepair', // 数据提交接口
          method: 'POST',
          data: {
            repairType: repairType,
            repairaddress: repairaddress,
            repairdescription: repairdescription,
            userid: userid,
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
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index',
                }) // 跳转主页面
              }, 2000);
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})