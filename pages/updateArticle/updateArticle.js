// pages/addArticle/addArticle.js

var common = require("../../utils/common.js");
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    title:'',
    id: 0,
    src: "../../images/sun.png",
    height: 500,
    width: 320,
    first: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    let time = common.getDate();

    this.setData({
      id: options.id,
      time:time
    })
    app.ajax.post('/diary/getOne', {
      id: that.data.id
    }, function(res) {
      that.setData({
        diary: res.data,
        chooseImgSrc: res.data.photo,
        title:res.data.title,
        content1:res.data.content
      })
    })

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

  getTitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },

  getContent: function(e) {
    var that = this
    that.setData({
      content1: e.detail.value
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
          chooseImgSrc: tempFilePaths[0],
          first: false,
        })
        console.log("tempFilePaths:" + that.data.chooseImgSrc);
      },
    })
  },

  updateDiary: function() {

    var that = this
    var content = that.data.content1
    if (content == "") {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000,
      })
    }

    if (content != "") {
      wx.showLoading({
        title: '修改中',
      })
      //如果没有更改图片
      if (that.data.chooseImgSrc.substring(7, 10) == 'cdn') {
        app.ajax.post('/diary/update2', {
          image: that.data.chooseImgSrc,
          id: that.data.id, 
          title: that.data.title,
          content: that.data.content1,
          time: that.data.time,
        }, function(res) {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            icon: 'success',
            title: '修改成功',
          })
          
          wx.navigateBack({})
        })
      } 
      //如果修改了图片
      else {
        console.log(that.data)
        wx.uploadFile({
          url: 'https://www.jie12366.xyz:88/diary/update1',
          filePath: that.data.chooseImgSrc,
          
          name: 'image',
          formData: {
            id: that.data.id,
            time: that.data.time,
            title: that.data.title,
            content: that.data.content1,
          },
          success: function(res) {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              icon: 'success',
              title: '修改成功',
            })
            
            wx.navigateBack({

            })
          }
        })
      }
    }

  },
})