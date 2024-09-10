// pages/buildings/buildings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localbuildings:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app=getApp();
    this.setData({
      localbuildings:app.globalData.buildings
    })
  }, 
  getbuildingnameById: function (id) {
    return this.data.localbuildings.find(building => building.id === id);
  },
  onBuildingsTap(e){
    const app=getApp();
    const appData=app.globalData;
    const buildingId = e.currentTarget.dataset.id;
    console.log("buildingId=",buildingId);
    wx.request({
      url: `http://localhost:8080/Address/Rooms?buildingId=${buildingId}`,
      method: 'GET',
      success:(res)=>{
        appData.rooms=res.data;
        console.log("rooms:",appData.rooms);
        wx.setStorageSync('user_buildingId', buildingId);
        //保存楼层名
        const buildingname = this.getbuildingnameById(buildingId);
        wx.setStorageSync('building_name', buildingname.name);
        wx.navigateTo({
          url: '/pages/rooms/rooms',
        })
      },
      fail:(err)=>{
        
      }
    })
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