// pages/admfuncton/publishactivity/publishactivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   activityDTO:{
    address: '',
    details:'',
    endTime:'',
    favorites:'0',
    gatheringPlace:'',
    gatheringTime:'',
    id:'',
    imageList:[],
    name:'',
    organizer:'',
    organizerPhone:'',
    signupCount:'',
    signupCountMax:'',
    signupEndTime:'',
    signupFee:'',
    signupStartTime:'',
    startTime:'',
    subtitle:'',
    titleImage:'',
    type:'1',
    views:'0',
    imageurlList:[]
   },
   signupendtime:'',//报名结束时间
   signupenddate:'',//报名结束日期
   signupstarttime:'',//报名开始时间
   signupstartdata:'',//报名开始日期
   starttime:'',//活动开始时间
   startdata:'',//活动开始日期
   gatheringtime:'',//集合时间
   gatheringdata:'',//集合日期
   endtime:'',//活动结束时间
   enddata:'',//活动结束日期
   address:'',//活动地址
   gatheringPlace:'',//活动集合地址
   details:'',//活动描述
   name:'',//活动名称
   organizer:'',//活动负责人
   organizerPhone:'',//活动手机号码
   signupCountMax:'',//最大报名人数
   subtitle:"",//活动副标题
   signupfee:'',//活动报名费用
   images: [],// 存储选择的图片路径
   uploadedImageUrls: [], // 存储已经上传的图片URL
   titleimage:'',//存储选择的标题图片路径
   uploadedTitleImageUrls:''// 存储已经上传的标题图片URL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
