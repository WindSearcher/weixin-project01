// pages/setting/setting/feedback/feedback.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getFeedback(e){
    let content = e.detail.value;
    this.setData({
      content: content,
    })
  },

  submit(){
    var that = this
    wx.showLoading({
      title: '提交中',
    })
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/feedback/save', {
          nickName: res.userInfo.nickName,
          content: that.data.content,
        }, function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          var timeout = setTimeout(function () {
            wx.navigateBack()
          }, 1000)
        })
      }
    })
  }
})