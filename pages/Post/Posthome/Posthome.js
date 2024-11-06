// pages/Post/Posthome/Posthome.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PostList:[],
    isRequesting: false, // 标记请求状态
    isRequestgFavorite:false,
    isRequestFollow:false
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
  
myPostClick(){
  wx.navigateTo({
    url: '/pages/Post/myPost/myPost',
  })
},
addPostClick(){
  if(wx.getStorageSync('user_communityId')){
    wx.navigateTo({
      url: '/pages/Post/addPost/addPost',
    })
  }else{
    wx.showToast({
      title: '请先前往个人资料绑定社区',
      icon: 'none',
      duration: 2000,
    })
  }
 
},
//点赞功能
addlikeClick:function(e){
     // 检查请求状态是否处于进行中
     if (this.data.isRequesting) {
      return; // 如果已经有请求在进行中，直接返回
    }
    // 设置请求状态为 "进行中"
    this.setData({
      isRequesting: true
    });
  
    const index = e.currentTarget.dataset.index;
    let postList = this.data.PostList;
    const postId=e.currentTarget.dataset.id;
    const userId=wx.getStorageSync('user_Id');
    // 切换 iflike 状态
    if (postList[index].iflike == 1) {
      postList[index].iflike = 0;
      postList[index].likeCount--; // 如果取消点赞，减少点赞计数
      wx.request({
        url: `http://localhost:8080/Post/deletelike?postId=${postId}&userId=${userId}`,
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
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        // 请求完成，恢复请求状态为 "未进行"
        this.setData({
          isRequesting: false
        });
      }
      })
    } else {
      postList[index].iflike = 1;
      postList[index].likeCount++; // 如果点赞，增加点赞计数
      wx.request({
        url: `http://localhost:8080/Post/addlike?postId=${postId}&userId=${userId}`,
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
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        // 请求完成，恢复请求状态为 "未进行"
        this.setData({
          isRequesting: false
        });
      }
      })
      
    }

    // 更新数据
    this.setData({
      PostList: postList
    });
},
addfavoriteClick:function(e){
  
    // 检查请求状态是否处于进行中
    if (this.data.isRequestgFavorite) {
      return; // 如果已经有请求在进行中，直接返回
    }

    // 设置请求状态为 "进行中"
    this.setData({
      isRequestgFavorite: true
    });
  
    const index = e.currentTarget.dataset.index;
    let postList = this.data.PostList;
    const postId=e.currentTarget.dataset.id;
    const userId=wx.getStorageSync('user_Id');
    // 切换 favorite 状态
    if (postList[index].iffavorite == 1) {
      postList[index].iffavorite = 0;
      postList[index].favoriteCount--; // 如果取消收藏，减少收藏计数

      wx.request({
        url: `http://localhost:8080/Post/deletefavorite?postId=${postId}&userId=${userId}`,
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
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        // 请求完成，恢复请求状态为 "未进行"
        this.setData({
          isRequestgFavorite: false
        });
      }
      })
    } else {
      postList[index].iffavorite = 1;
      postList[index].favoriteCount++; // 如果点击收藏，增加收藏计数
      wx.request({
        url: `http://localhost:8080/Post/addfavorite?postId=${postId}&userId=${userId}`,
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
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        // 请求完成，恢复请求状态为 "未进行"
        this.setData({
          isRequestgFavorite: false
        });
      }
      })
      
    }

    // 更新数据
    this.setData({
      PostList: postList
    });
},
// 关注功能
followClick(e){
  if (this.data.isRequestFollow) {
    return; // 如果已经有请求在进行中，直接返回
  }

   // 设置请求状态为 "进行中"
   this.setData({
    isRequestFollow: true
  });
  const index = e.currentTarget.dataset.index;
  let postList = this.data.PostList;
  const userId=wx.getStorageSync('user_Id');
  const followuserId=postList[index].userId;
  // 取消关注
  if(postList[index].iffollow==1){
    

    wx.request({
      url: `http://localhost:8080/Post/unFollow?userId=${userId}&followuserId=${followuserId}`,
      method:'PUT',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:(res)=>{
        if(res.data.code==0){
          postList[index].iffollow=0;
          // 遍历 postList，找到所有符合 followuserId 的数据并更新其 iffollow
          postList.forEach((post,i)=>{
            if(post.userId==followuserId){
              postList[i].iffollow = 0; // 设置符合条件的 post 数据的 iffollow 为 0
            }
          });
          this.setData({
            PostList:postList
          });
          const title=res.data.data;
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        // 请求完成，恢复请求状态为 "未进行"
        this.setData({
          isRequestFollow: false
        });
      }
    })
  }// 点击关注
   else{
  
    wx.request({
      url: `http://localhost:8080/Post/addFollow?userId=${userId}&followuserId=${followuserId}`,
      method:'PUT',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:(res)=>{
        if(res.data.code==0){
          postList[index].iffollow=1;
          // 遍历 postList，找到所有符合 followuserId 的数据并更新其 iffollow
          postList.forEach((post,i)=>{
            if(post.userId==followuserId){
              postList[i].iffollow = 1; // 设置符合条件的 post 数据的 iffollow 为 1
            }
          });
          this.setData({
            PostList:postList
          });
          const title=res.data.data;
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        // 请求完成，恢复请求状态为 "未进行"
        this.setData({
          isRequestFollow: false
        });
      }
    })
  
  }
 
},
PostviewClick(e){
  app.globalData.globalPostid=e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/Post/Postview/Postview',
  })
  
},
myfavoriteClick(){
  wx.navigateTo({
    url: '/pages/Post/favoritePost/favoritePost',
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userId=wx.getStorageSync('user_Id');
    wx.request({
      url: `http://localhost:8080/Post/getpostsAll?userId=${userId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应
      },
      success:(res)=>{
         // 拿到数据后处理内容截取
      let postList = res.data.data;

      postList = postList.map(post => {
        if (post.content.length > 50) {
          post.content = post.content.slice(0, 57) + '...'; // 截取字符并加上省略号
        }
        return post;
      });

      
      // 更新数据
      this.setData({
        PostList: postList
      });
      
      console.log("PostList:", this.data.PostList);
      }
    });
    let postList = this.data.PostList;
    
    // 假设你已经获取了 PostList 的数据，接下来遍历并截取内容
    postList = postList.map(post => {
      if (post.content.length > 50) {
        post.content = post.content.slice(0, 50) + '...'; // 截取前50个字符并加上省略号
      }
      return post;
    });

    // 更新数据
    this.setData({
      PostList: postList
    });
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