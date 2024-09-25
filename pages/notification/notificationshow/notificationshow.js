// pages/notification/notificationshow/notificationshow.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notification:{
      id:"null",
      content:"null",
      department:"null",
      publishTime:"null",
      publisher:"null",
      title:"null",
      type:"null",
      urgencyStatus:"null"
    }
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
    const NotificationId=app.globalData.globalNotification;
    wx.request({
      url: `http://localhost:8080/Notification/findinfo?Id=${NotificationId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:(res)=>{
      this.setData({
        notification: res.data
      });

      console.log("通知详细信息:",this.data.notification);
    }
    })
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
    app.globalData.globalNotification=null;
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