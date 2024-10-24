// pages/Post/Postview/Postview.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Post:null,
    CommentList:[],
    Comment:null,
    imageList:[] //图片组
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
    const PostId=app.globalData.globalPostid;
    wx.request({
      url: `http://localhost:8080/Post/getpostByid?Id=${PostId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success:(res)=>{
      this.setData({
        Post:res.data.data.post,
        CommentList:res.data.data.commentdto,
        imageList:res.data.data.imageList
      })
      console.log("res.data.data=",res.data.data);
      console.log("CommentList:",this.data.CommentList);
      console.log("imageList",this.data.imageList);
    }
    })
  },
  formatResidueTime(residue) {
    // 将毫秒转换为秒
    let seconds = Math.floor(residue / 1000);
  
    // 计算天数
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
  
    // 计算小时
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
  
    // 计算分钟
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
  
    // 字符串格式化
    return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
  },
  // 绑定评论内容
  setComment(e){
    this.setData({
      Comment:e.detail.value
    });
    
  },
  sendButton(){
    const postid=this.data.Post.id;
    const userid=wx.getStorageSync('user_Id');
    const content=this.data.Comment;
    console.log("postid",postid);
    console.log("userid",userid);
    console.log("content",this.data.Comment);
    wx.request({
      
      url:`http://localhost:8080/Comment/addcomment?postId=${postid}&userId=${userid}&content=${content}`,
      method:'PUT',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
    },
    success: (res) => {
      // 获取当前时间并格式化为中国时区的时间
      const currentDate = new Date();
      const offset = 8 * 60 * 60 * 1000; // 中国时区的偏移量
      const chinaDate = new Date(currentDate.getTime() + offset);
      
      // 时间格式转换
      chinaDate.setMinutes(chinaDate.getUTCMinutes() );

      const year = chinaDate.getUTCFullYear();
      const month = String(chinaDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(chinaDate.getUTCDate()).padStart(2, '0');
      const hours = String(chinaDate.getUTCHours()).padStart(2, '0');
      const minutes = String(chinaDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(chinaDate.getUTCSeconds()).padStart(2, '0');
      const formattedDateChina = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+08:00`;

      // 假设服务器返回了新增评论的 commentID 和其他必要的信息，根据实际情况修改
      const newComment = {
        postID: postid,
        userID: userid,
        content: content,
        createdTime: formattedDateChina,
        username: wx.getStorageSync('user_Name'),
        formattedResidue:"1分钟"
      };
      
      // 将新的评论插入到 CommentList 的开头，并清空输入框内容
      this.setData({
        CommentList: [newComment, ...this.data.CommentList],
        Comment: ''  // 清空输入框内容
      });
      console.log("新的评论已添加到 CommentList:", this.data.CommentList);
      wx.showToast({
        title: '发送成功',
      })
    },
    fail: (res) => {
      console.error("发送评论失败:", res);
      wx.showToast({
        title: '发送失败',
      })
    }
  })
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
    app.globalData.globalPostid=null
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