// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //状态管理
  toState(){
    wx.navigateTo({
      url: '/pages/state/index',
    })
  },

  //我的计划
  toPlans() {
    wx.navigateTo({
      url: '/pages/plans/plans',
    })
  },

  //我的日记
  toArticles() {
    wx.navigateTo({
      url: '/pages/showArticle/showArticle',
    })
  },

  //我的愿望
  toWishs() {
    wx.navigateTo({
      url: '/pages/myWish/myWish',
    })
  },

  //设置页面
  toSetting(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  }
})