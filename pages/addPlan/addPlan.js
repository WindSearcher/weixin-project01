var app = getApp();

Page({

  data: {
    allCompleted: true,
    plan: '',
    plan_item: '',
  },

  getPlan: function(e) {

    this.setData({
      plan: e.detail.value
    })
  },
  planSubmit: function() {
    var that = this
    if (that.data.plan) {
      wx.showLoading({
        title: '添加中',
      })
      wx.getUserInfo({
        success: res => {
          app.ajax.post('/plan/save', {
            nickName: res.userInfo.nickName,
            content: that.data.plan
          }, function(res) {
            wx.showToast({
              title: '添加完成',
              icon: 'success',
              duration: 2000
            })

            wx.hideLoading()
            that.setData({
              plan: ''
            })
            console.log(res.data);
            that.onShow()


          })
        }
      })

    } else {
      wx.showModal({
        title: '计划为空',
        content: '请输入计划',
        showCancel: false,
        confirmText: '重新输入',
        confirmColor: 'skyblue',
      })
    }
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
          console.log(that.data.plan_item)
          console.log(date)
          console.log(res.data);

        })
      }
    })
  },

  filterCompleted: function() {
    var that = this;
    var {
      plan_item,
    } = that.data;
    var remain = plan_item.filter(function(todo) {
      return todo.status == false;
    });

    if (remain.length < plan_item.length) {
      wx.showModal({
        title: '提示',
        content: '显示今天未完成的计划？',
        success: function(res) {
          if (res.confirm) {

            that.setData({
              plan_item: remain
            })
          }
        }
      });
    }
  }
})