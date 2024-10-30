Page({
  data:{
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
  onHandleLogin(e) {
    const detail = e.detail;
    console.log('phoneOneClickLogin errCode', detail.errCode)
  },
  inputLoginClick() {
    if (this.data.useragreement == 1) {
      // 用户已同意协议，跳转页面
      wx.navigateTo({
        url: '/pages/inputlogin/inputlogin' // 跳转的页面路径
      });
    } else {
      // 用户未同意协议，弹出提示信息
      wx.showToast({
        title: '请先同意用户协议',
        icon: 'none',
        duration: 2000
      });
    }
  },
  onGetPhoneNumber: function (e) {
    // 判断用户是否已同意用户协议
    if (this.data.useragreement == 0) {
      wx.showToast({
        title: '请先同意用户协议',
        icon: 'none'
      });
      return; // 终止登录流程，不调用后续登录方法
    }
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      wx.login({
        success: (res) => {
          if (res.code) {
            // 将登录凭证和加密数据发送到服务器解密手机号
            wx.request({
              url: 'http://localhost:8080/user/login',  // 服务器地址
              method: 'POST',
              header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'  // 确保接收 JSON 格式的响应
            },
              data: {
                code: res.code,//登录凭证  开发者服务器可以使用这个 code，结合小程序的 AppID 和 AppSecret，向微信服务器发起请求，以获取用户的 openid（用户唯一标识）和 session_key（会话密钥）
                encryptedData: e.detail.encryptedData,//用户手机号码的加密数据
                iv: e.detail.iv //解密 encryptedData 时必需的参数之一。
              },
              success: (response) => {
                console.log("成功");
                // 保存用户信息到本地缓存
                wx.setStorageSync('userinfo', response.data.data);
                //保存用户登录态
                wx.setStorageSync('session_key', response.data.data.session_key);
                //转换为js对象
                //保存用户手机号码
                const decryptedData = JSON.parse(response.data.data.decryptedData);
                wx.setStorageSync('phone_Number', decryptedData.phoneNumber);
                //保存用户名
                wx.setStorageSync('user_Name', response.data.data.user_name);
                //保存用户状态
                wx.setStorageSync('user_Status', response.data.data.user_status);
                //保存用户性别
                wx.setStorageSync('user_Gender', response.data.data.user_gender);
                //保存用户id
                wx.setStorageSync('user_Id', response.data.data.user_id);
                // 保存用户头像
                wx.setStorageSync('user_Image',response.data.data.user_image);
                // 更新全局数据
              
                console.log(response.data.data);
                // 登录成功后跳转到主页面
                wx.switchTab({
                  url: '/pages/index/index'
              });
              },
              fail: () => {
                wx.showToast({
                  title: '登录请求失败',
                  icon: 'none'
                });
              }
            });
          } else {
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        }
      });
    } else {
      wx.showToast({
        title: '用户取消授权',
        icon: 'none'
      });
    }
  },
})
