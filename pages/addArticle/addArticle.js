// pages/addArticle/addArticle.js

var common = require("../../utils/common.js");
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    src: "../../images/sun.png",
    height:500,
    width:320,
    title:'',
    img_src:'',
    content:'',
    chooseImgSrc:'',
    first:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    let temp = common.getDate();
    this.setData({
      time: temp,
    })

    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },


  publish: function() {
    var that = this;
    let title = this.data.title;
    let content = this.data.content;
    if (content == "") {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000,
      })
    }

    if (title == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000,
      })
    }
    
    if (content != "") {
      let title = this.data.title;
      let content = this.data.content;
      wx.showLoading({
        title: '发布中',
      })
      /*请求request,*/
      wx.uploadFile({
        url: 'https://www.jie12366.xyz:88/diary/save',
        filePath: that.data.chooseImgSrc[0],
        name: 'image',
        formData: {
          nickName: app.globalData.userInfo.nickName,
          time: that.data.time,
          title: that.data.title,
          content: that.data.content,
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '发布成功',
          })
          wx.hideLoading()
          wx.navigateBack({

          })
        }

      })
    }
    
  },

  getTitle: function(e) {
    this.setData({
      title : e.detail.value
    })
  },

  getContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  chooseImg: function() {
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          chooseImgSrc: tempFilePaths,
          first:false,
        })
        console.log("tempFilePaths:" + that.data.chooseImgSrc);
      },
    })  
  },
  

  onShareAppMessage: function () {

  },

 

  onShow: function(e) {
    var that = this; //动态获取屏幕尺寸 
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth,
        })
      },

    })
  },

})