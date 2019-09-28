// pages/wishDetail/wishDetail.js

var app = getApp()
var showTime = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    pageSize: 5,
    hasData: false,
    hiddenmodalput: true,
    message: '',
    rNickname: ''
  },

  onLoad: function(options) {
    var that = this
    that.setData({
      id: options.id
    })
  },

  onShow() {
    this.getWish()
    this.onFresh()
  },

  getWish() {
    var that = this

    app.ajax.post('/wish/getOne', {
      id: that.data.id
    }, function(res) {
      console.log(res.data)
      that.setData({
        wish: res.data
      })
    })
  },

  formSubmit: function(e) {
    var that = this;
    var mess = this.data.message;
    if (mess == '') {
      wx.showToast({
        title: '留言不能为空',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.showLoading({
      title: '正在留言',
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              app.ajax.post('/message/save', {
                wishId: that.data.id,
                mess,
                nickName: res.userInfo.nickName,
                rNickname: that.data.rNickname,
                avatarUrl: res.userInfo.avatarUrl
              }, function(res) {
                that.setData({
                  re: res.data,
                })
                wx.showToast({
                  title: '发表成功',
                  icon: 'success',
                  time: '1000'
                })
                that.onFresh()
                wx.hideLoading()
                that.setData({
                  hiddenmodalput: true
                })
              })
            }
          })
        }
      }
    })

  },

  cancel () {
    this.setData({
      hiddenmodalput: true
    })
  },

  reply (e) {
    console.log(e.currentTarget.dataset.nickname)
    this.setData({
      hiddenmodalput: false,
      rNickname: e.currentTarget.dataset.nickname
    })
  },

  getLiuyan (e) {
    this.setData({
      message: e.detail.value
    })
  },

  onFresh: function() {
    var that = this
    app.ajax.post('/message/get', {
      wishId: that.data.id,
      start: that.data.currentPage,
      size: that.data.pageSize
    }, function(res) {
      if (that.data.liuyanlist != null && (that.data.liuyanlist.length == res.data.length)) {
        that.setData({
          hasData: true
        })
      } else {
        let list = res.data
        console.log(list)
        for (var i = 0; i < list.length;i++){
          list[i].date = showTime.showTime(list[i].date)
        }
        that.setData({
          liuyanlist: list,
        })
      }
    })
  },

  onReachBottom() {
    var that = this
    var pageSize = that.data.pageSize + 5
    that.setData({
      pageSize: pageSize
    })
    wx.showLoading({
      title: '加载中',
    })
    that.onFresh()
    wx.hideLoading()
  }

})