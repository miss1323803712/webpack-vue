<template>
  <div class="drag-wrap" :style="wrapStyle">
    <template v-if="isDrag">
      <div class="line line-1" :style="lineStyle"></div>
      <div class="line line-2" :style="lineStyle"></div>
      <div class="line line-3" :style="lineStyle"></div>
      <div class="line line-4" :style="lineStyle"></div>
      <div class="circle-line" :style="circleStyle"></div>
    </template>
    <div class="drag-box" :style="boxStyle" ref="moveDrag">
      <div class="drag-dot drag-bottom" ref="bottomDrag"></div>
      <div class="drag-dot drag-right" ref="rightDrag"></div>
      <div class="drag-dot drag-right-bottom" ref="rBDrag"></div>
      <div class="drag-dot drag-left" ref="leftDrag"></div>
      <div class="drag-dot drag-top" ref="topDrag"></div>
      <div class="drag-dot drag-left-top" ref="leftTopDrag"></div>
      <div class="drag-dot drag-right-top" ref="rightTopDrag"></div>
      <div class="drag-dot drag-left-bottom" ref="leftBottomDrag"></div>
      <div class="rotate" ref="rotateRef" :style="rotateStyle"></div>
      <div class="angle" :style="{left: box.width / 2 + 20 + 'px'}">{{ box.rotate }}</div>

    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
const heightScale = 1.5
function computedHooks(state) {
  const boxStyle = computed(() => {
    return {
      height: state.box.height + 'px',
      width: state.box.width + 'px',
      transform: `rotate(${state.box.rotate}deg)`
    }
  })

  const wrapStyle = computed(() => {
    return {
      left: state.box.x + 'px',
      top: state.box.y + 'px',
      height: state.box.height + 'px',
      width: state.box.width + 'px',
    }
  })

  const rotateStyle = computed(() => {
    return {
      left: state.box.width / 2 - 10 + 'px',
      top: '-30px'
    }
  })

  const circleStyle = computed(() => {
    const width = Math.max(state.box.width, state.box.height) * Math.sqrt(2)
    return {
      width: width + 'px',
      height: width +  'px',
      left: -(width - state.box.width) / 2 + 'px',
      top: -(width - state.box.height) / 2 + 'px'
    }
  })
  const lineStyle = computed(() => {
    const height = Math.max(state.box.width, state.box.height) * heightScale
    return {
      left: state.box.width / 2 + 'px',
      height: height + 'px',
      top: -(height - state.box.height) / 2 + 'px'
    }
  })
  return {
    boxStyle,
    wrapStyle,
    rotateStyle,
    lineStyle,
    circleStyle
  }
}

function bindEvent(state, refObj) {
  const { 
    rotateRef, 
    rightDrag, 
    bottomDrag, 
    rBDrag, 
    moveDrag, 
    leftDrag, 
    topDrag, 
    leftTopDrag,
    rightTopDrag,
    leftBottomDrag
  } = refObj
  onMounted(() => {
    rotateRef.value.onmousedown = (e) => {
      e.stopPropagation();
      state.isDrag = true

      const center = {
        x: state.box.x + state.box.width / 2,
        y: state.box.y + state.box.height / 2
      }

      const start = {
        x: state.box.x + state.box.width / 2,
        y: state.box.y
      }

      document.onmousemove = (e) => {
        
        const x1 = start.x - center.x
        const y1 = start.y - center.y

        const x2 = e.clientX - center.x
        const y2 = e.clientY - center.y

        const cos = (x1 * x2 + y1 * y2) / (Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)) * Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2)) )
        let angle = 180 / (Math.PI / Math.acos(cos))
        if (e.clientX < center.x) {
          angle = 180 + (180 - angle)
        }
        let angleArr = [45, 90, 135, 180, 225, 270, 315, 0]
        let angleInt = Math.ceil(angle) % 360
        const near = angleArr.filter(item => item == angleInt - 1 || item == angleInt + 1) || []
        if (near.length > 0) {
          state.box.rotate = near[0]
          return
        }
        state.box.rotate = angleInt
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        state.isDrag = false
      }
    }

    rightDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        height: state.box.height
      }
      document.onmousemove = (e) => {
        moveRight(start, e)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    bottomDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        height: state.box.height
      }
      document.onmousemove = (e) => {
        moveBottom(start, e)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    rBDrag.value.onmousedown = (e) => {
      e.stopPropagation();

      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        height: state.box.height
      }
      document.onmousemove = (e) => {
        moveBottom(start, e)
        moveRight(start, e)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    moveDrag.value.onmousedown = (e) => {
      const start = {
        x: e.clientX,
        y: e.clientY,
        left: state.box.x,
        top: state.box.y
      }
      document.onmousemove = (e) => {
        move(start, e)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    leftDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        left: state.box.x
      }
      
      document.onmousemove = (e) => {
        moveLeft(start, e)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    topDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        y: e.clientY,
        height: state.box.height,
        top: state.box.y
      }

      document.onmousemove = (e) => {
        moveTop(start, e)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      
    }
    leftTopDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        height: state.box.height,
        top: state.box.y,
        left: state.box.x
      }

      document.onmousemove = (e) => {
        moveTop(start, e)
        moveLeft(start, e)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      
    }
    rightTopDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        height: state.box.height,
        top: state.box.y,
        left: state.box.x
      }

      document.onmousemove = (e) => {
        moveTop(start, e)
        moveRight(start, e)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    leftBottomDrag.value.onmousedown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
        width: state.box.width,
        height: state.box.height,
        top: state.box.y,
        left: state.box.x
      }

      document.onmousemove = (e) => {
        moveLeft(start, e)
        moveBottom(start, e)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  })

  function moveRight(start, e) {
    let width = e.clientX - start.x + start.width
    if (width <= 0) {
      return
    }
    state.box.width = width
  }

  function moveBottom(start, e) {
    let height = e.clientY - start.y + start.height
    if (height <= 0) {
      return
    }
    state.box.height = height
  }
  function move(start, e) {
    let x = e.clientX - start.x + start.left
    let y = e.clientY - start.y + start.top
    state.box.x = x
    state.box.y = y
  }

  function moveLeft(start, e) {
    const left = e.clientX - start.x + start.left
    const width = start.width - e.clientX + start.x
    if (left > start.x + start.width) {
      return
    }
    state.box.x = left
    state.box.width = width
  }

  function moveTop(start, e) {
    const top = e.clientY - start.y + start.top
    const height = start.height - (e.clientY - start.y)
    if (top > start.y + start.height) {
      return
    }
    state.box.y = top
    state.box.height = height
  }
}