// 选择标题图片
chooseTitleImage() {
  wx.chooseMedia({
    count: 1, // 只能选择1张图片作为标题
    mediaType: ['image'], // 仅选择图片
    sourceType: ['album', 'camera'], // 可以指定是相册还是相机
    sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
    success: (res) => {
      const tempFilePath = res.tempFiles[0].tempFilePath; // 取第一个文件路径
      this.setData({
        titleimage: tempFilePath // 设置选择的标题图片路径
      });
    },
    fail: (err) => {
      console.error('选择标题图片失败', err);
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
//删除标题图片
deleteTitleImage(e){
  this.setData({
    titleimage:''
  })
},
// 上传图片
uploadImages() {
  const { images } = this.data;
  const uploadPromises = images.map(filePath => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://localhost:8080/Activity/inserimage',
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

            // 将返回的 URL 添加到 activityDTO 的 imageList 数组中
            const updatedImageList = this.data.activityDTO.imageList.concat(data.data);
            this.setData({
              'activityDTO.imageurlList': updatedImageList
            });
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
//上传标题图片
uploadTitleImages() {
  const filePath = this.data.titleimage; // 获取单个标题图片路径
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'http://localhost:8080/Activity/inserimage', // 上传接口
      filePath: filePath, // 上传的文件路径
      name: 'file', // 对应后台接收文件的参数名
      header: {
        'content-type': 'multipart/form-data'
      },
      success: (res) => {
        const data = JSON.parse(res.data); // 解析返回结果
        
        console.log("data:", data);
        if (data.code == 0) {
          this.setData({
            uploadedTitleImageUrls: data.data, // 存储上传成功后的图片URL
            'activityDTO.titleImage':data.data
          });
          resolve(data.data); // 上传成功，返回图片URL
        } else {
          reject(data.message || '上传失败'); // 上传失败，返回错误信息
        }
      },
      fail: (err) => {
        reject(err.errMsg || '上传失败'); // 网络或其他错误导致上传失败
      }
    });
  });
},
  // 活动名称绑定
    setname(e) {
      this.setData({
        'activityDTO.name': e.detail.value
      });
    },
  
    // 活动副标题绑定
    setsubtitle(e) {
      this.setData({
        'activityDTO.subtitle': e.detail.value
      });
    },
  
    // 活动详情绑定
    setdetails(e) {
      this.setData({
        'activityDTO.details': e.detail.value
      });
    },
  
    // 活动地址绑定
    setaddress(e) {
      this.setData({
        'activityDTO.address': e.detail.value
      });
    },
  
    // 活动集合地址绑定
    setgatheringPlace(e) {
      this.setData({
        'activityDTO.gatheringPlace': e.detail.value
      });
    },
  
    // 活动负责人绑定
    setorganizer(e) {
      this.setData({
        'activityDTO.organizer': e.detail.value
      });
    },
    //报名费用绑定
    setsignupfee(e){
      this.setData({
        'activityDTO.signupFee': e.detail.value
      });
    },
    // 活动负责人手机号绑定
    setorganizerPhone(e) {
      this.setData({
        'activityDTO.organizerPhone': e.detail.value
      });
    },
  
    // 报名人数上限绑定
    setsignupCountMax(e) {
      this.setData({
        'activityDTO.signupCountMax': e.detail.value
      });
    },
  
    // 报名开始时间绑定
    setsignupstarttime(e) {
      this.setData({
        signupstarttime: e.detail.value
      });
    },
  
    // 报名开始日期绑定
    setsignupstartdata(e) {
      this.setData({
        signupstartdata: e.detail.value
      });
    },
  
    // 报名结束时间绑定
    setsignupendtime(e) {
      this.setData({
        signupendtime: e.detail.value
      });
    },
  
    // 报名结束日期绑定
    setsignupenddate(e) {
      this.setData({
        signupenddate: e.detail.value
      });
    },
  
    // 活动开始时间绑定
    setstarttime(e) {
      this.setData({
        starttime: e.detail.value
      });
    },
  
    // 活动开始日期绑定
    setstartdata(e) {
      this.setData({
        startdata: e.detail.value
      });
    },
  
    // 活动结束时间绑定
    setendtime(e) {
      this.setData({
        endtime: e.detail.value
      });
    },
  
    // 活动结束日期绑定
    setenddata(e) {
      this.setData({
        enddata: e.detail.value
      });
    },
    setgatheringtime(e){
     this.setData({
      gatheringtime:e.detail.value
     })
    },
    setgatheringdata(e){
      this.setData({
        gatheringdata:e.detail.value
      })
    },
// 提交发布按钮
    submitForm(e){
      const signupEndTime = `${this.data.signupenddate} ${this.data.signupendtime}`;
      const signupStartTime = `${this.data.signupstartdata} ${this.data.signupstarttime}`;
      const startTime = `${this.data.startdata} ${this.data.starttime}`;
      const endTime = `${this.data.enddata} ${this.data.endtime}`;
      const gatheringTime = `${this.data.gatheringdata} ${this.data.gatheringtime}`;

      this.setData({
        'activityDTO.signupEndTime': signupEndTime,
        'activityDTO.signupStartTime': signupStartTime,
        'activityDTO.startTime': startTime,
        'activityDTO.endTime': endTime,
        'activityDTO.gatheringTime': gatheringTime
      });
      const activityDTO = this.data.activityDTO;
      console.log('提交的活动数据: ', activityDTO);

    // 先上传标题图片
    this.uploadTitleImages()
    .then(uploadedTitleUrl => {
      if (!uploadedTitleUrl) {
      wx.showToast({
        title: '请先选择标题图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    console.log('标题图片上传成功: ', uploadedTitleUrl);

    // 上传活动图片
    return this.uploadImages();
  })
  .then(uploadedUrls => {
    if (uploadedUrls.length === 0) {
      wx.showToast({
        title: '请先选择活动图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    console.log('活动图片上传成功: ', uploadedUrls);

    // 提交其他数据到后端
    wx.request({
      url: 'http://localhost:8080/Activity/addactivity', // 数据提交接口
      method: 'POST',
      data: activityDTO,
      success: (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          console.log('数据提交成功：', res.data);
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/admfuncton/activityhome/activityhome',
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
      title: '上传图片失败',
      icon: 'none',
      duration: 2000
    });
    console.error('图片上传出错：', error);
  });

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