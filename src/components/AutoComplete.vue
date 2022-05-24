<template>
  <div class="input-wrapper">
    <input :value="value" :placeholder="placeholder" @input="onChange" />

    <div class="select-tooltips" v-if="!$slots.content && value">
      <ul v-if="searchList.length">
        <li v-for="(item, index) in searchList" :key="index" @click="handleSelect(item)">
          {{ item.value }}
        </li>
      </ul>
      <p v-if="!searchList.length">暂无关联词组</p>
    </div>

    <!-- 插槽 -->
    <slot v-else name="content" v-bind:list="searchList"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Props {
  value: string;
  placeholder: string;
  onChange: () => void;
  searchList: string;
}

export default defineComponent({
  name: 'AutoComplete',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Please Input',
    },
    onChange: {
      type: Function,
      default() {},
    },
    searchList: {
      type: Array,
      default: () => [],
    },
  },
  setup(_props, ctx) {
    console.log(ctx.slots.content);
    const props = _props as unknown as Props;
    console.log('子组件', props.value);

    // methods
    const handleSelect = (item: any) => {
      ctx.emit('handleSelect', item);
    };

    return {
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
