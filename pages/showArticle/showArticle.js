
const app = getApp()



Component({

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("dairy")
      this.getArticle()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  pageLifetimes: {
    show: function () {
      this.getArticle()
    },
    hide: function () {
      // 页面被隐藏
    }
  },

  data: {
    // 这里是一些组件内部数据
      currentPage: 1,
      pageSize: 5,
      diaryList: [],
      hasData: false
  },

  methods: {
    
    getArticle01() {
      let that = this
      console.log('我被调用了')
      that.setData({
        currentPage: this.data.currentPage + 1
      })
      wx.getUserInfo({
        success: res => {
          app.ajax.post('/diary/get', {
            nickName: res.userInfo.nickName,
            start: that.data.currentPage,
            size: that.data.pageSize
          }, function (res) {
            console.log(res.data);
            // 如果返回的结果集为空
            if (that.data.diaryList != null && (res.data.length === 0)) {
              wx.showToast({
                title: '没有更多数据啦',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                hasData: true
              })
            } else { // 返回的结果不为空，则将两个数组连接起来
              console.log(res.data);
              let diaryList = res.data;
              for (let i = 0; i < diaryList.length; ++i) {
                diaryList[i].content = diaryList[i].content.substring(0, 30);
              }
              that.setData({
                diaryList: that.data.diaryList.concat(diaryList)
              })
            }
          })
        }
      })
    },

    getArticle() {
      var that = this;
      wx.getUserInfo({
        success: res => {
          app.ajax.post('/diary/get', {
            nickName: res.userInfo.nickName,
            start: that.data.currentPage,
            size: that.data.pageSize
          }, function (res) {

            let diaryList = res.data;
            for (let i = 0; i < diaryList.length; ++i) {
              diaryList[i].content = diaryList[i].content.substring(0, 30);
            }

            that.setData({
              diaryList: diaryList
            })
          })
        }
      })


    },

    addArticle: function () {
      wx.navigateTo({
        url: '/pages/addArticle/addArticle',
      })
    },

    showDetail: function (e) {
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../detailArticle/detailArticle?id = ' + id,
      })
    },

    //上拉加载
    onReachBottom() {
      this.getArticle01()
      wx.showLoading({
        title: '正在加载',
      })
      wx.hideLoading()
    }
  }

})

