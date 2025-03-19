<script setup>
import { ref } from 'vue'
const props = defineProps({
    img: String
})
console.log(props.img);

</script>

<template>
    <div :style="{ '--back': 'url(' + props.img + ')' }" class="back">
    </div>
</template>

<style scoped>
.back {
    width: 100vw;
    height: 100vh;
    background: var(--back);
    background-size: cover;
    background-position: center;
}
</style>
