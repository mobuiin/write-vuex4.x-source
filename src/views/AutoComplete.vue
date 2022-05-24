<template>
  <AutoComplete
    :value="state"
    placeholder="请输入搜索内容"
    :onChange="changeValue"
    :searchList="queryResult"
    @handleSelect="handleSelect"
  >
    <template v-slot:content="{ list }">
      <p>插槽传了内容，就用插槽的</p>
      <div class="select-tooltips" v-if="state">
        <ul v-if="list.length">
          <li v-for="(item, index) in list" :key="index" @click="handleSelect(item)">
            {{ item.value }}
          </li>
        </ul>
        <p v-if="!list.length">暂无关联词组</p>
      </div>
    </template>
  </AutoComplete>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import AutoComplete from '@/components/AutoComplete.vue';

interface RestaurantItem {
  value: string;
  link: string;
}

export default defineComponent({
  name: 'testAutoComplete',
  components: {
    AutoComplete,
  },
  setup() {
    const state = ref('');
    const restaurants = ref<RestaurantItem[]>([]);
    const queryResult = ref<RestaurantItem[]>([]);

    const loadAll = () => [
      { value: 'vue', link: 'https://github.com/vuejs/vue' },
      { value: 'element', link: 'https://github.com/ElemeFE/element' },
      { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
      { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
      { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
      { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
      { value: 'babel', link: 'https://github.com/babel/babel' },
    ];

    // methods
    const querySearch = (queryString: string) => {
      const result = queryString
        ? restaurants.value.filter(({ value }) => value.includes(queryString.toLowerCase()))
        : restaurants.value;
      console.log(queryString.toLowerCase(), 111);
      return result;
    };

    const changeValue = (e: Event & { target: HTMLInputElement }) => {
      console.log(e.target.value);
      const { value } = e.target;
      state.value = value;
      queryResult.value = querySearch(value);
    };

    const handleSelect = (item: any) => {
      alert(`您点击了${item.value}，发起请求成功！`);
    };

    onMounted(() => {
      restaurants.value = loadAll();
    });

    return {
      state,
      restaurants,
      queryResult,

      // methods
      changeValue,
      querySearch,
      handleSelect,
    };
  },
});
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.select-tooltips {
  margin-top: 20px;
  padding: 10px 0;
  min-width: 190px;
  color: #606266;
  text-align: left;
  /* border: 1px solid #ddd; */
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.select-tooltips li {
  padding: 0 20px;
  line-height: 30px;
}
.select-tooltips li:hover {
  background-color: #f5f7fa;
  cursor: pointer;
}

.select-tooltips p {
  text-align: center;
}

ul {
  padding: 0;
  margin: 0;
}
ul > li {
  list-style: none;
  border-bottom: 1px solid #eee;
}
ul > li:last-child {
  border-bottom: none;
}
</style>
