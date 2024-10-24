// pages/Post/favoritePost/favoritePost.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    userid:null,
    mypostlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      username:wx.getStorageSync('user_Name'),
      userid:wx.getStorageSync('user_Id')
    })
  },
  PostviewClick(e){
    app.globalData.globalPostid=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/Post/Postview/Postview',
    })
    
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userId=this.data.userid;
    wx.request({
      url: `http://localhost:8080/Post/getfavoritepost?userId=${userId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
    success:(res)=>{
      this.setData({
        mypostlist:res.data.data
      });
      console.log("mypostlist",this.data.mypostlist);
    }
  })
  },

})