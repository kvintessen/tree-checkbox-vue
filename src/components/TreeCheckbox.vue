<template>
  <ul>
    <li>
      <span
          class="toggle-icon"
          @click="toggleCollapse"
          v-if="node.children && node.children.length"
      >
        {{ isCollapsed ? '▶' : '▼' }}
      </span>
      <label class="tree-label">
        <!-- Чекбокс для родителя -->
        <input
            type="checkbox"
            :indeterminate="node.checked === null"
            :checked="node.checked === true"
            @change="toggle"
        />
        <span class="checkbox-label">{{ node.label }}</span>
      </label>
      <!-- Показываем дочерние узлы, если узел не свёрнут -->
      <ul v-if="!isCollapsed && node.children && node.children.length" class="nested-tree">
        <TreeCheckbox
            v-for="(child, index) in node.children"
            :key="index"
            :node="child"
            @update="updateChildren"
        />
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {TreeNode} from '@/types';

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },
  setup(props, {emit}) {
    const isCollapsed = ref(false);

    const toggle = () => {
      // Переключаем состояние чекбокса при клике
      if (props.node.checked === false || props.node.checked === null) {
        props.node.checked = true;
        setAllChildrenChecked(props.node, true);
      } else {
        props.node.checked = false;
        setAllChildrenChecked(props.node, false);
      }
      emit('update'); // Сообщаем родителю, что состояние изменилось
    };

    // Рекурсивная функция для обновления состояния всех дочерних узлов
    const setAllChildrenChecked = (node: TreeNode, checked: boolean) => {
      if (node.children) {
        node.children.forEach((child) => {
          child.checked = checked;
          setAllChildrenChecked(child, checked); // Рекурсия для вложенных узлов
        });
      }
    };

    // Функция для обновления состояния родителя при изменении дочерних узлов
    const updateChildren = () => {
      const checkedChildren = Array.isArray(props.node.children)
          ? props.node.children.filter((child) => child.checked === true).length
          : 0;
      const uncheckedChildren = Array.isArray(props.node.children)
          ? props.node.children.filter((child) => child.checked === false).length
          : 0;
      const intermediateChildren = Array.isArray(props.node.children)
          ? props.node.children.filter((child) => child.checked === null).length
          : 0;

      // Если все дети отмечены
      if (checkedChildren === props.node.children?.length) {
        props.node.checked = true;
      }
      // Если все дети не отмечены
      else if (uncheckedChildren === props.node.children?.length && intermediateChildren === 0) {
        props.node.checked = false;
      }
      // Иначе ставим промежуточное состояние
      else {
        props.node.checked = null;
      }

      emit('update');
    };

    // Функция для переключения состояния свёрнут/развёрнут
    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      toggle,
      setAllChildrenChecked,
      updateChildren,
      toggleCollapse,
      isCollapsed,
    };
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
  margin-left: 20px;
  padding-left: 0;
}

li {
  margin-bottom: 8px;
  position: relative;
}

.tree-label {
  display: flex;
  align-items: center;
}

.checkbox-label {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Стили для чекбоксов */
input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #007bff; /* Цвет для чекбокса */
  -webkit-appearance: none; /* Убираем стандартный вид чекбокса */
  appearance: none; /* Убираем стандартный вид чекбокса */
  border: 1px solid #007bff;
  position: relative;
  background-color: white;
}

/* Промежуточное состояние с квадратом */
input[type="checkbox"]:indeterminate {
  background-color: #007bff; /* Синий фон для промежуточного состояния */
  border: 1px solid #007bff;
  position: relative;
}

input[type="checkbox"]:indeterminate::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: white; /* Белый квадрат внутри синего фона */
  position: absolute;
  top: 3px;
  left: 3px;
}

/* Активное состояние */
input[type="checkbox"]:checked {
  background-color: #007bff;
  border: 1px solid #007bff;
}

input[type="checkbox"]:checked::before {
  content: "";
  display: block;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}

/* Стили для дочерних элементов дерева */
.nested-tree {
  margin-left: 20px;
  padding-left: 15px;
  border-left: 1px dashed #ccc;
  transition: all 0.3s ease-in-out;
}

li {
  position: relative;
  padding-left: 20px;
}

/* Стили для иконок сворачивания/разворачивания */
.toggle-icon {
  cursor: pointer;
  font-size: 12px;
  color: #007bff;
  margin-right: 5px;
  user-select: none;
}
</style>