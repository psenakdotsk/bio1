<script setup>
  defineProps({
    index: Number
  })
</script>

<template>
    <span class="relative">
        <span v-click.hide="3" data-c="id">
            <slot />
        </span>
        <span v-click="3" data-c="id" data-d="id">
          {{ index }}
        </span>

        <span v-click="1" class="absolute inset-0 border border-red-500 bg-[#2ee7ff55] rounded"></span>
    </span>
    <span v-click="2" class="tokenspacer"></span>
</template>

<style scoped>
.tokenspacer {
    transition: margin-right 0.5s;
}

.tokenspacer:not(.slidev-vclick-hidden) {
    margin-right: 0.3em;
}

.slidev-vclick-hidden[data-c="id"] {
  display: none !important;
}

span[data-d="id"]:not(.slidev-vclick-hidden) {
  font-size: 0.5em
}
</style>