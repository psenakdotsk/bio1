<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const videoRef = ref(null)
let player = null

// 🧠 THIS is the important part
const base = import.meta.env.BASE_URL
const resolvedSrc = computed(() => base + props.src.replace(/^\//, ''))

onMounted(() => {
  if (videoRef.value) {
    player = new Plyr(videoRef.value, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'fullscreen'
      ],
      hideControls: true,
      blankVideo: 'https://cdn.plyr.io/static/blank.mp4'
    })
  }
})

onBeforeUnmount(() => {
  player?.destroy()
})
</script>

<template>
  <div class="plyr-wrapper rounded-xl overflow-hidden border border-slate-200/50 shadow-xl">
    <video ref="videoRef" playsinline crossorigin>
      <source :src="resolvedSrc" type="video/mp4" />
    </video>
  </div>
</template>

<style>
:root {
  --plyr-color-main: #3b82f6;
}
</style>