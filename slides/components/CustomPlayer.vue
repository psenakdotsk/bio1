<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css' // Importuje natívne štýly pre pekný dizajn

// Props pre flexibilitu (môžeš meniť zdroj videa priamo v slajdoch)
defineProps({
  src: {
    type: String,
    required: true
  }
})

const videoRef = ref(null)
let player = null

onMounted(() => {
  if (videoRef.value) {
    // Inicializácia prehrávača
    player = new Plyr(videoRef.value, {
      // Tu si vieš nastaviť, aké ovládacie prvky chceš zobraziť
      controls: [
        'play-large', // Veľké tlačidlo play v strede
        'play',       // Play/pause na lište
        'progress',   // Časová os
        'current-time', // Aktuálny čas
        'mute',       // Stlmenie zvuku
        'volume',     // Ovládanie hlasitosti
        'fullscreen'  // Celá obrazovka
      ],
      hideControls: true, // Schová ovládacie prvky, keď sa nehýbe myšou
      blankVideo: 'https://cdn.plyr.io/static/blank.mp4'
    })
  }
})

// Dobrá prax: upratať po sebe, keď sa slajd prepne, aby nezostávala visieť pamäť
onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})
</script>

<template>
  <!-- Obal, vďaka ktorému môžeš videu nastaviť zaoblené rohy a tieň pomocou Tailwindu -->
  <div class="plyr-wrapper rounded-xl overflow-hidden border border-slate-200/50 shadow-xl">
    <video ref="videoRef" playsinline crossorigin>
      <source :src="src" type="video/mp4" />
    </video>
  </div>
</template>

<style>
/*
  Customizácia farieb (voliteľné)
  Plyr používa CSS premenné, takže mu vieš jednoducho prepísať hlavnú farbu (napr. na zelenú/modrú)
*/
:root {
  --plyr-color-main: #3b82f6; /* Tailwind blue-500 */
}
</style>