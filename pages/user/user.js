Page({
  data:{
    userphone:0,
    username:0,
    userstatus:0,
    userstatusname:0,
    onshow:0
  },
  onShow: function(){
    const sessionKey = wx.getStorageSync('session_key');
    if(sessionKey){
      this.setData({
        onshow:1
      })
    }else{
      this.setData({
        onshow:0
      })
    }
    //判断用户有没有登录
    //用户登录
    if(this.data.onshow){
     
    let phone=wx.getStorageSync('phone_Number');
    let hiddenPhoneNumber = phone.substring(0, 3) + "****" + phone.substring(7);
    this.setData({
      userphone:hiddenPhoneNumber,
      username:wx.getStorageSync('user_Name'),
      userstatus:wx.getStorageSync('user_Status')
    })
    console.log("参数2");
    console.log(this.data.userstatus);
    }else {     
    }
    if(this.data.userstatus==0){
      this.setData({
        userstatusname:"游客"
      })
    }else if(this.data.userstatus==1)
    {
      this.setData({
        userstatusname:"居民用户"
      })
    }else if(this.data.userstatus==2){
      this.setData({
        userstatusname:"管理员"
      })
    }
  },
  settingClick(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  loginClick(){
    wx.navigateTo({
      url: '/pages/userlogin/userlogin' // 跳转的页面路径
    });
  },
  userinfoClick(){
    //判断用户有没有登录
    if(this.data.onshow){
      wx.navigateTo({
        url: '/pages/userinfosetting/userinfosetting',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
        success: () => {
          // 延时一会儿再返回，避免 Toast 没有展示出来
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/userlogin/userlogin',
            }) // 跳转登录页面
          }, 2000);
          
        }
      });
    }
   
  }
})