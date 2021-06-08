<template>
  <div id="app">
    <my-component
        v-for="(product, idx) in products.products"
        :key="idx"
        :item="product"

    />

    <div class="catalog">
      <pre>{{products}}</pre>
    </div>
  </div>
</template>

<script>
import MyComponent from "@/components/MyComponent";
import products from "@/./catalog.json"

export default {
  name: 'App',
  components: {
    MyComponent
  },
  data(){
    return {
      products: products
    }
  }
}
</script>
