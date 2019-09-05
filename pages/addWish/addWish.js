// pages/addWish/addWish.js
var common = require("../../utils/common.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    avatarUrl: '',
    userName: '',
    time: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  submit: function() {
    var that = this;
    that.setData({
      time: common.getDateActually(),
    })

    if (that.data.content != "") {
      let len = parseInt(that.data.content.length);
      console.log("len:" + len);
      if (len <= 50) {
        wx.showLoading({
          title: '许愿中',
        })
        wx.getUserInfo({
          success: res => {
            app.ajax.post('/wish/save', {
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
              time: that.data.time,
              content: that.data.content,
            }, function(res) {
              wx.showToast({
                title: '许愿完成',
                icon: 'success',
                duration: 2000
              })
              wx.hideLoading()
              var timeout = setTimeout(function() {
                wx.navigateBack()
              }, 1000)
            })
          }
        })
      } else {
        wx.showModal({
          title: '请重新编辑',
          content: '许愿长度过长，应限制在50个字符以内',
          showCancel: false,
          confirmText: '重新编辑',
          confirmColor: 'skyblue',
        })
      }
    } else {
      wx.showModal({
        title: '许愿为空',
        content: '请输入计划',
        showCancel: false,
        confirmText: '重新输入',
        confirmColor: 'skyblue',
      })
    }
  },


  getContent: function(e) {
    let content = e.detail.value;
    this.setData({
      content: content,
    })
    //console.log("content:"+content);
  },

  onShareAppMessage: function() {

  }
})