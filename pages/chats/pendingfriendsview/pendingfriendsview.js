// pages/chats/pendingfriendsview/pendingfriendsview.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peddingList:[]
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
      peddingList:app.globalData.globalpendinglist
    })
    console.log("peddingList:",this.data.peddingList);
  },
  agreeClick(event){
    const index = event.currentTarget.dataset.index; 
    const user1Id=this.data.peddingList[index].user1Id;
    const user2Id=wx.getStorageSync('user_Id');
    wx.request({
      url: `http://localhost:8080/Friends/agreefirend?user1Id=${user1Id}&user2Id=${user2Id}`,
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:(res)=>{
      wx.showToast({
        title: '成功添加好友',
        duration: 2000,
      });

      let newpeddingList = this.data.peddingList;
      newpeddingList.splice(index, 1);  // 删除对应的用户
      this.setData({
        peddingList: newpeddingList  // 更新 peddingList
      });
    },
    fail:()=>{
      wx.showToast({
        title: '服务器异常，请稍后重试',
      })
    }
    })
  },
  refuseClick(event){
    const user1Id=wx.getStorageSync('user_Id');
    const index = event.currentTarget.dataset.index; 
    const user2Id=this.data.peddingList[index].user2Id;

    wx.showModal({
      title: '提示',
      content: '您确定要拒绝吗？',
      success:(res)=> {
        if (res.confirm) {
          wx.request({
            url: `http://localhost:8080/Friends/refusefirend?user1Id=${user1Id}&user2Id=${user2Id}`,
            method: 'PUT',
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'  // 确保接收 JSON 格式的响应
          },
          success:(responed)=>{
            let newpeddingList2 = this.data.peddingList;
            newpeddingList2.splice(index, 1);  // 删除对应的用户
            this.setData({
              peddingList: newpeddingList2  // 更新 peddingList
            });
            wx.showToast({
              title: '成功拒绝',
              duration: 2000,
            })
          },
          fail:()=>{
            wx.showToast({
              title: '服务器异常，请稍后重试',
            })
          }
          })
        } else if (res.cancel) {
          // 用户点击了取消，什么都不做
          wx.showToast({
            title: '取消拒绝',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });


    // 
  
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