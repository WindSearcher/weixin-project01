// pages/wishWall/wishWall.js
const app = getApp()

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
    }]
  },

  onShow() {
    this.getWish();
  },
 
  getWish() {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/wish/getLimit', {
          
        }, function (res) {
          that.setData({
            wishList: res.data
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,

          })
        }
      })
    }

    console.log("image:" + this.data.userInfo.avatarUrl);
  },


  addWish: function() {
    wx.navigateTo({
      url: '/pages/addWish/addWish',
    })
  },

  switch_next:function(){
    this.getWish();
  },

  toDetail:function(e){
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/wishDetail/wishDetail?id=' + id,
    })
  }
})