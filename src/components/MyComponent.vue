<template>
  <li :class="[isFolder ? 'folder' : 'file']">
    <input type="checkbox" id="checkbox" v-model="isCheckedInternal" >
    <label
      :class="{'open': open}"
      @click="toggle"
    >
      {{item.name}}
    </label>
    <ul v-show="open" v-if="isFolder" :class="{'open': open}">
      <my-component
      @changeChecked="newChecked"
      v-for="(product, idx) in item.children"
      :key="idx"
      :item="product"
      :isChecked="isCheckedInternal"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "my-component",
  data(){
    return {
      open: true,
      isCheckedInternal: this.isChecked

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
      },
    newChecked(){
       if(this.$children.filter(el => el.isCheckedInternal).length === this.$children.length){
         this.isCheckedInternal = true
       }
    }
  },
  props: {
    isChecked: Boolean,
    item: Object
  },
  watch: {
      isCheckedInternal(newValue){
        this.item.checked = newValue
        this.$emit('changeChecked', newValue,  this.item.children)
      },
      isChecked(newValue){
        this.isCheckedInternal = newValue
      }
  }
}
</script>

<style scoped>

</style>