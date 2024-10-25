// pages/QuickService/advice/advicehome/advicehome.js
const userId=wx.getStorageSync("user_Id");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ComplaintList:[]//投诉表单
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
      url: `http://localhost:8080/Complain/getComplainall?userId=${userId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
    success:(res)=>{
      
        if(res.data.code==0){
          this.setData({
            ComplaintList:res.data.data
          })
          
          console.log("ComplaintList",this.data.ComplaintList);
        }else{
          wx.showToast({
            title: '服务器异常,请稍后重试',
            icon: 'none',
            duration: 2000
          });
          console.error('数据提交失败：', res.data.message);
        }
        console.log("ComplaintList:",this.data.ComplaintList);
      }
    ,
    fail:(res)=>{
      wx.showToast({
        title: '服务器异常,请稍后重试',
        icon: 'none',
        duration: 2000
      });
    }
    })
  },
// 添加投诉建议
addComplaintClick(){
  wx.redirectTo({
    url: '/pages/QuickService/advice/addadvice/addadvice',
  })
},
deleteClick(e){

  const Id=e.currentTarget.dataset.id;
  wx.showModal({
    title: '提示',
    content: '您确定要删除该帖吗？',
    success:(res)=>{
      if(res.confirm){
        wx.request({
          url: `http://localhost:8080/Complain/deleteComplain?Id=${Id}`,
          method:'PUT',
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
        },
        success:(res)=>{
          if(res.data.code==0){
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
               // 延迟 1 秒后重定向页面
               setTimeout(() => {        
                wx.request({
                  url: `http://localhost:8080/Complain/getComplainall?userId=${userId}`,
                  method:'GET',
                  header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
                },
                success:(res)=>{
                  this.setData({
                    ComplaintList:res.data.data
                  });
                }
              })
                    }, 1000); // 延迟 1000 毫秒 (1 秒)
            }else{
              wx.showToast({
                title: '服务器异常1',
                icon: 'none',
                duration: 2000
              });
              console.log("错误信息:",res.data.data);
            }  
        },
        fail: (err) => {
          wx.showToast({
            title: '服务器异常2',
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