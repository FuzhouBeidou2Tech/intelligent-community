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
   
  },
  logout() {
    //判断用户有没有登录
    if(this.data.onshow){
      wx.showModal({
        title: '提示',
        content: '您确定要退出登录吗？',
        success(res) {
          if (res.confirm) {
            // 用户点击了确定，执行退出登录操作
            wx.clearStorageSync();
            // 获取当前页面实例
            const currentPage = getCurrentPages().pop();
            if (currentPage) {
              const url = currentPage.route; // 当前页面的路径
              wx.reLaunch({
                url: `/${url}`
              });
            }
          } else if (res.cancel) {
            // 用户点击了取消，什么都不做
            wx.showToast({
              title: '取消退出',
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
    }
   

}
})