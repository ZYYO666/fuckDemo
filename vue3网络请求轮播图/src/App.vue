<template>
  <div v-if="isloading" class="lbt">
    <lbt  :config="config" />
  </div>


</template>

<script>
import { ref, onMounted } from 'vue'
import lbt from './components/lbt.vue'
import axios from 'axios'

export default {
  components: {
    lbt
  },
  setup() {
    const config = ref({
      images: [],
      interval: 1000
    });
    const isloading =ref(false);

    onMounted(() => {

      axios.get('/data.php').then(res => {

        config.value.images.push(...res.data.list);
        console.log(config.value);
        isloading.value=true;

      }).catch(error => {
        console.log(error);
      })

    })
    return {
      config,
      isloading
    }
  }
}
</script>

<style scoped>
.lbt {
  margin: 100px auto;
  width: 800px;
}
</style>