// pages/admfuncton/activityhome/activityhome.js
const app=getApp();
const userId=wx.getStorageSync('user_Id');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectid:0, // 初始化 selectid
    activitylist:[],
    
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
  const userId=wx.getStorageSync('user_Id');
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
//点击删除
deleteClick(e){
  const activityId=e.currentTarget.dataset.activityid;
  const offlineactivityId=e.currentTarget.dataset.offlineactivityid;
  
  wx.showModal({
    title: '提示',
    content: '确定删除该活动吗?',
    success:(res)=>{
      if(res.confirm){
        //发送删除活动请求
        wx.request({
          url: `http://localhost:8080/Activity/deleteactivity?activityId=${activityId}&offlineActivityId=${offlineactivityId}`,
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
              url: `http://localhost:8080/Activity/getproceedActivities?userId=${userId}`,
              method:'GET',
              header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
            },
            success:(res)=>{
              this.setData({
                activitylist:res.data.data
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
//点击修改
updateClick(e){
  const activityId=e.currentTarget.dataset.activityid;
  wx.request({
    url: `http://localhost:8080/Activity/getActivityDTO?activityId=${activityId}&userId=${userId}`,
    method:'GET',
    header: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
    success:(res)=>{
      if(res.data.code==0){
        app.globalData.globalActivity=res.data.data;
        console.log("activity:",app.globalData.globalActivity);
        wx.navigateTo({
          url: '/pages/admfuncton/updateactivity/updateactivity',
        })
      }else{
        wx.showToast({
          title: '服务器异常,请稍后重试',
          icon: 'none',
          duration: 2000
        });
        console.error('数据提交失败：', res.data.message);
      }
    },
    fail:(res)=>{
      wx.showToast({
        title: '服务器异常,请稍后重试',
        icon: 'none',
        duration: 2000
      });
    }
  })
},
publishactivityClick(){
  wx.redirectTo({
    url: '/pages/admfuncton/publishactivity/publishactivity',
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