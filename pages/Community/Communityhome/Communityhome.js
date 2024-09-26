// pages/Community/Communityhome/Communityhome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CommunityName:'旗山花园',
    CommunityAddress:'福州市闽候县高新大道2号',
    PostList:[]
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
    const communityName = wx.getStorageSync('community_name');
    const communityAddress = wx.getStorageSync('community_address');
   // 判断缓存中是否存在 community_name 和 community_address
   if (communityName && communityAddress) {
    // 如果存在，则进行数据设置
    this.setData({
      CommunityName: communityName,
      CommunityAddress: communityAddress
    });
  }else{
    this.setData({
      CommunityName: '请绑定地址',
      CommunityAddress: ''
  });
  };
  const communityId=wx.getStorageSync('user_communityId')
  wx.request({
    url: `http://localhost:8080/Post/getposts?communityId=${communityId}`,
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'  // 确保接收 JSON 格式的响应
  },
  success:(res)=>{
    console.log("数据处理前:",res.data);
    this.setData({
      PostList:res.data.data
    })
    console.log("论坛:",this.data.PostList);
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