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

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
  }

  ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(144, 144, 144);
  }
</style>