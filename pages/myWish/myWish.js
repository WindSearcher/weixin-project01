// pages/myWish/myWish.js
const app = getApp()

//个人愿望展示
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    color: ["pink", "orange", "yellow", "aqua"],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wishList: [{
      imgSrc: "",
      time: "",
      content: '',
      //backgroundColor: 'pink',
    }],
    pageCurrent: 1,
    pageSize: 4,
    previous: false
    
    
  },

  onShow() {
    this.getWish();
    if (this.data.pageCurrent > 1) {
      this.setData({
        previous: true
      })
    } else {
      this.setData({
        previous: false
      })
    }
  },

  getWish() {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/wish/get', {
          nickName: res.userInfo.nickName,
          start: that.data.pageCurrent,
          size: that.data.pageSize
        }, function(res) {
          if (res.data.length == 0) {
            wx.showToast({
              title: '没有更多数据啦',
              icon: 'none',
              duration: 1000
            })
          } else {
            that.setData({
              wishList: res.data
            })
          }
        })
      }
    })
  },

  addWish: function() {
    wx.navigateTo({
      url: '/pages/addWish/addWish',
    })
  },

  deleteWish: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
          })
          app.ajax.post('/wish/delete', {
            id: id
          }, function (res) {
            wx.hideLoading()
            that.getWish();
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:1000
            })
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消删除',
            icon:'none',
            duration:1000
          })
        }
      }
    })
  },

  previous() {
    var that = this
    var page = that.data.pageCurrent - 1
    that.setData({
      pageCurrent: page
    })
    if (this.data.pageCurrent > 1) {
      this.setData({
        previous: true
      })
    } else {
      this.setData({
        previous: false
      })
    }
    this.getWish();
  },

  next: function() {
    var that = this
    var page = that.data.pageCurrent + 1
    that.setData({
      pageCurrent: page
    })
    if (this.data.pageCurrent > 1) {
      this.setData({
        previous: true
      })
    } else {
      this.setData({
        previous: false
      })
    }
    this.getWish();
  },

  toDetail: function(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/wishDetail/wishDetail?id=' + id,
    })
  }
})


