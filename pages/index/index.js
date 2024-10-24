// index.js
const app=getApp();

Page({
  data:{
    latestAnnouncement: '这是最新的社区公告内容。',
    businesses: [
      { id: 1, name: '商家1', image: '/images/business1.jpg' },
      { id: 2, name: '商家2', image: '/images/business2.jpg' },
      { id: 3, name: '商家3', image: '/images/business3.jpg' },
    ],
    activities: [],
    promotions: [
      { id: 1, title: '商家促销1', description: '享受限时折扣。', image: '/images/examples/activity1.jpg' },
      { id: 2, title: '商家促销2', description: '会员专属优惠。', image: '/images/examples/activity2.jpg' }
    ],
    notificationTitle:[]
  },
  onShow: function () {
    
    
  },
  onLoad() {
    this.fetchAnnouncements();
    this.fetchActivities();
    this.fetchPromotions();

    wx.request({
      url: 'http://localhost:8080/Notification/Title',
      method:'GET',
      header: {
        'Content-Type': 'application/json'  // 请求头，确保是 JSON 格式
      },
      success:(res)=>{
        console.log("标题通知数据",res.data);
        this.setData({
          notificationTitle:res.data
        })
      }
    });
    wx.request({
      url: 'http://localhost:8080/Activity/getActivities',
      method:'GET',
      header: {
        'Content-Type': 'application/json'  // 请求头，确保是 JSON 格式
      },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            activities:res.data.data
          })
          console.log("活动",this.data.activities);
        }else{
          wx.showToast({
            title: '服务器异常,请稍后重试',
            icon: 'none',
            duration: 2000
          });
          console.error('数据提交失败：', res.data.message);
        }
      }
    })
  },

  fetchAnnouncements() {
    // Simulate fetching community announcements
    // Replace this with actual data fetching code
    const announcements = [
      '这是最新的社区公告内容。',
      '第二条公告内容。',
      '第三条公告内容。'
    ];
    this.setData({
      latestAnnouncement: announcements[0]
    });
  },
  // 进去活动主页
  activityviewClick(e){
    const activityId=e.currentTarget.dataset.id;
    const userId=wx.getStorageSync('user_Id');
    wx.request({
      url: `http://localhost:8080/Activity/getActivityDTO?activityId=${activityId}&userId=${userId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json'  // 请求头，确保是 JSON 格式
      },
      success:(res)=>{
        if(res.data.code==0){
          app.globalData.globalActivity=res.data.data;
          console.log("activity:",app.globalData.globalActivity);
          wx.navigateTo({
            url: '/pages/QuickService/activity/activityview/activityview',
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
  fetchActivities() {
    // Simulate fetching community activities
    console.log("Fetching community activities");
  },

  fetchPromotions() {
    // Simulate fetching promotions
    console.log("Fetching promotions");
  },

  // 快捷服务

  //社区活动
  acviteClick(){
    wx.navigateTo({
      url: '/pages/QuickService/communityactivity/communityactivity',
    })
  },
  adviceClick(){
    wx.navigateTo({
      url: '/pages/QuickService/advice/advicehome/advicehome',
    })
  },
  intonotification: function(e) {
    const itemId = e.currentTarget.dataset.id; // 获取传递的 item.id   
    app.globalData.globalNotification=itemId;
    
    wx.navigateTo({
      url: '/pages/notification/notificationshow/notificationshow',
    })
  },
  notificationhomeClick(){
    wx.navigateTo({
      url: '/pages/notification/notificationhome/notificationhome',
    })
  },
  //家政服务
  domesticeClick(){
    wx.navigateTo({
      url: '/pages/QuickService/Domesticservice/Domesticservice',
    })
<<<<<<< HEAD
=======
  },
  //物业管家
  manage(){
    if(wx.getStorageSync('user_Id')){
      
    }
    else{
     wx.showToast({
       title: '请先登录',
       icon:'error',
     })
    }
  },
  //物业报修
  repairClick(){
    wx.navigateTo({
      
      url: '/pages/QuickService/Repair/Repairhome/Repairhome',
    })
  },
  //社区活动
  communityactivityClick(){
    wx.navigateTo({
      url: '/pages/QuickService/activity/activityhome/activityhome',
      
    })
  },
  //投诉建议
  adviceClick(){
    wx.navigateTo({
      url: '/pages/QuickService/advice/advicehome/advicehome',
    })
>>>>>>> 9a3cfc8 (新加模块:商城模块)
  }
});