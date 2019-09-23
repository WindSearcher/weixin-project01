// pages/wishWall/wishWall.js
const app = getApp()

Component({

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

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("wish");
      this.getWish();
     
    },
    moved: function () { },
    detached: function () { },
  },
  
  methods:{
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
    

    //添加愿望页面
    addWish: function () {
      wx.navigateTo({
        url: '/pages/addWish/addWish',
      })
    },

    //切换
    switch_next: function () {
      this.getWish();
    },

    //查看留言和评论等细节
    toDetail: function (e) {
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '/pages/wishDetail/wishDetail?id=' + id,
      })
    }
  }

})

