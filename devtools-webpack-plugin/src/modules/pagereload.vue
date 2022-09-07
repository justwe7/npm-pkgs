<template>
  <div @click="handleReload">
    <svg t="1662433987156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1352" width="30" height="30"><path d="M835.516 709.837l154.351-225.894h-109.158c-14.541-221.047-198.11-396.151-422.844-396.151-234.291 0-423.731 189.918-423.731 424.277 0 234.155 189.918 424.141 424.209 424.141 105.062 0 200.977-38.434 275.115-101.786l-56.73-73.045c-58.368 51.063-134.69 82.398-218.385 82.398-183.296 0-331.844-148.617-331.844-331.708 0-183.364 148.617-331.913 331.844-331.913 173.739 0 315.665 133.734 329.933 303.787h-107.11l154.351 225.894z" p-id="1353" fill="#ffffff"></path></svg>
    <p class="text-center f-fz-14">reload</p>
  </div>
</template>
<script type="text/ecmascript-6" lang="ts">
export default {
  name: 'reload',
  methods: {
    handleReload () {
      location.reload()
    }
  }
}
</script>
