// 笑话API
const http = 'http://v.juhe.cn/joke/content/list.php'

Component({

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("hello joke")
      this.getJokeList();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  data:{
    page: 1,
    key: '782560f4a0b861a626857ea9671fc4ba',
    pageSize: 20,
    hasData: false,
    jokeList: []
  },

  methods:{
    getJokeList: function () {
      var that = this;
      let date = new Date();
      let time = date.getTime();
      time = time.toString().slice(0, 10);
      console.log(time);
      wx.request({
        url: http, //仅为示例，并非真实的接口地址
        data: {
          page: that.data.page,
          sort: 'desc',
          pageSize: that.data.pageSize,
          time: time,
          key: that.data.key
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          let jokeList = res.data.result.data;
          jokeList = that.data.jokeList.concat(jokeList);
          that.setData({
            jokeList: jokeList
          })
          console.log(that.data.jokeList);
          wx.hideLoading();
        }
      })
    },
  },


  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {

    wx.showLoading({
      title: '加载中',
    })

    this.getJokeList();
  }
})

