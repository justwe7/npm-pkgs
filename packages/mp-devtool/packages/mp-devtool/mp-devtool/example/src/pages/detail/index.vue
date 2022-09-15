<template>
  <view class="content">
    详情页
    <div class="f-fz-36 f-blod f-text-center" @click="$location.back()">返回</div>
    <u-button type="primary"
      class="f-mt-40"
      @click="foo"
      text="请求"></u-button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello'
    }
  },
  onLoad () {},
  methods: {
    foo () {
      uni.$get('/api/translate', { wd: '你好', to: 'en' })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.content {
  @extend %clearfix;
}
</style>
