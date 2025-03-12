<template>
  <div @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay" class="container">
    <div class="points">
      <div class="point" @click="index = i" v-for="(v, i) in images" :class="{ active: i === index }" :key="i"></div>
    </div>
    <div class="prev" @click="prev">&lt;</div>
    <div class="next" @click="next">&gt;</div>
    <div :style="{ transform: `translateX(-${index * 100}%)` }" class="images">
      <img v-for="(item, index) in images" :src="item">
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
export default {
  name: 'lbt',
  props: {
    config: Object
  },
  setup(props) {
    const index = ref(0);
    const images = props.config.images;
    const interval = props.config.interval;

    let timer = null;
    const prev = () => {
      index.value = (index.value - 1 + images.length) % images.length;

    }
    const next = () => {
      index.value = (index.value + 1 + images.length) % images.length;

    }
    const startAutoPlay = () => {
      if (timer) return;
      timer = setInterval(() => {
        index.value = (index.value + 1) % images.length;
      }, interval);
    }
    const stopAutoPlay = () => {
      clearInterval(timer);
      timer = null;
    }
    onMounted(() => {
      startAutoPlay();
    })

    onUnmounted(() => {
      stopAutoPlay();
    })


    return {
      index,
      images,
      startAutoPlay,
      stopAutoPlay,
      prev,
      next
    }
  }
}
</script>

<style scoped>
.container {
  width: 800px;
  height: 500px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;

}


.images {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.images img {
  width: 100%;
  height: 100%;
}

.prev,
.next {
  position: absolute;
  padding: auto;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(4, 142, 255);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;
}

.container:hover .prev,
.container:hover .next {
  visibility: visible;
  opacity: 1;
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.points {
  position: absolute;
  bottom: 20px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.point {
  width: 10px;
  height: 10px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  cursor: pointer;
}

.point.active {
  background-color: rgb(255, 255, 255);
}
</style>