// pages/business/business.js
const app=getApp();
Page({
  data: {
    categories: [],
    stores: [],
    Business:[],
    BusinessCategory:[],
    IndexId:'null',//类型选择标记
    ifSelect:'0',//选中标记
    ifSearch:'0',//搜索标记
    searchtext:''
  },

  onLoad() {
    this.fetchCategories();
    this.fetchStores();
  },

  fetchCategories() {
    // Simulate fetching category data
    const categories = [
      { id: 1, name: '咖啡馆' },
      { id: 2, name: '餐厅' },
      { id: 3, name: '商店' },
      { id: 4, name: '服务' },
      { id: 5, name: '娱乐' }
      // Add more categories as needed
    ];
    this.setData({ categories });
  },

  fetchStores() {
    // Simulate fetching stores data
    const stores = [
      {
        id: 1,
        storeImage: '/images/examples/store-logo.jpg',
        storeName: '商店 1',
        products: [
          { id: 1, productImage: '/images/examples/product.png', productName: '产品 1' },
          { id: 2, productImage: '/images/examples/product.png', productName: '产品 2' },
          { id: 3, productImage: '/images/examples/product.png', productName: '产品 3' },
          { id: 4, productImage: '/images/examples/product.png', productName: '产品 4' },
          { id: 5, productImage: '/images/examples/product.png', productName: '产品 5' },
          { id: 6, productImage: '/images/examples/product.png', productName: '产品 6' },
          { id: 7, productImage: '/images/examples/product.png', productName: '产品 7' },
          { id: 8, productImage: '/images/examples/product.png', productName: '产品 8' },
          { id: 9, productImage: '/images/examples/product.png', productName: '产品 9' }
        ]
      },
      {
        id: 2,
        storeImage: '/images/examples/store-logo1.jpg',
        storeName: '商店 2',
        products: [
          { id: 1, productImage: '/images/examples/product.png', productName: '产品 1' },
          { id: 2, productImage: '/images/examples/product.png', productName: '产品 2' },
          { id: 3, productImage: '/images/examples/product.png', productName: '产品 3' },
          { id: 4, productImage: '/images/examples/product.png', productName: '产品 4' },
          { id: 5, productImage: '/images/examples/product.png', productName: '产品 5' },
          { id: 6, productImage: '/images/examples/product.png', productName: '产品 6' },
          { id: 7, productImage: '/images/examples/product.png', productName: '产品 7' },
          { id: 8, productImage: '/images/examples/product.png', productName: '产品 8' },
          { id: 9, productImage: '/images/examples/product.png', productName: '产品 9' }
        ]
      }
      // Add more stores as needed
    ];
    this.setData({ stores });
  },

  onCategorySelect(e) {
    const categoryId = e.currentTarget.dataset.id;
    // Filter businesses based on selected category (if desired)
    // You can implement filtering logic here
  },

  onNavChange(e) {
    const { page } = e.detail;
    wx.switchTab({ url: `/${page}/${page}` });

    
  },
  onShow(){
   
    this.getdata();
    wx.request({
      url: 'http://localhost:8080/Business/getBusinessCategory',
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            BusinessCategory:res.data.data
          })
        }else{
          wx.showToast({
            title: '服务器异常，请稍后重试',
            icon: 'none',
            duration: 2000
          });
          console.log("错误信息:",res.data.data);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        console.log("错误信息:",res.data.data);
      },
    })
  },
  // 点击分类按钮
  CategoryClick(e){
    const id=e.currentTarget.dataset.id;
    const index=e.currentTarget.dataset.index;
    if(this.data.ifSelect==0){
        this.CategoryRequest(id);
        this.setData({
        IndexId:index,
        ifSelect:1})
    }else{
      if(this.data.IndexId==index){
        this.setData({
          IndexId:null,
          ifSelect:0
        })
        this.getdata();
      }else{
        this.CategoryRequest(id);
        this.setData({
          IndexId:index
        })
      }
    

    }
    
  },

  
  CategoryRequest(id){
    const categoryId=id;
    wx.request({
      url: `http://localhost:8080/Business/getBusinessByCategoryId?categoryId=${categoryId}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            Business:res.data.data
          })
        }else{
          wx.showToast({
            title: '服务器异常，请稍后重试',
            icon: 'none',
            duration: 2000
          });

          console.log("错误信息:",res.data.data);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        console.log("错误信息:",res.data.data);
      },
    })
  },
  searchInput(e){
    this.setData({
      searchtext:e.detail.value
    })
    if(this.data.searchtext==''){
      this.getdata();
      this.setData({
        ifSearch:0
      })
    }
  },
  searchClick(){
    if(this.data.searchtext==''){
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    const name=encodeURIComponent(this.data.searchtext)
    wx.request({
      url: `http://localhost:8080/Business/getProductbyname?name=${name}`,
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
      },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            Business:res.data.data,
            ifSearch:1
          })
        }else{
          wx.showToast({
            title: '服务器异常，请稍后重试',
            icon: 'none',
            duration: 2000
          });

          console.log("错误信息:",res.data.data);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        console.log("错误信息:",res.data.data);
      },
    })
  },
  // 点击清除搜索
  clearInput(){
    this.getdata();
    this.setData({
      ifSearch:0,
      searchtext:''
    })
  },
  productClick(e){
    app.globalData.globalproductId=e.currentTarget.dataset.id;
    console.log("e.currentTarget.dataset.id:",e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/Shopping/produectview/productview',
    })
  },
  BusinessClick(e){
    const BusinessId=e.currentTarget.dataset.id;
    wx.request({
      url: 'url',
    })
  },
  // 页面显示获取数据
  getdata(){
    wx.request({
      url: 'http://localhost:8080/Business/getAllBusiness',
      method:'GET',
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'  // 确保接收 JSON 格式的响应 
    },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            Business:res.data.data
          })
          console.log("Business",this.data.Business);
        }else{
          wx.showToast({
            title: '服务器异常，请稍后重试',
            icon: 'none',
            duration: 2000
          });
          console.log("错误信息:",res.data.data);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器异常，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        console.log("错误信息:",res.data.data);
      },
    })
  }

});
