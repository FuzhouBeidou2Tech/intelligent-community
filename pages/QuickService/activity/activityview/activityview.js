// pages/QuickService/activity/activityview/activityview.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Activity:''
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
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      Activity:app.globalData.globalActivity
    })

  },
  applyClick(){
    if(this.data.Activity.ifsignup){
      wx.showToast({
        title: '您已经报名成功了',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if(this.data.Activity.ifovertime){
      wx.showToast({
        title: '报名时间已过',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    app.globalData.globalofflineActivityId=this.data.Activity.offlineActivityId;
    app.globalData.globalActivityId=this.data.Activity.id;
    wx.redirectTo({
      url: '/pages/QuickService/activity/applyactivity/applyactivity',
    })
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
    app.globalData.globalActivity=null;
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