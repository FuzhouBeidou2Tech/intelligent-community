// pages/userinfosetting/userinfosetting.js
Page({
  data: {
    items:[
      {value:'0',name:'未知'},
      {value:'1',name:'男'},
      {value:'2',name:'女'}
    ],
    username: '', 
    setusername: '', 
    userphone:'',
    userimage:'',
    gender: '', 
    setgender: '',
    address:'未绑定',
    userimagepath:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('room_name')){
      this.setData({
        address:wx.getStorageSync('community_name')+wx.getStorageSync('building_name')+wx.getStorageSync('room_name')
      })
    }
    let phone=wx.getStorageSync('phone_Number');
    let hiddenPhoneNumber = phone.substring(0, 3) + "****" + phone.substring(7);
    this.setData({
      username:wx.getStorageSync('user_Name'),
      userphone:hiddenPhoneNumber,
      userimage:wx.getStorageSync('user_Image'),
      gender:wx.getStorageSync('user_Gender')
    })
    console.log("性别");
    console.log(this.data.gender);
  }, 
  onShow(){
    
  },
  setUsername(e) {
    this.setData({
      setusername: e.detail.value
    });
    console.log(this.data.setusername)
  }, 
   setGender(e) {
    this.setData({
      setgender: e.detail.value
    });
    console.log("设置性别")
    console.log(this.data.setgender)
  },
  submitClick(){
    const self = this;
    if(!this.data.setusername){
      this.setData({
        setusername:this.data.username
      })
    }
    if(!this.data.setgender){
      this.setData({
        setgender:this.data.gender
      })
    }
    wx.request({
      url:'http://localhost:8080/user/update',  // 拼接更新用户信息的后端接口 URL
      method: 'PUT', // 使用 PUT 请求
        data:{
        username:this.data.setusername,
        gender:this.data.setgender,
        phoneNumber:wx.getStorageSync('phone_Number'),
        userimage:this.data.userimage
      }, // 传递用户表单数据
      header: {
        'Content-Type': 'application/json'  // 请求头，确保是 JSON 格式
      },success(res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '用户信息更新成功',
            icon: 'success',
            duration: 2000,
          });
          //更新缓存
          wx.setStorageSync('user_Name', self.data.setusername);
          wx.setStorageSync('user_Gender', self.data.setgender);
          wx.setStorageSync('user_Image', self.data.userimage);
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            });
          },2000)
        } else {
          wx.showToast({
            title: '用户信息更新失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail(err) {
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: 'none',
          duration: 2000
        });
        console.error('更新用户信息失败', err);
      }
    });
  }    
  ,
  setaddressClick(){
  wx.navigateTo({
    url: '/pages/setaddresscommunities/setaddresscommunities',
  })
  
  },
// 更换头像
imageClick(){
 
},
// 选择图片
chooseTitleImage() {
  wx.chooseMedia({
    count: 1, // 只能选择1张图片作为标题
    mediaType: ['image'], // 仅选择图片
    sourceType: ['album', 'camera'], // 可以指定是相册还是相机
    sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
    success: (res) => {
      const tempFilePath = res.tempFiles[0].tempFilePath; // 取第一个文件路径
       // 使用 Promise 包装 setData，确保数据更新完成后再调用 uploadimage
       new Promise((resolve) => {
        this.setData({
            userimagepath: tempFilePath // 设置选择的标题图片路径
          }, () => {
            resolve(); // setData 完成后调用 resolve
          });
      }).then(() => {
        return this.uploadimage(); // 在用户图像路径设置完成后调用上传方法 
      }).then((uploadedImageUrl) => {
        console.log('上传成功:', uploadedImageUrl); // 处理上传成功的逻辑
      }).catch((error) => {
        console.error('处理失败:', error);
      });
    },
    fail: (err) => {
      console.error('选择标题图片失败', err);
    }
  });
},
// 上传图片
uploadimage(){
  const filePath = this.data.userimagepath; // 获取单个标题图片路径
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'http://localhost:8080/user/inserimage', // 上传接口
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
            userimage: data.data, // 存储上传成功后的图片URL
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
}
}
)
