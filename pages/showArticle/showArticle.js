
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
 

  data: {
    // 这里是一些组件内部数据
      currentPage: 1,
      pageSize: 5,
      diaryList: [],
      hasData: false
  },

  methods: {
    
    getArticle01() {
      var that = this;
      let currentPage = that.data.currentPage+1;
      let pageSize = 5;
     
      this.setData({
        start:currentPage
      })
      wx.getUserInfo({
        success: res => {
          app.ajax.post('/diary/get', {
            nickName: res.userInfo.nickName,
            start: that.data.currentPage,
            size: pageSize
          }, function (res) {

            if (that.data.diaryList != null && (that.data.diaryList.length == res.data.length)) {
              wx.showToast({
                title: '没有更多数据啦',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                hasData: true
              })
            }


            console.log(res.data); 
            that.setData({
              diaryList: res.data,
            })

            let diaryList = that.data.diaryList;
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


    getArticle() {
      var that = this;
      wx.getUserInfo({
        success: res => {
          app.ajax.post('/diary/get', {
            nickName: res.userInfo.nickName,
            start: that.data.currentPage,
            size: that.data.pageSize
          }, function (res) {

            if (that.data.diaryList != null && (that.data.diaryList.length == res.data.length)) {
              wx.showToast({
                title: '没有更多数据啦',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                hasData: true
              })
            }

            that.setData({
              diaryList: res.data,
            })

            let diaryList = that.data.diaryList;
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
      var that = this

      wx.showLoading({
        title: '正在加载',
      })
      
      
      that.getArticle()
      wx.hideLoading()
    }
  }

})

