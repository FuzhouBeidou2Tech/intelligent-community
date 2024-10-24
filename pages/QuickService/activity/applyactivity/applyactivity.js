// pages/QuickService/activity/applyactivity/applyactivity.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offlineActivity:'',//报名表
    username:'',
    userphone:'',
    emergencyname:'',
    emergencyphone:''
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
    const offlineActivityId=app.globalData.globalofflineActivityId;
    const activityId=app.globalData.globalActivityId;
    wx.request({
      url: `http://localhost:8080/Activity/getOfflineActivity?offlineActivityId=${offlineActivityId}&activityId=${activityId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            offlineActivity:res.data.data
          })
          
        }else{
          wx.showToast({
            title: '服务器异常,请稍后重试',
            icon: 'none',
            duration: 2000
          });
          console.error('数据提交失败：', res.data.message);
        }
        console.log("offlineActivity:",this.data.offlineActivity);
      }
      
    })
  },
  setusername(e){
    this.setData({username:e.detail.value});
  },
  setuserphone(e){
    this.setData({userphone:e.detail.value});
  },
  setemergencyname(e){
    this.setData({emergencyname:e.detail.value});
  },
  setemergencyphone(e){
    this.setData({emergencyphone:e.detail.value});
  },
// 报名
  submitClick(){
    const{ username,userphone,emergencyname,emergencyphone}=this.data;
    const userId=wx.getStorageSync('user_Id');
    const offlineActivityId=app.globalData.globalofflineActivityId;
    if ( !username || !userphone || !emergencyname||!emergencyphone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
     // 提交其他数据
     wx.request({
      url: 'http://localhost:8080/Activity/insertOfflineSignup', // 数据提交接口
      method: 'POST',
      data: {
        offlineActivityId: offlineActivityId,
        userId: userId,
        userName: username,
        userPhone:userphone,
        emergencyContactName:emergencyname,
        emergencyContactPhone:emergencyphone
      },
      success: (res) => {
        if (res.data.code==0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          });
          console.log('数据提交成功：', res.data);
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/QuickService/activity/activityhome/activityhome',
            }) // 跳转活动主页面
          }, 1500);
         
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
  
  },
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
    app.globalData.globalofflineActivityId=null;
    app.globalData.globalActivityId=null;
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