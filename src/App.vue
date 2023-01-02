<script setup>
  import AppModal from '@/components/modals/AppModal.vue'

</script>

<template>
  <v-app>
    <AppModal />
    <router-view></router-view>
  </v-app>
</template>

<style>
  a {
    color: inherit;
    text-decoration: inherit;
  }
</style>