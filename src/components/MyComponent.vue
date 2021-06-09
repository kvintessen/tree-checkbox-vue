<template>
  <li :class="[isFolder ? 'folder' : 'file']">
    <input type="checkbox" id="checkbox"  v-model="isChecked">
    <label
      :class="{'open': open}"
      @click="toggle"
    >
      {{item.name}}
    </label>
    <ul v-show="open" v-if="isFolder" :class="{'open': open}">
      <my-component
      v-for="(product, idx) in item.children"
      :key="idx"
      :item="product"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "my-component",
  data(){
    return {
      open: true

    }
  },
  computed: {
    isFolder(){
      return this.item.children && this.item.children.length
    }
  },
  methods: {
      toggle() {
        if(this.isFolder){
          this.open = !this.open
        }
      }
  },
  props: {
    isChecked:{
      type: Boolean,
      default: false
    },
    item: Object
  },
  watch: {
    isChecked(newValue){
      for(let i = 0; i <= this.$children.length; i++){
        if(this.isFolder){
          this.$children[i].isChecked = newValue
          this.item.checked = newValue
        } else {
          this.item.checked = newValue
        }
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>