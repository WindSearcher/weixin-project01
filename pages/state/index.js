import * as echarts from '../../ec-canvas/echarts';
var common = require("../../utils/common.js");

const app = getApp();
let time = ""

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  return chart;
}

let date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];

//获取年
for (let i = 2019; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}

//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}

Page({
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    time: '',
    multiArray: [years, months, days],
    multiIndex: [date.getFullYear(), date.getMonth(), date.getDate() - 1],
    choose_year: '',
  },
  onLoad: function() {
    //设置默认的年份
    this.setData({
      choose_year: common.getDate(),
      time: common.getDate()
    })
    console.log(date.getMonth)
    app.globalData.time = this.data.time
    this.echartsComponnet = this.selectComponent('#mychart-dom-line');
    console.log("time:" + this.data.time);
    this.getData();
  },

  //获取数据
  getData: function() {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.ajax.post('/sentiment/get', {
          nickName: res.userInfo.nickName,
          time: app.globalData.time
        }, function(result) {

          that.setData({
            date: result.data.date,
            sentiment: result.data.sentiment
          })
          that.init_echarts(); //初始化图表
        })
      }
    })
  },

  //初始化图表
  init_echarts: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  //设置potion
  getOption: function() {
    var option = {
      title: {
        text: '一周情绪值波动图',
        left: 'center'
      },
      color: "#37A2DA",
      legend: {
        top: 50,
        left: 'center',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data.date
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        type: 'line',
        data: this.data.sentiment
      }]
    };
    return option;
  },


  //获取时间日期
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day
    })
    app.globalData.time = this.data.time
    this.getData()
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
});