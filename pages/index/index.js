// index.js


Page({
  onShow: function () {
    console.log("页面显示");

    // 检查本地是否有登录态
    const sessionKey = wx.getStorageSync('session_key');
    console.log("sessionkey");
    console.log(sessionKey);
    if (!sessionKey) {
      // 如果没有 sessionKey，则用户未登录，跳转到登录页面
      console.log("判断成功");
      this.redirectToLoginPage();
    } else {
      // 如果有 sessionKey，则可以调用服务器接口验证 sessionKey 是否有效
      wx.checkSession({
        success: () => {
          console.log('用户已登录');
          // sessionKey 有效，用户已登录，可以执行后续操作
        },
        fail: () => {
          console.log('sessionKey 失效');
          // sessionKey 失效，重新登录并跳转到登录页面
          this.redirectToLoginPage();
        }
      });
    }
  },

  redirectToLoginPage: function () {
    console.log("跳转判断");
    wx.redirectTo({
      url: '/pages/userlogin/userlogin', // 替换成你的登录页面路径
    });
  },


});