// app.js
import io from './pages/@holytiny/wxmp-socket.io-client/socket.io.js';
 const that=this;
let socketUrl='ws://127.0.0.1:3300';
var userId =wx.getStorageSync('user_Id');
App({
  onLaunch() {
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.connect();
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  connect() {
    const app=this;
    
    var opts = {
        query: 'userId=' + userId
    };
    // 连接 socket.io 服务器
    // const socket = io('ws://127.0.0.1:3300', opts);
    const socket = (this.socket = io(socketUrl,{
      // path:'/',
      query:'userId=' + userId,
      allowEIO3: true,  
      transports: ['websocket'], // 此项必须设置
      reconnectionAttempts: 3, // 失败后重新连接次数
      reconnectionDelay: 2000, // 重新连接间隔时间毫秒
      forceNew:true,
  }));
   
    app.globalData.globalsocket=socket;
    console.log("进去1");
    // 连接成功的事件处理
      socket.on('connect', () => {
        console.log("连接1成功"); 
    });
    console.log("进去2");
    // 连接断开的事件处理
    socket.on('disconnect', () => {
    });
    // 接收特定频道消息的事件处理
    socket.on('channel_user', (data) => {
      
      const app=getApp();
        let msg = JSON.stringify(data);
        //this.output('收到 channel_user 频道消息了：' + msg);
        console.log(data);
        console.log("data.senderid",data.senderId);
        console.log("data.receiveId:",data.receiveId);
        //用户在线，且打开当前聊天会话
        if(app.globalData.globalMessageId==data.senderId){
          
        }//用户在线，但没有打开当前聊天会话
        else{
          
          wx.request({
            url: `http://localhost:8080/Friends/getfriends?user1Id=${userId}`,  // 服务器地址
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'  // 确保接收 JSON 格式的响应
          },
            success:(res)=>{
              this.setGlobalUserList(res.data);
            }
          })
        }
    });      
},

// 自定义事件
 // 事件系统
 eventListeners: {},

 // 注册事件监听器
 addEventListener(eventName, listener) {
   if (!this.eventListeners[eventName]) {
     this.eventListeners[eventName] = [];
   }
   this.eventListeners[eventName].push(listener);
 },

 // 移除事件监听器
 removeEventListener(eventName, listener) {
   if (this.eventListeners[eventName]) {
     this.eventListeners[eventName] = this.eventListeners[eventName].filter(l => l !== listener);
   }
 },

 // 触发事件
 emitEvent(eventName, data) {
   if (this.eventListeners[eventName]) {
     this.eventListeners[eventName].forEach(listener => listener(data));
   }
 },

 // 修改 globaluserlist 并触发事件
 setGlobalUserList(newList) {
   this.globalData.globaluserlist = newList;
   this.emitEvent('globaluserlistChange', newList);
 },


 //
  globalData: {
    userInfo: null,
    result:{
    },
    buildings:[],
    rooms:[],   
    globalMessageId:null,
    globalMessageList:[],
    globaluserlist:[],
    globalMessage:[],
    globalsocket:null,
    globalNotification:null,
    globalpendinglist:[],
    globalPostid:null,
    globalPost:'',//全局帖子表
    globalofflineActivityId:'',//全局线下活动表
    globalActivityId:'',//全局活动表
    globalActivity:'',
    globalproductId:'',//全局商品id
  }, 
})

