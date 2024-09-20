// pages/chats/chatview/chatview.js
import io from '../../@holytiny/wxmp-socket.io-client/socket.io.js';
const app=getApp();
let socketUrl='ws://127.0.0.1:3300';
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
  messageList:[],
  senderid:null,
  inputValue: '',
  scrollToView: '',     // 用于指定滚动到某个视图的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that=this;
    this.connect();
  },
  connect() { 
    var userId = '3';
    const socket = (this.socket = io(socketUrl,{
      // path:'/',
      query:'userId=' + userId ,
      allowEIO3: true,
      transports: ['websocket'], // 此项必须设置
      reconnectionAttempts: 3, // 失败后重新连接次数
      reconnectionDelay: 2000, // 重新连接间隔时间毫秒
      forceNew:true,
  }));
    console.log("进去1");
    // 连接成功的事件处理    
      socket.on('connect', () => {
        console.log("连接2成功");
      
    });
    console.log("进去2");
    // 连接断开的事件处理
    socket.on('disconnect', () => {
        //this.output('<span class="msg-color">下线了。 </span>');
    });
    // 接收特定频道消息的事件处理
    socket.on('channel_user', (data) => {
        let msg = JSON.stringify(data);
        console.log("接受信息2");
        console.log("data=",data);
        const currentDate = new Date();
        // 中国时区的偏移量是 +8 小时（相对 UTC）
        const offset = 8 * 60 * 60 * 1000; // 偏移量转换为毫秒
        const chinaDate = new Date(currentDate.getTime() + offset);
        // 获取各个部分
        const year = chinaDate.getUTCFullYear();
        const month = String(chinaDate.getUTCMonth() + 1).padStart(2, '0'); // 月
        const day = String(chinaDate.getUTCDate()).padStart(2, '0'); // 日
        const hours = String(chinaDate.getUTCHours()).padStart(2, '0'); // 时
        const minutes = String(chinaDate.getUTCMinutes()).padStart(2, '0'); // 分
        const seconds = String(chinaDate.getUTCSeconds()).padStart(2, '0'); // 秒
        // 格式化为 ISO 8601 格式（中国时区）
        const formattedDateChina = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+08:00`;
        console.log("中国时区时间", formattedDateChina); // 输出中国时区的时间
        if(app.globalData.globalMessageId==data.senderid){
          console.log("进去页面接收信息:",data.senderid);
          this.setData({
            messageList: [...this.data.messageList, { 
              messageID: null, 
              senderID: data.senderid, 
              receiverID: wx.getStorageSync('user_Id'), 
              content: data.message, 
              createdTime: formattedDateChina
          }]
          })
        }else{
          console.log("进去页面");
        }
    });
},
    output: function (message) {
        var newMessages = this.data.consoleMessages;
        newMessages.unshift(message);
        this.setData({
            consoleMessages: newMessages
        });
    },
    socketStop: function () {
      if (this.socket) {
        console.log("关闭");
        this.socket.close()
        this.socket = null
      }
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
    this.setData({
      senderid:app.globalData.globalMessageId
    })
    const senderId=app.globalData.globalMessageList.user1Id;
    const receiverId=app.globalData.globalMessageList.user2Id;
    wx.request({
      url: `http://localhost:8080/IMessage/getImessage?senderId=${senderId}&receiverId=${receiverId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
      success:(res)=>{
        this.setData({
          messageList:res.data
        })
        console.log("messageList=",this.data. messageList);
      }
    })
  },
  //输入框数据绑定
  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  //发送信息事件
  sendMessage(){
    const messageList = this.data.messageList;
    const userId=wx.getStorageSync('user_Id');
    const senderId=app.globalData.globalMessageId;
    const message=this.data.inputValue
    if(this.data.inputValue){
      wx.request({
        url: `http://localhost:8080/Message/sendmessage?userId=${senderId}&message=${message}&senderId=${userId}`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:()=>{
        const currentDate = new Date();
        // 中国时区的偏移量是 +8 小时（相对 UTC）
        const offset = 8 * 60 * 60 * 1000; // 偏移量转换为毫秒
        const chinaDate = new Date(currentDate.getTime() + offset);
        // 获取各个部分
        const year = chinaDate.getUTCFullYear();
        const month = String(chinaDate.getUTCMonth() + 1).padStart(2, '0'); // 月
        const day = String(chinaDate.getUTCDate()).padStart(2, '0'); // 日
        const hours = String(chinaDate.getUTCHours()).padStart(2, '0'); // 时
        const minutes = String(chinaDate.getUTCMinutes()).padStart(2, '0'); // 分
        const seconds = String(chinaDate.getUTCSeconds()).padStart(2, '0'); // 秒
        // 格式化为 ISO 8601 格式（中国时区）
        const formattedDateChina = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+08:00`;
        console.log("中国时区时间", formattedDateChina); // 输出中国时区的时间
         
          this.setData({
            messageList: [...this.data.messageList, { 
              messageID: null, 
              senderID: userId, 
              receiverID: senderId, 
              content: message, 
              createdTime: formattedDateChina
          }],
          inputValue: '',  // 发送后清空输入框
          scrollToView: 'message' + (messageList.length - 1) // 滚动到最新的消息
          })
        //
        }
      })
    }else{
    }
   
   
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
    this.socketStop();
    app.globalData.globalMessageId=null;

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