// pages/notification/notificationhome/notificationhome.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notification:[]
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
    wx.request({
      url: 'http://localhost:8080/Notification/findlist',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:(res)=>{
      const data=res.data;
      
      this.setData({
        notification:res.data
      });
      console.log("notification:",this.data.notification);
    }
   
    })
  },
  intonotification: function(e) {
    const itemId = e.currentTarget.dataset.id; // 获取传递的 item.id   
    app.globalData.globalNotification=itemId;
    
    wx.navigateTo({
      url: '/pages/notification/notificationshow/notificationshow',
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