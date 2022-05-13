// import { createStore } from 'vuex';
import { createStore } from './myVuex';

export default createStore({
  state: {
    count: 2,
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
  mutations: {
    increment(state, payload) {
      state.count += payload;
    },
  },
  actions: {
    incrementAsync(context, payload): Promise<void> {
      // 模拟异步
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit('increment', payload);
          resolve();
        }, 100);
      });
    },
  },
  modules: {
  },
});
