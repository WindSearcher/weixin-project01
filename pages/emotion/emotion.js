const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '心情日记'
      },
      {
        text: '倾听一刻'
      },
      {
        text: '幽默段子'
      },
      {
        text: '星语心愿'
      },
    ],
    currentTab: 0,
    pageSize:5
  },
  //事件处理函数
  onLoad: function () {
    this.showArticle = this.selectComponent("#showArticle");
    console.log("showArticle:"+this.showArticle.data);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  // 触摸开始事件
  touchStart: function (e) {

    // console.log(e)
    this.setData({
      fx: e.changedTouches[0].clientX,
      fy: e.changedTouches[0].clientY
    });
  },
  // 触摸结束事件
  touchEnd: function (e) {

    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    this.getTouchData(this.data.fx, this.data.fy, x, y);
  },

  getTouchData: function (endX, endY, startX, startY) {
    let turn = "";
    if (endX - startX > 80 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
      let currentTab = this.data.currentTab;
      currentTab += 1;
      if(currentTab > 3)
         currentTab = 3;
      this.setData({
        currentTab: currentTab
      })
      console.log("right:" + currentTab);
    } else if (endX - startX < -80 && Math.abs(endY - startY) < 50) {   //左滑
      turn = "left";
      let currentTab = this.data.currentTab;
      currentTab -= 1;

      if (currentTab < 0)
        currentTab = 0;
      this.setData({
        currentTab: currentTab
      })
      console.log("right:" + currentTab);
    }
  },
   
  //上拉加载
  onReachBottom() {
    var that = this;
    let currentTab = this.data.currentTab;
    console.log("currentTab:"+currentTab);
    //这里可以判断是否进行上拉加载，禁止某个子组件上拉刷新
    //这里有个bug,如果我滑到currentTab=3时，会出现不满足第一个条件为真，无需继续
    if (currentTab != 1 && currentTab != 3){
      wx.showLoading({
        title: '正在加载',
      })
         
      this.showArticle.getArticle01()
      wx.hideLoading()
    }
  }
})