// pages/wishDetail/wishDetail.js

var app = getApp()

Page({

        /**
         * 页面的初始数据
         */
        data: {
                currentPage: 1,
                pageSize: 5,
                hasData: false
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
                var mess = e.detail.value.liuyantext; //获取表单所有name=liuyantext的值 
                if (mess == '') {
                        wx.showToast({
                                title: '留言不能为空',
                                duration:1500
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
                                                                avatarUrl: res.userInfo.avatarUrl
                                                        }, function(res) {
                                                                that.setData({
                                                                        re: res.data,
                                                                })
                                                                wx.showToast({
                                                                        title: '已留言',
                                                                        icon: 'success',
                                                                        time: '2000'
                                                                })
                                                                wx.hideLoading()
                                                                that.onFresh()
                                                        })
                                                }
                                        })
                                }
                        }
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
                                wx.showToast({
                                        title: '没有更多数据啦',
                                        icon: 'none',
                                        duration: 1000
                                })
                                that.setData({
                                        hasData: true
                                })
                        } else {
                                that.setData({
                                        liuyanlist: res.data,
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