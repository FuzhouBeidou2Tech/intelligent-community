// pages/QuickService/activity/activityhome/activityhome.js
const app=getApp();
const userId=wx.getStorageSync('user_Id');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectid:0, // 初始化 selectid
    activitylist:[]//活动列表
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
   this.getactivity();
  },
  // 获取活动接口
  getactivity(){
    if(userId){
      wx.request({
        url: `http://localhost:8080/Activity/getproceedActivities?userId=${userId}`,
        method:'GET',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  // 确保接收 JSON 格式的响应
        },
        success:(res)=>{
          if(res.data.code==0){
            this.setData({
              activitylist:res.data.data
            })
            
          }else{
            wx.showToast({
              title: '服务器异常,请稍后重试',
              icon: 'none',
              duration: 2000
            });
            console.error('数据提交失败：', res.data.message);
          }
          console.log("proceedactivitelist:",this.data.activitylist);
        }
    })
    }else{
      wx.request({
        url: `http://localhost:8080/Activity/getActivitynologin`,
        method:'GET',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  // 确保接收 JSON 格式的响应
        },
        success:(res)=>{
          if(res.data.code==0){
            this.setData({
              activitylist:res.data.data
            })
            
          }else{
            wx.showToast({
              title: '服务器异常,请稍后重试',
              icon: 'none',
              duration: 2000
            });
            console.error('数据提交失败：', res.data.message);
          }
          console.log("proceedactivitelist:",this.data.activitylist);
        }
    })
    }
  },
  // 点击进行中
  onUnderwayTap: function() {
    if(this.data.selectid==0){
      return;
    }
    this.setData({
      selectid: 0,
      activitylist:null
    });
    this.getactivity();
  },

  // 点击已结束
  onFinishTap: function() {
    if(this.data.selectid==1){
      return;
    }
    this.setData({
      selectid: 1
    });
    wx.request({
      url: 'http://localhost:8080/Activity/getfinshActivities',
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            activitylist:res.data.data
          }) 
        }else{
          wx.showToast({
            title: '服务器异常,请稍后重试',
            icon: 'none',
            duration: 2000
          });
          console.error('数据提交失败：', res.data.message);
        }
        console.log("proceedactivitelist:",this.data.activitylist);
      }
  })
  },
  // 报名
  applyClick(e){
    if(this.data.selectid==1){
      wx.showToast({
        title: '活动已结束',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if(e.currentTarget.dataset.ifsignup){
      wx.showToast({
        title: '您已经报名成功了',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    app.globalData.globalofflineActivityId=e.currentTarget.dataset.id;
    app.globalData.globalActivityId=e.currentTarget.dataset.activityid;
    console.log("ActivityId",app.globalData.globalActivityId);
    wx.redirectTo({
      url: '/pages/QuickService/activity/applyactivity/applyactivity',
    })
  },
  viewClick(e){
    const index=Number(e.currentTarget.dataset.index);
    app.globalData.globalActivity=this.data.activitylist[index];
    wx.navigateTo({
      url: '/pages/QuickService/activity/activityview/activityview',
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