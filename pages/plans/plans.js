// pages/plans/plans.js
var app = getApp();
var common = require("../../utils/common.js");
var date = new Date();
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan_item: [],
    selectedDate: '',
    endDate: Y + '-' + M + '-' + D,
    date: Y + '-' + M + '-' + D,
    dateprogress_hidden: true,
    date_progress: 0,
    value: ' ',

  },
  //这个按钮时按日期查看
  bindDateChange: function(e) {
    var that = this
    that.setData({
      selectedDate: e.detail.value
    })
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/plan/get', {
          nickName: res.userInfo.nickName,
          date: that.data.selectedDate,
        }, function(res) {

          that.setData({
            plan_item: res.data,
            all_plan: that.data.plan_item.length,

          })
          console.log(that.data.hidden)
          console.log(that.data.plan_item)
          console.log(date)
          console.log(res.data);

        })
      }
    })

  },
  //跳转到计划删除页面
  toDeletePage: function() {
    var that = this
    var date = that.data.selectedDate
    wx.setStorageSync("selectedDate", date)
    wx.navigateTo({
      url: '../deletePlan/deletePlan',
    })
  },
  //跳转到计划修改页面
  toAlterPage: function() {
    var that = this
    if (that.data.selectedDate != common.getDate()) {
      wx.showModal({
        title: '无法操作',
        content: '不能修改不是当前日期的计划',
        showCancel: false,
        confirmText: "好吧",
        confirmColor: "#8fe34d"
      })
    } else {
      var date = that.data.selectedDate
      wx.setStorageSync("selectedDate", date)
      wx.navigateTo({
        url: '../alterPlan/alterPlan',
      })
    }

  },
  //查看进度
  seeProgress: function() {
    var that = this
    var date = that.data.selectedDate
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/progress/get', {
          nickName: res.userInfo.nickName,
          date: date
        }, function(res) {
          if (res.data) {
            that.setData({
              value: res.data.value
            })
            let split = new Array();
            split = that.data.value.split("/");
            let molecular = split[0];
            let denominator = split[1];
            let a = parseFloat(molecular);
            let b = parseFloat(denominator);
            let pro = (a / b).toFixed(2) * 100 +'%'
            that.setData({
              date_progress: pro
            })
          }
        })
      }
    })
    this.setData({
      dateprogress_hidden: !this.data.dateprogress_hidden
    })
  },
  confirm: function() {
    this.setData({
      dateprogress_hidden: !this.data.dateprogress_hidden
    })
  },
  //改变计划的状态
  changeStatus: function(e) {
    var that = this;
    app.ajax.post('/plan/update', {
      id: e.target.dataset.id
    }, function(res) {
      console.log(res)
    })
  },
  onLoad: function() {
    var that = this
    that.setData({
      selectedDate: that.data.date
    })
  },
  onShow: function() {
    var that = this
    var date = that.data.selectedDate
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/plan/get', {
          nickName: res.userInfo.nickName,
          date: date,
        }, function(res) {
          that.setData({
            plan_item: res.data,
            all_plan: that.data.plan_item.length,
          })
          console.log(that.data.plan_item)
          console.log(date)
          console.log(res.data);

        })
      }
    })

  },

  //返回键
  search: function() {
    wx.navigateBack({
      url: '../index/index'
    })
  }
})