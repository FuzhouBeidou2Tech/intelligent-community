// pages/setaddresscommunities/setaddresscommunities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communities:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://localhost:8080/Address/Communities',
      method:'GET',
      header:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },success:(response)=>{
        console.log("地址");
        console.log(response.data);
        this.setData({
          communities: response.data  // 将返回的数据存储到页面的 data 中
        });
      },
      fail: (err) => {
        console.error(err);  // 请求失败时打印错误
      }
    })
  },
  getcommunityById: function (id) {
   return this.data.communities.find(community => community.id === id);
 },
   onCommunityTap: function(e) {
     const app=getApp();
    const communityId = e.currentTarget.dataset.id;  // 获取点击项的 item.id
    console.log("社区 ID: ", communityId);
    wx.request({
      url: `http://localhost:8080/Address/Buildings?communityId=${communityId}`, // 替换为实际接口地址
      method: 'GET',
      success:(res)=> {
        app.globalData.buildings=res.data;
     
        wx.setStorageSync('user_communityId', communityId);

        const communityname = this.getcommunityById(communityId);
        wx.setStorageSync('community_name', communityname.name);
        console.log("社区名字是:",communityname);
        wx.navigateTo({
          url: '/pages/buildings/buildings',
        })
      },
      fail:(err)=> {
        console.log("请求失败：", err);
      }
    });
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