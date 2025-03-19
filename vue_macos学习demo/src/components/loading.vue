<template>
    <transition>
        <div :style="{ '--process': process + '%' }" v-if="loading" class="loading">
            <svg t="1734622343541" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1886">
                <path
                    d="M747.4 535.7c-0.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7z"
                    p-id="1887"></path>
                <path
                    d="M642.3 230.7c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"
                    p-id="1888"></path>
            </svg>
            <div class="loading_process">
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const process = ref(0);
const opacity = ref(1);

onMounted(() => {
    const interval = setInterval(() => {
        process.value += 10;
        if (process.value >= 150) {
            clearInterval(interval);
            loading.value = false;
        }
    }, 200);
});
</script>

<style scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 3s;
}

.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: opacity 0.5s ease;
    z-index: 99999;
}

.loading svg {
    width: 100px;
    fill: #fff;
    margin-bottom: 30px;
}

.loading .loading_process {
    width: 150px;
    height: 4px;
    background-color: #2c2c2c;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
}

.loading .loading_process::after {
    content: '';
    position: absolute;
    height: 100%;
    width: var(--process, 0);
    background-color: #fff;
    transition: width 0.5s ease;
}
</style>