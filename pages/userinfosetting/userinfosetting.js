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
    gender: '', 
    setgender: '',
    address:'未绑定'
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
        phoneNumber:wx.getStorageSync('phone_Number')
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
  
  }

}
)
