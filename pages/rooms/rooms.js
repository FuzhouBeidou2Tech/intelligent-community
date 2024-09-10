// pages/rooms/rooms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localrooms:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      localrooms:getApp().globalData.rooms
    })

    console.log("localrooms=",this.data.localrooms);
  },
   getroomnameById: function (id) {
    return this.data.localrooms.find(room => room.id === id);
  },
  onRoomsTap(e){
    const roomId=e.currentTarget.dataset.id;
    wx.setStorageSync('user_roomId', roomId);
    wx.request({
      url: 'http://localhost:8080/Address/submit',
      method:'PUT',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
      data:{
        userId:wx.getStorageSync('user_Id'),
        communityId:wx.getStorageSync('user_communityId'),
        buildingId:wx.getStorageSync('user_buildingId'),
        roomId:wx.getStorageSync('user_roomId')
      },
      success:(res)=>{
        if (res.statusCode === 200) {
          wx.showToast({
            title: '用户信息更新成功',
            icon: 'success',
            duration: 2000,
          });
          const roomname = this.getroomnameById(roomId);
          console.log("房间名为",roomname);
          wx.setStorageSync('room_name', roomname.roomNumber);
          wx.reLaunch({
            url: '/pages/userinfosetting/userinfosetting',
          })
        }
      },
      fail:(error)=>{
        wx.showToast({
          title: '用户信息更新失败',
          icon: 'none',
          duration: 2000
        });
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