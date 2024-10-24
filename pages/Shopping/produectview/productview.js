// pages/Shopping/produectview/productview.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productdto:'',//产品表
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
    const Id=app.globalData.globalproductId;
    wx.request({
      url: `http://localhost:8080/Business/findProductById?productId=${Id}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
    success:(res)=>{
      if(res.data.code==0){
        this.setData({
          productdto:res.data.data
        })
        console.log("productdto",this.data.productdto);
      }else{
        wx.showToast({
          title: '服务器异常，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        console.log("错误信息:",res.data.data);
      }
    },
    fail: (err) => {
      wx.showToast({
        title: '服务器异常，请稍后重试',
        icon: 'none',
        duration: 2000
      });
      console.log("错误信息:",res.data.data);
    },
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
    app.globalData.globalproductId=null;
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