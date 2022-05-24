import { App, inject, reactive } from 'vue';
import { StoreOptions } from 'vuex';
import Util from './util';

// 定一个key，作为provide和inject的key
const injectKey = 'store';

export class Store<S = any> {
  _state: any;

  getters: Record<string, any> = {};

  mutations: Record<string, any> = {};

  actions: Record<string, any> = {};

  constructor(options: StoreOptions<S>) {
    const store = this;
    store._state = reactive({
      data: options.state || Object.create(null),
    });

    // 实现getters
    const { getters } = options;
    store.getters = Object.create(null);
    Util.forEachValue(getters, (fn, key) => {
      Object.defineProperty(store.getters, key, {
        get: () => fn(store.state),
      });
    });

    // 实现mutations
    const { mutations } = options;
    store.mutations = Object.create(null);
    Util.forEachValue(mutations, (mutation, key) => {
      store.mutations[key] = (payload: any) => {
        mutation.call(store, store.state, payload);
      };
    });

    // 实现actions
    const { actions } = options;
    store.actions = Object.create(null);
    Util.forEachValue(actions, (action, key) => {
      store.actions[key] = (payload: any) => {
        action.call(store, store, payload);
      };
    });
  }

  get state() {
    return this._state.data;
  }

  // 提供触发mutations的commit方法
  commit = (type: string, payload: any) => {
    if (!this.mutations[type]) {
      return console.error(`[vuex] unknown mutations type: ${type}`);
    }
    this.mutations[type](payload);
  }

  // 提供触发actions的dispatch方法
  dispatch = (type: string, payload: any) => {
    if (!this.actions[type]) {
      return console.error(`[vuex] unknown actions type: ${type}`);
    }
    this.actions[type](payload);
  }

  // app.use(store)【store中间件挂载app上时需要调用的方法】
  install(app: App) {
    // 通过Provide注入给所有组件
    app.provide(injectKey, this);

    // 挂载在全局对象上，可通过this.$store取到
    app.config.globalProperties.$store = this;
  }
}

export function useStore<S>(): Store<S> {
  return inject(injectKey) as any;
}

// 创建生成Store
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options);
}
