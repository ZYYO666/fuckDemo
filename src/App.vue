<template>

    <div class="container">
        <div class="tcs">
            <div v-for="i in size ** 2" :class="highlight(i)"></div>
        </div>
        <div class="config">
            <span>分数：{{ point }}</span>
            <div>
                <span>是否开启边框
                </span>
                <el-radio-group v-model="border1">
                    <el-radio value="1" size="large">开启</el-radio>
                    <el-radio value="2" size="large">关闭</el-radio>
                </el-radio-group>
            </div>
            <div>
                <span>是否允许穿墙
                </span>
                <el-radio-group v-model="ikun">
                    <el-radio value="1" size="large">关闭</el-radio>
                    <el-radio value="2" size="large">开启</el-radio>
                </el-radio-group>
            </div>
            <div>
                <span>网格大小</span>
                <el-slider :disabled="isStart" v-model="size" :min="15" :max="100" :step="5" show-stops />
            </div>
            <div>
                <span>游戏难度</span>
                <el-slider :disabled="isStart" v-model="hard1" :min="1" :max="20" :step="1" show-stops />
            </div>

            <el-button-group>
                <el-button type="primary" @click="start" :disabled="isStart">开始</el-button>
                <el-button type="primary" :disabled="!isStart" @click="stop">
                    暂停
                </el-button>
                <el-button type="primary" :disabled="isStart" @click="restart">
                    重新开始
                </el-button>
            </el-button-group>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const she = ref([1, 2])
const size = ref(25)
const fangxiang = ref('right')
const food = ref([Math.floor(Math.random() * size.value ** 2) + 1])

const isStart = ref(false)

const border1 = ref('1')
const border = computed(() => {
    return border1.value === '1' ? '1px solid #5b5b5b' : 'none'
})
const hard1 = ref(6)
const hard = computed(() => {
    return 1000 / hard1.value
})

const ikun = ref('1')
const point = computed(() => {
    return (she.value.length - 1) * 10
})

const highlight = (i) => {
    const shetou = she.value[she.value.length - 1] === i
    return shetou ? 'ge head' : (she.value.includes(i) ? 'ge h' : (food.value.includes(i) ? 'ge food' : 'ge'))
}
const nextFood = () => {
    food.value.shift()
    food.value.push(Math.floor(Math.random() * size.value ** 2) + 1)
}
const move = () => {
    const i = she.value[she.value.length - 1]
    let j = 0
    switch (fangxiang.value) {
        case 'right':
            if (i % size.value == 0) {
                if (ikun.value === '1') {
                    j = 'fuck'
                } else {
                    j = i + size.value - 1
                }
            } else {
                j = i + 1
            }
            break;
        case 'left':
            if (i % size.value == 1) {
                if (ikun.value === '1') {
                    j = 'fuck'
                } else {
                    j = i + size.value - 1
                }
            } else {
                j = i - 1
            }
            break;
        case 'up':
            if (i / size.value <= 1) {
                if (ikun.value === '1') {
                    j = 'fuck'
                } else {
                    j = i + (size.value - 1) * size.value
                }
            } else {
                j = i - size.value
            }
            break;
        case 'down':
            if (i / size.value >= size.value - 1) {
                if (ikun.value === '1') {
                    j = 'fuck'
                } else {
                    j = i - (size.value - 1) * size.value
                }
            } else {
                j = i + size.value
            }
            break;
    }
    if (j == food.value[0]) {
        nextFood()
    } else {
        she.value.shift()
    }

    if (j == 'fuck' || she.value.includes(j)) {
        stop()
        refresh()
        alert(`游戏结束:${point.value}分`)
        return
    }
    she.value.push(j)
}


const handleKeyDown = (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (fangxiang.value != 'down') {
                fangxiang.value = 'up'
            }
            break;
        case 'ArrowDown':
            if (fangxiang.value != 'up') {
                fangxiang.value = 'down'
            }
            break;
        case 'ArrowLeft':
            if (fangxiang.value != 'right') {
                fangxiang.value = 'left'
            }
            break;
        case 'ArrowRight':
            if (fangxiang.value != 'left') {
                fangxiang.value = 'right'
            }
            break;
        default:
            break
    }
    move()
};

let timer
const start = () => {
    if (isStart.value) {
        return
    }
    isStart.value = true
    window.addEventListener('keydown', handleKeyDown)

    timer = setInterval(() => {
        move()
    }, hard.value)
}
const stop = () => {
    isStart.value = false
    clearInterval(timer)
    window.removeEventListener('keydown', handleKeyDown)
}
const refresh = () => {
    she.value = [1]
    fangxiang.value = 'right'
    food.value = [Math.floor(Math.random() * size.value ** 2) + 1]
}
const restart = () => {
    refresh()
    start()
}




</script>
<style scoped>
.container {
    width: fit-content;
    display: flex;
    gap: 30px;

}

.config {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-content: center;
    padding: 10px;
    width: 30vmin;
}

.config>div {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
    justify-content: center;
}

.config span {
    font-size: 15px;
    text-wrap: nowrap;
}

.tcs {
    width: 800px;
    height: 800px;
    display: grid;
    background-color: #2d2d2d;
    ;
    grid-template-columns: repeat(v-bind(size), 1fr);
    grid-template-rows: repeat(v-bind(size), 1fr);

}

.ge {
    border: v-bind(border);
    background-color: #2d2d2d;
    border-collapse: collapse;

}

.ge.h {
    background-color: rgb(141, 255, 255);
    border: none;
    border-radius: 50%;
    transform: scale(1.15);
}

.ge.head {
    background: url(/tcs.jpg);
    background-size: cover;
    border-radius: 50%;
    border: none;
}

.ge.food {
    background: url(/ikun.jpg);
    background-size: cover;
    border-radius: 50%;
    border: none;
}

@media screen and (max-width: 1000px) {
    .container {
        flex-direction: column;
    }

    .config {
        width: 100vw;

        padding: 20px;
    }

    .tcs {
        width: 100vw;
        height: 100vw;
        max-width: 600px;
        max-height: 600px;
    }
}
</style>