<script setup>
import { ref } from 'vue'
import loading from './components/loading.vue'
import back from './components/back.vue'
import dock from './components/dock.vue'
import img from './assets/back.webp'


const data = ref([
  { name: "finder", icon: "icon-home" },
  { name: "safari", icon: "icon-safari" },
  { name: "mail", icon: "icon-mail" },
  { name: "messages", icon: "icon-messages" },
  { name: "calendar", icon: "icon-calendar" },
  { name: "notes", icon: "icon-notes" },
  { name: "reminders", icon: "icon-reminders" },
  { name: "photos", icon: "icon-photos" },
  { name: "maps", icon: "icon-maps" },
  { name: "music", icon: "icon-music" }
]);

</script>

<template>
  <loading />
  <dock :dock="data" />
  <back :img="img" />
</template>

<style scoped></style>
