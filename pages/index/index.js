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
    activities: [
      { id: 1, title: '社区运动会', description: '参加社区运动会，强身健体。', image: '/images/examples/activity1.jpg' },
      { id: 2, title: '亲子阅读', description: '和孩子一起享受阅读的快乐时光。', image: '/images/examples/activity2.jpg' },
    ],
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
      url: '/pages/QuickService/advice/advice',
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
  }
});