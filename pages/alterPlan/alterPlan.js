var app = getApp();
var common = require("../../utils/common.js");
var date = new Date();
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
Page({
  data: {
    plan_item: '',
    date: common.getDate(),
    selectedDate: '',
    disabled: 'disabled',
    alterplan: ''
  },
  //获取所选日期计划
  onShow: function() {
    var that = this
    var date = wx.getStorageSync("selectedDate")
    that.setData({
      selectedDate: date
    })
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/plan/get', {
          nickName: res.userInfo.nickName,
          date: date,
        }, function(res) {
          that.setData({
            plan_item: res.data,
          })
        })
      }
    })
  },
  //选择日期
  bindDateChange: function(e) {
    var that = this
    that.setData({
      selectedDate: e.detail.value
    })
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/plan/get', {
          nickName: res.userInfo.nickName,
          date: this.data.selectedDate,
        }, function(res) {
          that.setData({
            plan_item: res.data,
          })
        })
      }
    })
  },
  //获取修改后内容的值
  getplan: function(e) {
    var that = this
    that.setData({
      alterplan: e.detail.value
    })
  },
  //修改计划
  alterPlan: function(e) {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/plan/updateContent', {
          content: that.data.alterplan,
          id: e.target.dataset.id
        }, function(res) {
          wx.showToast({
            title: '修改成功',
            icon:'success',
            duration: 2000
          })
          wx.navigateBack({
          })
        })
      }
    })
  },
})