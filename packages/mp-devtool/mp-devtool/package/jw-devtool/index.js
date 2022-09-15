// index.js
let startX = 0 // 获取手指初始坐标
let startY = 0
let x = 0 // 获得盒子原来的位置
let y = 0
let cSys = {} // 当前系统配置
let btnsRect = [] // 拖拽元素宽高
let defaultH = 70 // 缺省高度
let defaultW = 20 // 缺省宽度

Component({
  data: {
    visablePanel: false,
    text: '',
    top: 0,
    left: 0,
  },
  lifetimes: {
    ready: function () {
      const query = wx.createSelectorQuery().in(this)
      query.select('#button').boundingClientRect(res => {
        cSys = wx.getSystemInfoSync()
        btnsRect = [res.width, res.height]
        const top = Math.floor(cSys.windowHeight - btnsRect[1] - defaultH)
        const left = Math.floor(cSys.windowWidth - btnsRect[0] - defaultW)
        this.setData({
          top,
          left
        })
      }).exec();
    },
  },
  methods: {
    onTouchStart (e) {
      // 获取手指初始坐标
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
      x = e.currentTarget.offsetLeft;
      y = e.currentTarget.offsetTop;
    },
    onTouchmove (e) {
      // 计算手指的移动距离：手指移动之后的坐标减去手指初始的坐标
      const moveX = e.changedTouches[0].pageX - startX;
      const moveY = e.changedTouches[0].pageY - startY;
      // 移动盒子 盒子原来的位置 + 手指移动的距离
      const top = Math.floor(Math.min(Math.max(0, y + moveY), cSys.windowHeight - btnsRect[1]))
      const left = Math.floor(Math.min(Math.max(0, x + moveX), cSys.windowWidth - btnsRect[0]))
      this.setData({
        top,
        left
      })
    },
    onTouchEnd (e) {
      wx.setStorageSync('jw_pos', {
        t: this.data.top, 
        l: this.data.left
      })
    },
    handleClearHistory () {
      wx.jwBus.$emit('clearRecord')
    },
    handleTogglePanel () {
      this.setData({ visablePanel: !this.data.visablePanel })
    }
  }
})
