//index.js
var app = getApp();
var common = require("../../utils/common.js");
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
var uplan = new Array()
Page({
  data: {
    time: "",
    dayTime: '',
    pro_hidden: true,
    words_hidden: true,
    nullPlan: true,
    progress: 0,
    message: '',
    value: '',
    marqueePace: 1,
    marqueeDistance: 0,
    size: 16,
    orientation: 'left',
    interval: 20,
    colorArr: [
      "#E9967A", " #7B68EE#", "68A2D5", "#4876FF",
      "#FF69B4", "#DB7093", "#CD3278", "#48D1CC",
      "#483D8B", "#8A2BE2", "#32CD32", "#B03060"
    ],
    imgUrls: [
      "../../images/news1.png",
      "../../images/news2.jpg",
      "../../images/news3.jpg"
    ],
    messgaeList: [
      "生命就像大海，如果没有狂风暴雨的袭击，生命就显得枯燥乏味。",

      "你不能决定生命的长短，但你可以控制它的质量；你不能左右天气，但你可以改变心情；你不能改变容貌，但你可以展现笑容；你不能控制他人，但你可以掌握自己；你不能预知明天，但你可以掌握今天；你不能样样胜利，但你可以事事尽心",

      "我们应有恒心，尤其要有自信心。未来　在我们的手中，我们要做最精彩的一代。",
      "知识好比浩浩荡荡、奔流不息的江河，它是由无数涓涓小流汇成的，它有源头，却没有终点。",
      "五彩缤纷的青春啊，多留一些温馨与美丽给人生的暮年去回味吧？",

      "生命中的快乐如蓝天浓云，空谷幽兰，是人性中最美最真实的部分。",

      "青春是人生中最美丽的时候。如果，你好好把握，那前途将是一片光明：如果你浪费了它，那你将后悔莫及。",

      "生命如雨，看似美丽，但更多时候，你得忍受那些寒冷和潮湿。",

      "不是因为有些事情难以做到而失去自信，而是因为失去自信，有些事情才难以做到。自信的价值无法估计。",

      "青春时代是一个短暂的美梦，当你醒来时，它早已消失得无影无踪了。",

      "生活中需要强者，我就是那个强者。弱者等待时机，而强者创造时机。"
    ]
  },

  onLoad: function(options) {
    var vm = this;
    let messageArr = vm.data.messgaeList;
    let len = messageArr.length
    let random = messageArr[Math.floor(Math.random() * len)];
    vm.setData({
      time: Y + '-' + M + '-' + D + '-' + show_day[date.getDay()],
      message: random
    })
    var length = vm.data.message.length * vm.data.size;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    vm.setData({
      length: length,
      windowWidth: windowWidth,
    });
    vm.run();
  },
  confirm: function() {
    this.setData({
      pro_hidden: !this.data.pro_hidden
    })
  },
  cancel: function() {
    this.setData({
      nullPlan: !this.data.nullPlan
    })
  },
  show_words: function() {
    this.setData({
      words_hidden: !this.data.words_hidden
    })
  },
  seeOver: function() {
    this.setData({
      words_hidden: !this.data.words_hidden
    })
  },
  addPlan: function() {
    wx.navigateTo({
      url: '../addPlan/addPlan',
    })
  },
  add: function() {
    wx.navigateTo({
      url: '../addPlan/addPlan',
    })
    this.setData({
      nullPlan: !this.data.nullPlan
    })
  },

  plan: function() {
    wx.navigateTo({
      url: '../plans/plans',
    })
  },
  onShow: function() {
    var that = this;
    var date = common.getDate();
    console.log(date);
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/progress/get', {
          nickName: res.userInfo.nickName,
          date: date
        }, function(res) {
          if (res.data) {
            that.setData({
              value: res.data.value
            })
            let split = new Array();
            split = that.data.value.split("/");
            let molecular = split[0];
            let denominator = split[1];
            let a = parseFloat(molecular);
            let b = parseFloat(denominator);
            that.setData({
              progress: (a / b) * 100 + '%'
            })
          }
        })
      }
    })
  },
  showplan: function() {
    wx.navigateTo({
      url: '../plans/plans',
    })
  },
  seeProgress: function() {
    var that = this
    that.setData({
      pro_hidden: !that.data.pro_hidden,
    })
    var cxt_arc = wx.createCanvasContext('canvasArc')
    cxt_arc.setLineWidth(10);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();
    cxt_arc.arc(105, 60, 50, 0, 2 * Math.PI, false);
    cxt_arc.stroke();

    cxt_arc.setLineWidth(10);
    cxt_arc.setStrokeStyle('#3ea6ff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();
    cxt_arc.arc(105, 60, 50, -Math.PI * 1 / 2, 2 * Math.PI * that.data.progress - Math.PI * 1 / 2, false);
    cxt_arc.stroke();
    cxt_arc.draw();

  },
  run: function() {
    var vm = this;
    let colorArr = vm.data.colorArr
    let colorLen = colorArr.length
    let random = colorArr[Math.floor(Math.random() * colorLen)];
    vm.setData({
      randomcolor: random
    });
    var interval = setInterval(function() {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run();
      }
    }, vm.data.interval);
  }
})