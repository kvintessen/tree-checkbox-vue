<template>
  <div>
    <!-- Отображаем дерево, только если данные загружены -->
    <TreeCheckbox v-if="treeData" :node="treeData" />
    <p v-else>Loading...</p> <!-- Показать "Loading..." пока данные не загружены -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeCheckbox from './components/TreeCheckbox.vue';
import { TreeNode } from './types';

export default defineComponent({
  components: {
    TreeCheckbox,
  },
  data() {
    return {
      treeData: null as TreeNode | null,  // Данные для дерева (изначально null)
    };
  },
  async created() {
    // Загружаем данные из JSON-файла
    try {
      const response = await fetch('/treeData.json');
      if (!response.ok) {
        console.error('Ошибка при загрузке данных дерева');
        return null;
      }
      this.treeData = await response.json();
    } catch (error) {
      console.error(error);
    }
  },
});
</script>

<style>
ul {
  list-style-type: none;
  margin-left: 20px;
}

label {
  cursor: pointer;
  user-select: none;
}
</style>
