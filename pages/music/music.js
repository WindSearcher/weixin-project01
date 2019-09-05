
const app = getApp()

Component({
  
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("hello music")
      this.getOneMusic()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  data: {
    // 这里是一些组件内部数据
    src: '',
    imgUrl: '',
    name: '',
    progress: 0,
    pauseStatus: true,
    currentPosition: 0,
    pauseStatus: true,
    timer: '',
    duration: 0,
  },

  methods: {
    getOneMusic: function () {
      var that = this
      app.ajax.post('/music/getOne', {}, function (res) {
        that.setData({
          music: res.data,
          src: res.data.src,
          imgUrl: res.data.imgUrl,
          name: res.data.name,
        })
        console.log(res.data);
        console.log(that.data.music.name);
      })
    },

    getOneMusic1: function () {
      var that = this
      app.ajax.post('/music/getOne', {}, function (res) {
        that.setData({
          music: res.data,
          src: res.data.src,
          imgUrl: res.data.imgUrl,
          name: res.data.name,
        })
        that.play();
        console.log(res.data);
        console.log(that.data.music.name);
      })
    },

    bindTapPlay: function () {
      console.log('bindTapPlay')
      console.log(this.data.pauseStatus);
      if (this.data.pauseStatus === true) {
        this.play()
        this.setData({ pauseStatus: false })
      } else {
        wx.pauseBackgroundAudio()
        this.setData({ pauseStatus: true })
      }
    },

    play: function () {
      console.log("play");

      let that = this;
      console.log("name:" + that.data.name);

      wx.playBackgroundAudio({
        dataUrl: that.data.src,
        title: that.data.name,
        coverImgUrl: that.data.imgUrl
      })

      let timer = setInterval(function () {
        that.setDuration(that)
      }, 1000)

      this.setData({
        timer: timer,
      })

    },

    setDuration(that) {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          //console.log(res)
          let { status, duration, currentPosition } = res
          if (status === 1 || status === 0) {
            that.setData({
              currentPosition: that.stotime(currentPosition),
              duration: that.stotime(duration),
              sliderValue: Math.floor(currentPosition * 100 / duration),
            })
            if (currentPosition == duration) {
              console.log("is over");
              that.bindTapNext();
            }

          }
        }
      })
    },

    stotime: function (s) {
      let t = '';
      if (s > -1) {
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec;
      }
      return t;
    },

    bindSliderchange: function (e) {
      // clearInterval(this.data.timer)
      let value = e.detail.value
      let that = this
      console.log("hello:" + e.detail.value)
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          //console.log(res)
          let { status, duration } = res
          if (status === 1 || status === 0) {
            that.setData({
              sliderValue: value
            })

            wx.seekBackgroundAudio({
              position: value * duration / 100,
            })
          }
        }
      })
    },

    bindTapPrev: function () {
      console.log("bindTapPrev");
      this.getOneMusic1();

      wx.seekBackgroundAudio({
        position: 0,
      })

      this.setData({
        progress: 0,
        currentPosition: 0,
        duration: 0,
        sliderValue: 0,
      })
    },

    bindTapNext: function () {
      console.log("bindTapNext");
      this.getOneMusic1();

      wx.seekBackgroundAudio({
        position: 0,
      })

      this.setData({
        progress: 0,
        currentPosition: 0,
        duration: 0,
        sliderValue: 0,
      })
    }
  }
})