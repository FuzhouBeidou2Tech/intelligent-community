
//  const io = require('../../weapp.socket.io/lib/weapp.socket.io.js');

 import io from '../../@holytiny/wxmp-socket.io-client/socket.io.js';
 
 let socketUrl='ws://127.0.0.1:3300';
 var that
Page({
    data: {
        consoleMessages: [],
       
    },

    onShow: function () {
        that=this;
        this.connect();
    },

    connect() { 
        var userId = 'zjm';
        const socket = (this.socket = io(socketUrl,{
          // path:'/',
          query:'userId=' + userId,
          allowEIO3: true,
          transports: ['websocket'], // 此项必须设置
          reconnectionAttempts: 3, // 失败后重新连接次数
          reconnectionDelay: 2000, // 重新连接间隔时间毫秒
          forceNew:true,
      }));
        console.log("进去1");
        // 连接成功的事件处理    
          socket.on('connect', () => {
            console.log("连接成功");
            this.output('当前用户是：' + userId);
            this.output('<span class="msg-color">连接成功了。</span>');
        });
        console.log("进去2");
        // 连接断开的事件处理
        socket.on('disconnect', () => {
            this.output('<span class="msg-color">下线了。 </span>');
        });
        // 接收特定频道消息的事件处理
        socket.on('channel_user', (data) => {
            let msg = JSON.stringify(data);
            this.output('收到 channel_user 频道消息了：' + msg);
            console.log(data);
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
    onUnload() {
      this.socketStop();
    }
});