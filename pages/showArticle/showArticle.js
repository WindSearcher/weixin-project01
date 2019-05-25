// pages/showArticle/showArticle.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaryList:'',
  },

  onShow: function() {
    this.getArticle();
  },

  onLoad: function(options) {
   
  },

  getArticle() {
    /**
     * &photo={{item.photo}}&title={{item.title}}&content={{item.content}}&time={{item.time}}&sentiment={{item.sentiment}}
     */
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/diary/get', {
          nickName: res.userInfo.nickName,
          start:1,
          size:10
        }, function(res) {
          console.log(res.data);
          that.setData({
            diaryList: res.data,
          })
          
          let diaryList = that.data.diaryList;
          console.log("hello:" + diaryList);
          for (let i = 0; i < diaryList.length; ++i) {
            console.log("content:" + diaryList[i].content);
            diaryList[i].content = diaryList[i].content.substring(0, 15);
            console.log("content substring:" + diaryList[i].content);
          }
        })
      }
    })
    
    
  },

  addArticle: function() {
    wx.navigateTo({
      url: '/pages/addArticle/addArticle',
    })
  },

  showDetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detailArticle/detailArticle?id = ' + id,
    })
  }
})