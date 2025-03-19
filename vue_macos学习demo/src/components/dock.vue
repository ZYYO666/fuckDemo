<script setup>
import { ref } from 'vue'
const props = defineProps({
    dock: Array
})
</script>

<template>
    <div class="dock">
        <div v-for="(item, index) in props.dock" class="dock-item">{{item.name}}</div>
    </div>
</template>

<style scoped>
.dock {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 21px;
    background-color: hsla(240, 3%, 11%, .4);
    box-shadow: inset 0 0 0 .2px hsla(0, 0%, 96%, .7), 0 0 0 .2px hsla(0, 0%, 13%, .7), #0000004d 2px 5px 19px 7px;
    padding: .5rem .9rem;
    transition: transform .3s;
    display: flex;
    gap: 15px;
}

.dock-item {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: aliceblue;
}
</style>
