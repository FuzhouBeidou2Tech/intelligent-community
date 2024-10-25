// pages/admfuncton/repairhome/repairhome.js
const userid=wx.getStorageSync('user_Id');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    RepairList:[],

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
      url: 'http://localhost:8080/RepairRequest/getRepairAll',
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
    success:(res)=>{
      console.log(res.data);
      this.setData({
        RepairList:res.data.data
      })
      console.log("RepairList",this.data.RepairList);
    }
    })
  },

  
  addRepairClick(){
    wx.navigateTo({
      url: '/pages/QuickService/Repair/AddRepair/AddRepair',
    })
  },
  deleteClick(e){
    const id=e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '您确定要删除该帖吗？',
      success:(res)=>{
        if(res.confirm){
          // 发送删除维修报告请求
          wx.request({
            url: `http://localhost:8080/RepairRequest/deleteRepair?Id=${id}`,
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
              
              wx.request({
                url: `http://localhost:8080/RepairRequest/getRepair?userId=${userid}`,
                method:'GET',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
              },
              success:(res)=>{
                this.setData({
                  RepairList:res.data.data
                });
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
   
  },
  // 通过审核
  PROGRESSClick(e){
    const id=e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '您确定要通过审核吗？',
      success:(res)=>{
        if(res.confirm){
          // 发送通过审核报告请求
          wx.request({
            url: `http://localhost:8080/RepairRequest/SetINPROGRESS?Id=${id}`,
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
              
              wx.request({
                url: `http://localhost:8080/RepairRequest/getRepair?userId=${userid}`,
                method:'GET',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
              },
              success:(res)=>{
                this.setData({
                  RepairList:res.data.data
                });
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
  },
  // 审核失败
  REJECTEDClick(e){
    const id=e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '您确定要审核失败吗？',
      success:(res)=>{
        if(res.confirm){
          // 发送审核失败请求
          wx.request({
            url: `http://localhost:8080/RepairRequest/SetREJECTED?Id=${id}`,
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
              
              wx.request({
                url: `http://localhost:8080/RepairRequest/getRepair?userId=${userid}`,
                method:'GET',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
              },
              success:(res)=>{
                this.setData({
                  RepairList:res.data.data
                });
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
  },
  //处理成功
  COMPLETEDClick(e){
    const id=e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '您确定要处理成功吗？',
      success:(res)=>{
        if(res.confirm){
          // 发送处理成功请求
          wx.request({
            url: `http://localhost:8080/RepairRequest/SetCOMPLETED?Id=${id}`,
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
              
              wx.request({
                url: `http://localhost:8080/RepairRequest/getRepair?userId=${userid}`,
                method:'GET',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
              },
              success:(res)=>{
                this.setData({
                  RepairList:res.data.data
                });
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
  },
  // 处理成功

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