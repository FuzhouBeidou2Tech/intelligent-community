// pages/chats/addfriends/addfriends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:null,
    userList:[],
    adduserId:null
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

  },
  searchClick(){
    //清空数据
    this.setData({
      userList:null,
    })
    const value=this.data.inputValue;
    // 发送请求
    wx.request({
      url: `http://localhost:8080/user/search?value=${value}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:(res)=>{
      console.log("用户值为",res.data);
      if(res.statusCode === 200 && res.data && Array.isArray(res.data) && res.data.length > 0){
        this.setData({
          userList:res.data,
        })
      }else{
        wx.showToast({
          title: '搜索失败',
          icon: 'none',
          duration: 2000,
        })
      }     
    },
    fail:(err) => {
      console.error("请求失败", err);
      wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000,
      });
    } 
  }
      )
  },
  //添加好友
  addsuerClick(event){
    //清空数据
    this.setData({
      adduserId:null
    })
    //获取下标
    const index = event.currentTarget.dataset.index; 
    console.log('用户数据:', this.data.userList[index].id);  // 可根据下标获取对应的用户数据
    const user1Id=wx.getStorageSync('user_Id');
    const user2Id=this.data.userList[index].id;
    wx.request({
      url: `http://localhost:8080/Friends/addfriends?user1Id=${user1Id}&user2Id=${user2Id}`,
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:(res)=>{
      console.log("返回的result",res.data);
      if(res.data.code==102){
        wx.showToast({
          title: '已重新发送请求',
          icon:'error'
        })
      }else if(res.data.code==101){
        wx.showToast({
          title: '用户是你好友',
          icon:'error'
        })
      }else if(res.data.code==103){
        wx.showToast({
          title: '已发送请求',
          icon:'error'
        })
      }
      else{
        wx.showToast({
          title: '发送好友请求成功',
        })
      }
      
    },fail(res){
      wx.showToast({
        title: '服务器异常，请稍后重试',
        icon:'error'
      })
    }
    });
    
  },
  //输入框值绑定
  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
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