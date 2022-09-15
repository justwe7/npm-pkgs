Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    },
    modalMsg: {
      type: String,
      value: ' '
    }
  },
  data: {
    showPanel: false,
    // 这里是一些组件内部数据
    networkRecords: [],
    expandGroupIndex: []
  },
  lifetimes: {
    attached: function() {
      setTimeout(() => {
        this.setData({
          networkRecords: wx.jwRequestRecords
        })
        wx.jwBus.$on('request', (item) => {
          // const records = this.data.networkRecords.slice(0)
          // console.log(99999999, records)
          // records.push(item)
          this.setData({
            networkRecords: wx.jwRequestRecords
          })
        })
      }, 0)
    }
  },
  methods: {
    handleClickItem (ev) {
      const index = ev.currentTarget.dataset.index
      this.setData({
        [`networkRecords[${index}].showDetail`]: !this.data.networkRecords[index].showDetail
      })
      console.log(ev.currentTarget.dataset.index)
      // this.setData({ showPanel: !this.data.showPanel })
    }
    // 这里放置自定义方法
    // modal_click_Hidden: function () {
    //   this.setData({
    //     modalHidden: true
    //   })
    // },
    // // 确定
    // Sure: function () {
    //   console.log(this.data.text)
    // }
  }
})
