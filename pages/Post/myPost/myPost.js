// pages/Post/myPost/myPost.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    userid:null,
    mypostlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      username:wx.getStorageSync('user_Name'),
      userid:wx.getStorageSync('user_Id')
    })
  },
  PostviewClick(e){
    app.globalData.globalPostid=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/Post/Postview/Postview',
    })
    
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userId=this.data.userid;
    wx.request({
      url: `http://localhost:8080/Post/getpostByuserid?userId=${userId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
    success:(res)=>{
      this.setData({
        mypostlist:res.data.data
      });
      console.log("mypostlist",this.data.mypostlist);
    }
  })
  },
  
  deleteClick(e){
    const postId=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '您确定要删除该帖吗？',
      success:(res)=>{
        if(res.confirm){
          // 发送删除帖子请求
          wx.request({
            url: `http://localhost:8080/Post/deletePost?postId=${postId}`,
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
                url: `http://localhost:8080/Post/getpostByuserid?userId=${userId}`,
                method:'GET',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
              },
              success:(res)=>{
                this.setData({
                  mypostlist:res.data.data
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
  }
  
})