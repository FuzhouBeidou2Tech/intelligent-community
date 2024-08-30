// pages/inputlogin/inputlogin.js
Page({
  data:{
    username: '',  // 输入框手机号码
    password: '',  // 输入框验证码
    isButtonDisabled: true , // 判断按钮显示
    useragreement:0
  },
  checkboxChange(e) {
    if(e.detail.value){
      this.setData({
        useragreement:0
      })
    }else{
      this.setData({
        useragreement:1
      })
    }
    this.setData({
      useragreement:e.detail.value
    })
  },
  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
    this.updateButtonState();
  },
  onVerificationInput: function(e) {
    this.setData({
      password: e.detail.value
    });
    this.updateButtonState();
  },
  updateButtonState: function() {
    const { username, password } = this.data;
    //  login status
    this.setData({
      isButtonDisabled: !(username && password)
    });
  },
//login operation
  onLogin: function() {
    if (this.data.useragreement == 1) {
      // User has agreed to the terms
      wx.showToast({
        title: '登录中...',
        icon: 'loading'
      });
      wx.navigateTo({
        url: 'pages/index/index' // 跳转的页面路径
      });
    } else {
      // User has not agreed to the terms.
      wx.showToast({
        title: '请先同意用户协议',
        icon: 'none',
        duration: 2000
      });
    }
  }
})