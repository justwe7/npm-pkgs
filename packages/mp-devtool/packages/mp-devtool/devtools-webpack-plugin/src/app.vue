<template>
  <aside v-if="!isHide" class="jw-devtool-box" :class="{ 'z-modal': isShowModal }" @click="handleClickIcon">
    <svg v-show="!isShowModal" t="1662369933997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2456" width="30" height="30"><path d="M128 130.133333c-26.410667 26.965333-42.666667 63.829333-42.666667 104.533334v469.333333A149.333333 149.333333 0 0 0 234.666667 853.333333h299.264c2.176-10.752 6.144-21.333333 11.946666-31.402666l31.146667-53.930667H234.666667A64 64 0 0 1 170.666667 704V298.666667h597.333333v53.504a192.64 192.64 0 0 1 85.333333-10.453334V234.666667c0-40.704-16.256-77.568-42.666666-104.533334V128h-2.133334a148.864 148.864 0 0 0-104.533333-42.666667h-469.333333c-40.704 0-77.568 16.256-104.533334 42.666667H128v2.133333z" p-id="2457" fill="#ffffff"></path><path d="M819.712 384a149.162667 149.162667 0 0 1 40.96 1.877333l-70.442667 121.941334a49.792 49.792 0 1 0 86.186667 49.792l70.442667-121.984a149.376 149.376 0 0 1-126.933334 245.845333l-129.322666 224a62.208 62.208 0 0 1-107.818667-62.208l129.109333-223.573333A149.333333 149.333333 0 0 1 819.712 384z" p-id="2458" fill="#ffffff"></path><path d="M647.04 579.2a191.829333 191.829333 0 0 1-0.810667-89.813333l-97.621333-97.792a21.333333 21.333333 0 1 0-30.208 30.165333l112.768 112.938667-112.768 112.896a21.333333 21.333333 0 0 0 30.208 30.165333l98.432-98.56zM420.565333 391.594667a21.333333 21.333333 0 0 1 0 30.165333l-113.066666 112.938667 113.066666 112.896a21.333333 21.333333 0 1 1-30.165333 30.165333l-128.128-128a21.333333 21.333333 0 0 1 0-30.165333l128.128-128a21.333333 21.333333 0 0 1 30.165333 0z" p-id="2459" fill="#ffffff"></path></svg>
    <van-row v-show="isShowModal" class="jw-devtool-group">
      <van-col span="8" class="f-mb-10">
        <VConsole></VConsole>
      </van-col>
      <van-col span="8" class="f-mb-10">
        <Reload></Reload>
      </van-col>
      <van-col span="8" class="f-mb-10">
        <ToolHide @hide="isHide = true"></ToolHide>
      </van-col>
      <!-- <van-col span="8" class="f-mb-10">
        <VConsole></VConsole>
      </van-col>
      <van-col span="8" class="f-mb-10">
        <VConsole></VConsole>
      </van-col> -->
    </van-row>
  </aside>
  <div class="jw-devtool-box-mask" v-show="isShowModal" @click="isShowModal = false"></div>
</template>
<script type="text/ecmascript-6" lang="ts" setup>
import { ref, onMounted, defineComponent } from 'vue'
import VConsole from './modules/vconsole.vue'
import Reload from './modules/pagereload.vue'
import ToolHide from './modules/tool-hide.vue'

defineComponent({
  VConsole,
  Reload,
  ToolHide
})
const isShowModal = ref(false)
const isHide = ref(false)

onMounted(() => {
  // console.log(this.aaa)
})
const handleClickIcon = () => {
  isShowModal.value = !isShowModal.value
}
</script>
<style lang="scss" rel="stylesheet/scss">
.jw-devtool-box-mask {
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
}

.jw-devtool-box {
  position: fixed;
  top: 40vh;
  left: 0;
  z-index: 1001;
  width: 46px;
  height: 30px;
  padding: 8px 0;
  border-radius: 50%;
  background-color: rgba($color: #000, $alpha: 60%);
  text-align: center;
  transition: 0.1s all;

  &.z-modal {
    width: 50vw;
    max-width: 300px;
    height: 60vw;
    max-height: 400px;
    border-radius: 13px;
  }

  .jw-devtool-group {
    display: flex;
    width: 100%;
    color: #fff;
  }
}
</style>
