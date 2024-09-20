// pages/chat/chat.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userList:[]
  },
  messageClick(){
    wx.navigateTo({
      url: '/pages/chats/chatmessage/chatmessage',
    })
  },
  intomessageClick(e){
    const user=this.data.userList.find(user=>user.user2Id==e.currentTarget.dataset.id);
    app.globalData.globalMessageId=e.currentTarget.dataset.id;
    app.globalData.globalMessageList=user;
    const senderId=e.currentTarget.dataset.id;
    const userId=wx.getStorageSync('user_Id');
    console.log("全局变量",app.globalData.globalMessageList);
    console.log("id=",app.globalData.globalMessageId);
    wx.request({
      url: `http://localhost:8080/IMessage/readMessage?userId=${userId}&senderId=${senderId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:()=>{
    }
    })
    wx.navigateTo({
      url: '/pages/chats/chatview/chatview',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    
    // 监听 globaluserlistChange 事件
    this.updateUserList = this.updateUserList.bind(this); // 确保 this 绑定正确
    app.addEventListener('globaluserlistChange', this.updateUserList);
    
    // 初始化时获取全局的 userlist
    this.setData({
      userlist: app.globalData.globaluserlist
    });
  },
  //
  updateUserList(newList) {
    console.log("传入的新数据：", newList);
    // 更新页面的 userlist
    const updatedList = JSON.parse(JSON.stringify(newList));
    this.setData({ userList: updatedList });
    console.log("更新成功");
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
    const app=getApp();
    if(wx.getStorageSync('user_Id')==null){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
        success: () => {
          // 延时一会儿再返回，避免 Toast 没有展示出来
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/userlogin/userlogin',
            }) // 跳转登录页面
          }, 2000);
        }
      })
    }else{
      const useId=wx.getStorageSync('user_Id');
      wx.request({
        url: `http://localhost:8080/Friends/getfriends?user1Id=${useId}`,  // 服务器地址
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
        success:(res)=>{
          console.log("信息1",res.data);
          console.log("信息2",res.data.unreadMessageList);
          app.globalData.globaluserlist=res.data;
          this.setData({
            userList:res.data
          })   
          
        }
      })
    }
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
    
    // 页面卸载时移除事件监听
    app.removeEventListener('globaluserlistChange', this.updateUserList);

    
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