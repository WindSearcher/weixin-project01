// pages/detailArticle/detailArticle.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    time: '',
    title: '',
    content: '0',
    sentiment: '',
    photo: '',
    isPreview:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let id = options.id;
    console.log("id:" + id);

    app.ajax.post('/diary/getOne', {
      id: id,
    }, function(res) {
      console.log(res.data);
      that.setData({
        id: id,
        time: res.data.time,
        title: res.data.title,
        content: res.data.content,
        sentiment: res.data.sentiment,
        photo: res.data.photo,
      })
    })

  },

  previewPhoto() {
    var that = this
    that.setData({
      isPreview:true
    })
  },

  backDetail(){
    var that = this
    that.setData({
      isPreview: false
    })
  },

  updateDiary: function() {
    let id = this.data.id;

    wx.redirectTo({
      url: '../updateArticle/updateArticle?id=' + id
    })
  },

  deleteDiary: function() {
    var that = this;
    let id = this.data.id;
    console.log("id:" + id);

    app.ajax.post('/diary/delete', {
      id: id,
    }, function(res) {
      console.log(res.data);
      wx.navigateBack();
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})