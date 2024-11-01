// index.js
const app=getApp();
const userId=wx.getStorageSync('user_Id');
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
    userlist:[],
    notificationTitle:[],
    MessageList:{
      user1Id:userId,
      user2Id:3
    }//对接全局变量
  },
  onShow(){
    this.receptionmanage();
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

  },
  //物业管家
  manageClick(){
    if(wx.getStorageSync('user_Id')){
      // 用户点击，执行信息已读操作
      app.globalData.globalMessageId=3;
      app.globalData.globalMessageList=this.data.MessageList;
      const senderId=3;
      console.log("全局变量",app.globalData.globalMessageList);
      console.log("id=",app.globalData.globalMessageId);
      wx.request({
      url: `http://localhost:8080/IMessage/readMessage?userId=${userId}&senderId=${senderId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:()=>{
      
    }
    })
    wx.navigateTo({
      url: '/pages/chats/chatview/chatview',
    })

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
  },
  
  onReady(){
        // 监听 globaluserlistChange 事件
        this.updateUserList = this.updateUserList.bind(this); // 确保 this 绑定正确
        app.addEventListener('globaluserlistChange', this.updateUserList);
        
        // 初始化时获取全局的 userlist
        // this.setData({
        //   userlist: app.globalData.globaluserlist
        // });
        // console.log("userlist",this.data.userlist);
  },
 //事件监听
  updateUserList(newList) {
    console.log("传入的新数据：", newList);    
    // 更新页面的 userlist
    const updatedList = JSON.parse(JSON.stringify(newList));
    this.setData({ userList: updatedList });
    console.log("更新成功");
  },
  // 页面卸载
  onUnload() {  
    // 页面卸载时移除事件监听
    app.removeEventListener('globaluserlistChange', this.updateUserList);
    this.setData({
      userList:null
    })
    
  },

  // 接受物业管家信息
  receptionmanage(){
    wx.request({
      url: `http://localhost:8080/Friends/getfriends?user1Id=${userId}`,  // 服务器地址
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
});