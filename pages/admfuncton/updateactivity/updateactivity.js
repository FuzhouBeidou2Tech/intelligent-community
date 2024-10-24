// pages/admfuncton/updateactivity/updateactivity.js
const app=getApp();
Page({
  data: {
   activityDTO:'',
   signupendtime:'',//报名结束时间
   signupenddate:'',//报名结束日期
   signupstarttime:'',//报名开始时间
   signupstartdata:'',//报名开始日期
   starttime:'',//活动开始时间
   startdata:'',//活动开始日期
   gatheringtime:'',//集合时间
   gatheringdata:'',//集合日期
   endtime:'',//活动结束时间
   enddata:'',//活动结束日期
   address:'',//活动地址
   gatheringPlace:'',//活动集合地址
   details:'',//活动描述
   name:'',//活动名称
   organizer:'',//活动负责人
   organizerPhone:'',//活动手机号码
   signupCountMax:'',//最大报名人数
   subtitle:"",//活动副标题
   signupfee:'',//活动报名费用
  },
  onReady() {
    console.log("1");
    this.setData({
      activityDTO:app.globalData.globalActivity
    })
    let [signupenddate, signupendtime] = this.data.activityDTO.signupEndTime.split(" ");
    let[gatheringdata,gatheringtime]=this.data.activityDTO.gatheringTime.split(" ");
    let [signupstartdata,signupstarttime]=this.data.activityDTO.signupStartTime.split(" ");
    let[startdata,starttime]=this.data.activityDTO.startTime.split(" ");
    let[enddata,endtime]=this.data.activityDTO.endTime.split(" ");

    this.setData({
      signupendtime:signupendtime,
      signupenddate:signupenddate,
      signupstartdata:signupstartdata,
      signupstarttime:signupstarttime,
      startdata:startdata,
      starttime:starttime,
      gatheringtime:gatheringtime,
      gatheringdata:gatheringdata,
      enddata:enddata,
      endtime:endtime,
      address:this.data.activityDTO.address,
      details:this.data.activityDTO.details,
      name:this.data.activityDTO.name,
      organizer:this.data.activityDTO.organizer,
      organizerPhone:this.data.activityDTO.organizerPhone,
      signupCountMax:this.data.activityDTO.signupCountMax,
      subtitle:this.data.activityDTO.subtitle,
      gatheringPlace:this.data.activityDTO.gatheringPlace,
      signupfee:this.data.activityDTO.signupFee
    })
    console.log("")
  },
    // 活动名称绑定
    setname(e) {
      this.setData({
        'activityDTO.name': e.detail.value
      });
    },
  
    // 活动副标题绑定
    setsubtitle(e) {
      this.setData({
        'activityDTO.subtitle': e.detail.value
      });
    },
  
    // 活动详情绑定
    setdetails(e) {
      this.setData({
        'activityDTO.details': e.detail.value
      });
    },
  
    // 活动地址绑定
    setaddress(e) {
      this.setData({
        'activityDTO.address': e.detail.value
      });
    },
  
    // 活动集合地址绑定
    setgatheringPlace(e) {
      this.setData({
        'activityDTO.gatheringPlace': e.detail.value
      });
    },
  
    // 活动负责人绑定
    setorganizer(e) {
      this.setData({
        'activityDTO.organizer': e.detail.value
      });
    },
    //报名费用绑定
    setsignupfee(e){
      this.setData({
        'activityDTO.signupFee': e.detail.value
      });
    },
    // 活动负责人手机号绑定
    setorganizerPhone(e) {
      this.setData({
        'activityDTO.organizerPhone': e.detail.value
      });
    },
  
    // 报名人数上限绑定
    setsignupCountMax(e) {
      this.setData({
        'activityDTO.signupCountMax': e.detail.value
      });
    },
  
    // 报名开始时间绑定
    setsignupstarttime(e) {
      this.setData({
        signupstarttime: e.detail.value
      });
    },
  
    // 报名开始日期绑定
    setsignupstartdata(e) {
      this.setData({
        signupstartdata: e.detail.value
      });
    },
  
    // 报名结束时间绑定
    setsignupendtime(e) {
      this.setData({
        signupendtime: e.detail.value
      });
    },
  
    // 报名结束日期绑定
    setsignupenddate(e) {
      this.setData({
        signupenddate: e.detail.value
      });
    },
  
    // 活动开始时间绑定
    setstarttime(e) {
      this.setData({
        starttime: e.detail.value
      });
    },
  
    // 活动开始日期绑定
    setstartdata(e) {
      this.setData({
        startdata: e.detail.value
      });
    },
  
    // 活动结束时间绑定
    setendtime(e) {
      this.setData({
        endtime: e.detail.value
      });
    },
  
    // 活动结束日期绑定
    setenddata(e) {
      this.setData({
        enddata: e.detail.value
      });
    },
    setgatheringtime(e){
     this.setData({
      gatheringtime:e.detail.value
     })
    },
    setgatheringdata(e){
      this.setData({
        gatheringdata:e.detail.value
      })
    },
    // 提交表单处理函数
    submitForm() {

        // 重新组合日期和时间
      const signupEndTime = `${this.data.signupenddate} ${this.data.signupendtime}`;
      const signupStartTime = `${this.data.signupstartdata} ${this.data.signupstarttime}`;
      const startTime = `${this.data.startdata} ${this.data.starttime}`;
      const endTime = `${this.data.enddata} ${this.data.endtime}`;
      const gatheringTime = `${this.data.gatheringdata} ${this.data.gatheringtime}`;

  // 更新 activityDTO 中的时间字段
      this.setData({
        'activityDTO.signupEndTime': signupEndTime,
        'activityDTO.signupStartTime': signupStartTime,
        'activityDTO.startTime': startTime,
        'activityDTO.endTime': endTime,
        'activityDTO.gatheringTime': gatheringTime
      });
      const activityData = this.data.activityDTO;
      console.log('提交的活动数据: ', activityData);
      // 添加提交到服务器的逻辑

      wx.request({
        url: 'http://localhost:8080/Activity/updateactivity', // 替换为后端的实际接口地址
        method: 'POST',
        data: activityData,
        header: {
          'Content-Type': 'application/json' // 设置请求头，指定内容类型为 JSON
        },
        success:(res)=>{
          if(res.data.code==0){
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 2000
            });
            
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
          console.error('数据提交失败：', res.data.message);
        }
      })
    }
})