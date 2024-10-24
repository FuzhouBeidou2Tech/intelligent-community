// pages/admfuncton/deletePost/deletePost.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    const userId=wx.getStorageSync('user_Id');
    wx.request({
      url: `http://localhost:8080/Post/getpostsAll?userId=${userId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:(res)=>{
        this.setData({
          PostList:res.data.data
        });
        console.log("PostList:",this.data.PostList);
      }
    })
  },
  PostviewClick(e){
    app.globalData.globalPostid=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/Post/Postview/Postview',
    })
    
  },
  // 删除功能
  deleteClick(e){
    const postId=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '您确定要删除该帖吗？',
      success:(res)=>{
        if(res.confirm){
          // 发送删除帖子请求
          wx.request({
            url: `http://localhost:8080/Post/deletePost?postId=${postId}`,
            method:'PUT',
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
          },
          success:(res)=>{
            if(res.data.code==0){
              const title=res.data.data;
              wx.showToast({
                title: title,
                icon: 'success',
                duration: 1000
              })
            
             // 延迟 1 秒后重定向页面
             setTimeout(() => {
              const userId=wx.getStorageSync('user_Id');
              wx.request({
                url: `http://localhost:8080/Post/getpostByuserid?userId=${userId}`,
                method:'GET',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
              },
              success:(res)=>{
                this.setData({
                  PostList:res.data.data
                });
                console.log("mypostlist2",this.data.mypostlist);
              }
            })
                  }, 1000); // 延迟 1000 毫秒 (1 秒)
            }else{
              wx.showToast({
                title: '服务器异常',
                icon: 'none',
                duration: 2000
              });
              console.log("错误信息:",res.data.data);
            }
          },
          fail: (err) => {
            wx.showToast({
              title: '服务器异常',
              icon: 'none',
              duration: 2000
            });
            console.log("错误信息:",res.data.data);
          },
        })
        }
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