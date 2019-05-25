// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  aboutMe(){
    wx.navigateTo({
      url: 'setting/about/about',
    })
  },

  feedback() {
    wx.navigateTo({
      url: 'setting/feedback/feedback',
    })
  },

  privacy() {
    wx.navigateTo({
      url: 'setting/privacy/privacy',
    })
  }
})