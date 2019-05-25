// pages/emotion/emotion.js
const API_URL = 'https://c.y.qq.com'
var common = require("../../utils/common.js");
const app = getApp();

Page({
  data: {
    src: "../../images/sun.png",
    msg: "你在的地方一定是晴天吧",
    music: {},
    emotion_value: 100,
    imgUrls1: 'http://img1.imgtn.bdimg.com/it/u=77561103,2816134510&fm=26&gp=0.jpg',

    imgUrls2: 'http://img3.imgtn.bdimg.com/it/u=3449317484,1628858579&fm=15&gp=0.jpg',

    imgUrls3: 'http://img0.imgtn.bdimg.com/it/u=3691619425,2165126769&fm=200&gp=0.jpg',

    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    time:'',
  },

  onLoad:function(){
    this.setData({
      time: common.getDate()
    })
    app.globalData.time = this.data.time;
    this.getData();
  },

  getDairyList: function () {
    wx.navigateTo({
      url: '/pages/showArticle/showArticle',
    })
  },

  getMusicList: function() {
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },

  getWishList: function() {
    wx.navigateTo({
      url: '/pages/wishWall/wishWall',
    })
  },

  //获取数据
  getData: function () {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/sentiment/get', {
          nickName: res.userInfo.nickName,
          time: app.globalData.time
        }, function (result) {
          that.setData({
            sentiment: result.data.sentiment
          })
          console.log(result);
          let emotion_value = 0;
          let sentiment = that.data.sentiment;
          let emotion_number = 0;
          console.log("sentiment:" + sentiment.length);

          for(let i = 0;i < sentiment.length;++i){
            if (sentiment[i] != 0){
              emotion_value += sentiment[i];
              emotion_number++;
            }
            console.log("sentiment[]:" + sentiment[i]);
          }

          if (emotion_number != 0)
              emotion_value /= emotion_number;
          //将其转化为整型 
          emotion_value = parseInt(emotion_value);

          if(emotion_value == 0){
            //表明七天之内并没有发表日记，所以情绪值获取均为0
             emotion_value = 100;
          }
          
          that.setData({
            emotion_value: emotion_value,
          })
        })
      }
    })
  },
})