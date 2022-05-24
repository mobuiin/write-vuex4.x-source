<template>
  <div>
    <div class="item">
      <p class="title">实现 state</p>
      <p>computed: {{ count }}</p>
      <p>直接$store获取: {{ this.$store.state.count }}</p>
    </div>

    <div class="item">
      <p class="title">实现 getters</p>
      <p>computed: {{ getCount }}</p>
      <p>直接$store获取: {{ this.$store.getters.getCount }}</p>
    </div>

    <div class="item">
      <p class="title">实现 mutations</p>
      <p>count的值为: {{ count }}</p>
      <button @click="increment">+10</button>
    </div>

    <div class="item">
      <p class="title">实现 actions</p>
      <p>count的值为: {{ count }}</p>
      <button @click="incrementAsync">+20</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
// import { useStore } from 'vuex';

// 引入自己写的Vuex
import { useStore } from '../store/myVuex';

export default defineComponent({
  name: 'TestVuex',
  setup() {
    const store = useStore();

    const increment = () => {
      store.commit('increment', 10);
    };

    const incrementAsync = () => {
      store.dispatch('incrementAsync', 20);
    };

    return {
      // 响应式的count
      count: computed(() => store.state.count),
      getCount: computed(() => store.getters.getCount),
      increment,
      incrementAsync,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.item {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
.title {
  font-weight: bold;
}
</style>
