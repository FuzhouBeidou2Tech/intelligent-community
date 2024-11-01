// pages/chat/chat.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userList:[],
    paddingnum:0,
    userId:'',
  },
  messageClick(){
    wx.navigateTo({
      url: '/pages/chats/chatmessage/chatmessage',
    })
  },
  intomessageClick(e){
    
    var user;
    // 找到对方用户id判断
    if(this.data.userList.find(user=>user.user2Id==e.currentTarget.dataset.id)){
       user=this.data.userList.find(user=>user.user2Id==e.currentTarget.dataset.id);
    }else{
       user=this.data.userList.find(user=>user.user1Id==e.currentTarget.dataset.id);
    }
    app.globalData.globalMessageId=e.currentTarget.dataset.id;
    app.globalData.globalMessageList=user;
    const senderId=e.currentTarget.dataset.id;
    const userId=wx.getStorageSync('user_Id');
    console.log("全局变量",app.globalData.globalMessageList);
    console.log("id=",app.globalData.globalMessageId);
    wx.request({
      url: `http://localhost:8080/IMessage/readMessage?userId=${senderId}&senderId=${userId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:()=>{
      wx.navigateTo({
        url: '/pages/chats/chatview/chatview',
      })
    }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    
  
  },
  //事件监听
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
        // 监听 globaluserlistChange 事件
      this.updateUserList = this.updateUserList.bind(this); // 确保 this 绑定正确
      app.addEventListener('globaluserlistChange', this.updateUserList);
      this.setData({
        userId:wx.getStorageSync('user_Id')
      })
      // 初始化时获取全局的 userlist
      // this.setData({
      //   userlist: app.globalData.globaluserlist
      // });
      // console.log("userList",this.data.userlist);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.updateUserList = this.updateUserList.bind(this);
    app.addEventListener('globaluserlistChange', this.updateUserList);
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
          
          app.globalData.globaluserlist=res.data;
           // 过滤出 status 为 "Accepted" 的项目
          const acceptedFriends = res.data.filter(friend => friend.status === "Accepted");
          // 过滤出 status 为 "Pending" 的项目
          const pendingFriends=res.data.filter(friend=>friend.status==="Pending");
          app.globalData.globalpendinglist=pendingFriends;

          // 获取 pendingFriends 的元素数量
          const pendingnum = pendingFriends.length
          this.setData({
            userList:acceptedFriends,
            paddingnum:pendingnum
          })   
          
        }
      })
    }
  },
// 添加用户
addfrinedClick(){
  wx.navigateTo({
    url: '/pages/chats/addfriends/addfriends',
  })
},
pendingClick(){
  wx.navigateTo({
    url: '/pages/chats/pendingfriendsview/pendingfriendsview',
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
    
    // 页面卸载时移除事件监听
    app.removeEventListener('globaluserlistChange', this.updateUserList);
    this.setData({
      userList:null
    })
    
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