var app = getApp();

Page({

  data: {
    plan: ''
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
})