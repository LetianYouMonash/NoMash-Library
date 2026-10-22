<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'

const route = useRoute()

const showHeader = computed(() =>
  route.name !== 'CountBookAPI' &&
  route.name !== 'GetAllBookAPI'
)
</script>

<template>
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main>
    <router-view></router-view>
    <!-- <JSONLab /> -->
  </main>
</template>

<style>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