export default defineComponent({
  setup() {
    const rotateRef = ref(null)
    const bottomDrag = ref(null)
    const rightDrag = ref(null)
    const rBDrag = ref(null)
    const moveDrag = ref(null)
    const leftDrag = ref(null)
    const topDrag = ref(null)
    const rightTopDrag = ref(null)
    const leftTopDrag = ref(null)
    const leftBottomDrag = ref(null)
    const state = reactive({
      box: {
        x: 100,
        y: 100,
        width: 300,
        height: 300,
        rotate: 0
      },
      isDrag: false
    })
    const computedModule = computedHooks(state)
    bindEvent(state, {
      rotateRef,
      bottomDrag,
      rightDrag,
      moveDrag,
      rBDrag,
      leftDrag,
      topDrag,
      rightTopDrag,
      leftTopDrag,
      leftBottomDrag
    })

    return {
      ...toRefs(state),
      rotateRef,
      bottomDrag,
      rightDrag,
      rBDrag,
      moveDrag,
      leftDrag,
      topDrag,
      rightTopDrag,
      leftTopDrag,
      leftBottomDrag,
      ...computedModule
    }
  },
})
</script>


<style scoped lang="scss">
.drag-wrap {
  position: absolute;
  z-index: -1;

  .angle {
    width: 30px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: red;
    font-size: 12px;
    position: absolute;
    top: -60px;
    right: 100px;
    border: 1px solid blue;
    border-radius: 10px;
    user-select: none;
    z-index: -10;
  }

  .circle-line {
    border: 1px solid red;
    position: absolute;
    border-radius: 100%;
  }

  .line {
    width: 1px;
    height: 500px;
    background-color: red;
    position: absolute;
    z-index: -1;
    opacity: 0.1;
    transform-origin: center;

    &.line-1 {
      transform: rotate(135deg);
    }

    &.line-2 {
      transform: rotate(225deg);
    }

    &.line-3 {
      width: 1px;
    }

    &.line-4 {
      height: 1px;
      transform: rotate(90deg);
    }
  }
  .drag-box {
    border: 1px dotted;
    margin: 0 auto;
    position: absolute;
    z-index: 10;
    cursor: move;

    .drag-dot {
      width: 10px;
      height: 10px;
      background-color: black;
      position: absolute;

      &.drag-bottom {
        bottom: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: s-resize;
      }

      &.drag-right {
        right: -5px;
        top: 50%;
        margin-top: -5px;
        cursor: e-resize;
      }

      &.drag-right-bottom {
        right: -5px;
        bottom: -5px;
        cursor: se-resize;
      }

      &.drag-left {
        left: -5px;
        top: 50%;
        margin-top: -5px;
        cursor: e-resize;
      }

      &.drag-top {
        left: 50%;
        top: -5px;
        margin-left: -5px;
        cursor: s-resize;
      }

      &.drag-left-top {
        left: -5px;
        top: -5px;
        cursor: nw-resize;
      }

      &.drag-right-top {
        right: -5px;
        top: -5px;
        cursor: ne-resize;
      }

      &.drag-left-bottom {
        left: -5px;
        bottom: -5px;
        cursor: ne-resize;
      }
    }

    .rotate {
      width: 20px;
      height: 20px;
      border: 1px solid;
      border-radius: 10px;
      position: absolute;
      top: -30px;
      left: 90px;
      z-index: 1000;
      cursor: move;
    }
  }
}
</style>
