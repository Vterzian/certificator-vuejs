<script setup>
  import { computed, defineAsyncComponent, watch } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const isModalOpen = computed(() => store.getters.isModalOpen);
  const modalComponent = computed(() => store.getters.modalComponent);
  let component = null;

  const closeModal = () => store.dispatch('closeModal');

  watch(modalComponent, async (newName) => {
    if (modalComponent.value) {
      component = defineAsyncComponent(() => import(`@/components/modals/${newName}Modal.vue`));
    }
  });
</script>

<template>
  <v-dialog
    v-model="isModalOpen"
    max-width="600"
    @click.prevent.self="closeModal"
  >
    <v-card>
      <component :is="component"></component>
    </v-card>
  </v-dialog>
</template>