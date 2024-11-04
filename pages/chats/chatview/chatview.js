// pages/chats/chatview/chatview.js
import io from '../../@holytiny/wxmp-socket.io-client/socket.io.js';
const app=getApp();
let socketUrl='ws://127.0.0.1:3300';
var that;
var socket1;
const th=this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  messageList:[],
  senderid:null,
  inputValue: '',
  scrollToView: '',     // 用于指定滚动到某个视图的id
  uploadedImageUrls: [], // 存储已经上传的图片URL
  images: [],// 存储选择的图片路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that=this;
    this.connect();
  },
  connect() { 
    
    socket1 = app.globalData.globalsocket; // 复用全局的 socket 实例
    console.log("进去1");
    // 连接成功的事件处理    
      socket1.on('connect', () => {
        console.log("连接2成功");
      
    });
    console.log("进去2");
    // 连接断开的事件处理
    socket1.on('disconnect', () => {
        //this.output('<span class="msg-color">下线了。 </span>');
    });
    // 接收特定频道消息的事件处理
    socket1.on('channel_user', (data) => {
      
      const senderId=data.senderId;
      const userId=wx.getStorageSync('user_Id');
      console.log("senderId：",senderId);
      console.log("data:",data);
      console.log("isImages:",data.isImages)
      if(data.senderId==app.globalData.globalMessageId){
        wx.request({
          url: `http://localhost:8080/IMessage/readMessage?receiverId=${userId}&senderId=${senderId}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'  // 确保接收 JSON 格式的响应
        },
        success:()=>{
        }
        })
      }
        let msg = JSON.stringify(data);
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
        const formattedDateChina = `${year}-${month}-${day}${hours}:${minutes}:${seconds}`;
        console.log("中国时区时间", formattedDateChina); // 输出中国时区的时间
        if(app.globalData.globalMessageId==data.senderId){
          console.log("进去页面接收信息:",data.senderId);
          this.setData({
            messageList: [...this.data.messageList, { 
              messageID: null, 
              senderID: data.senderId, 
              receiverID: wx.getStorageSync('user_Id'), 
              content: data.message, 
              ifimage:data.isImages,
              createdTime: formattedDateChina
          }],
          //更新视图
          scrollToView: `msg${this.data.messageList.length}`
        }
          )
        }else{
          console.log("进去页面");
        }
    });
},
socketStop: function () {
  if (socket1) {
    console.log("关闭");
    socket1.close();
    socket1 = null;
  }
},
    output: function (message) {
        var newMessages = this.data.consoleMessages;
        newMessages.unshift(message);
        this.setData({
            consoleMessages: newMessages
        });
    },
   
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
    this.setData({
      senderid:wx.getStorageSync('user_Id')
    })
    const senderId=app.globalData.globalMessageList.user1Id;
    const receiverId=app.globalData.globalMessageList.user2Id;
    this.getMessageList(senderId, receiverId).then(() => {
      // 数据加载完成后，在这里设置滚动到最新消息
      if (this.data.messageList.length > 0) {
        this.setData({
          scrollToView: `msg${this.data.messageList.length - 1}`
        });
      }
    });
  },
  
  getMessageList(senderId, receiverId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://localhost:8080/IMessage/getImessage?senderId=${senderId}&receiverId=${receiverId}`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  // 确保接收 JSON 格式的响应
        },
        success: (res) => {
          this.setData({
            messageList: res.data
          });
          console.log("messageList=", this.data.messageList);
          resolve(); // 请求成功，resolve Promise
        },
        fail: (error) => {
          console.error("Failed to fetch message list", error);
          reject(error); // 请求失败，reject Promise
        }
      });
    });
  },
  //输入框数据绑定
  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  //发送信息事件
  sendMessage(){
    const userId=wx.getStorageSync('user_Id');
    const receiveId=app.globalData.globalMessageId;
    const message=this.data.inputValue;
    if(this.data.inputValue){
      // 发送人(本id)是senderId
      wx.request({
        url: `http://localhost:8080/Message/sendmessage?userId=${receiveId}&message=${message}&senderId=${userId}`,
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
        const formattedDateChina = `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
        console.log("中国时区时间", formattedDateChina); // 输出中国时区的时间
          this.setData({
            messageList: [...this.data.messageList, { 
              messageID: null, 
              senderID: userId, 
              receiverID: receiveId, 
              content: message, 
              createdTime: formattedDateChina,
              ifimage:false
          }],
          inputValue: '',  // 发送后清空输入框
          scrollToView: `msg${this.data.messageList.length}` // 滚动到最新的消息
          })
        //
        }
      })
    }else{
    } 
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // this.socketStop();
    app.globalData.globalMessageId=null;
  },
// 选择图片
chooseImage() {
  wx.chooseMedia({
    count: 6, // 允许选择的媒体数量
    mediaType: ['image'], // 仅选择图片
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
    success: (res) => {
      const tempFilePaths = res.tempFiles.map(file => file.tempFilePath);
      this.setData({
        images: this.data.images.concat(tempFilePaths)
      });
      this.snedImage();
    },
    fail: (err) => {
      console.error('选择图片失败', err);
    }
  });
},
// 上传图片
uploadImages() {
  const { images } = this.data;
  const uploadPromises = images.map(filePath => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://localhost:8080/Message/inserimage',
        filePath: filePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          console.log("data:",data);
          if (data.code==0) { 
            this.data.uploadedImageUrls.push(data.data);
            resolve(data.data);
          } else {
            reject(data.message || '上传失败');
          }
        },
        fail: (err) => {
          reject(err.errMsg || '上传失败');
        }
      });
    });
  });
  return Promise.all(uploadPromises);
},
// 发送图片方法
snedImage(){
 
  this.uploadImages()
  .then(uploadedUrls => {
    if (uploadedUrls.length === 0) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const array=this.data.uploadedImageUrls;
    array.forEach((element, index) => {
    // 提交其他数据
    const userId=wx.getStorageSync('user_Id');
    const receiveId=app.globalData.globalMessageId;
    const message=element;
      wx.request({
        url: `http://localhost:8080/Message/sendimages?userId=${receiveId}&message=${message}&senderId=${userId}`,
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
        const formattedDateChina = `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
        console.log("中国时区时间", formattedDateChina); // 输出中国时区的时间
          this.setData({
            messageList: [...this.data.messageList, { 
              messageID: null, 
              senderID: userId, 
              receiverID: receiveId, 
              content: message, 
              createdTime: formattedDateChina,
              ifimage:true
          }],
          scrollToView: `msg${this.data.messageList.length}`, // 滚动到最新的消息
          })
        // 
        }
      })
    });
    this.setData({
      uploadedImageUrls:[],
      images:[]
    })
  })
  .catch(error => {
    wx.showToast({
      title: '图片上传失败',
      icon: 'none',
      duration: 2000
    });
    console.error('图片上传出错：', error);
  });
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