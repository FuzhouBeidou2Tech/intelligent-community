Page({
  data: {
    noticeType: '', // 通知类型
    title: '', // 标题
    content: '', // 内容
    images: [], // 存储选择的图片路径
  },

  // 返回到上一页
  goBack() {
    wx.navigateBack();
  },

  // 选择通知类型
  selectNoticeType() {
    wx.showActionSheet({
      itemList: ['通知类型1', '通知类型2', '通知类型3'], // 选择项
      success: (res) => {
        if (res.cancel) {
          // 用户点击了取消
          console.log('用户点击取消');
        } else {
          // 设置选择的通知类型
          this.setData({ noticeType: ['通知类型1', '通知类型2', '通知类型3'][res.tapIndex] });
        }
      },
      fail: (err) => {
        console.error('选择通知类型失败', err);
      },
    });
  },

  // 标题输入事件
  onTitleInput(event) {
    this.setData({ title: event.detail.value });
  },

  // 内容输入事件
  onContentInput(event) {
    this.setData({ content: event.detail.value });
  },

  // 选择图片
  chooseImage() {
    const maxImages = 6;
    if (this.data.images.length >= maxImages) {
      wx.showToast({
        title: '最多只能上传6张图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    // 调用 wx.chooseImage 选择图片
    wx.chooseMedia({
      count: 6, // 允许选择的媒体数量
      mediaType: ['image'], // 仅选择图片
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      success: (res) => {
          // 获取选中的图片路径
          const tempFilePaths = res.tempFiles.map(file => file.tempFilePath);
          // 将图片路径存储到data中
          this.setData({
              images: this.data.images.concat(tempFilePaths)
          });
      },
      fail: (err) => {
          console.error('选择图片失败', err);
      }
  });
  }, 
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    let images = this.data.images;
    images.splice(index, 1); // 删除数组中对应的图片
    this.setData({
      images: images
    });
  },

  

  // 提交表单
  submitForm() {
    const { noticeType, title, content } = this.data;

    if (!noticeType || !title || !content) {
      wx.showToast({
        title: '请填写完整内容',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    wx.request({
      url: 'https://your-server-url.com/url/add/image', // 替换为你的后端接口地址
      method: 'POST',
      data: {
        noticeType,
        title,
        content,
      },
      success(res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        });
      },
      fail(err) {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },
});