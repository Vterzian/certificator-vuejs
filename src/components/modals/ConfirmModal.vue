<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const { getters, dispatch } = useStore();

  const modalProps = computed(() => getters.modalProps);
  const closeModal = () => dispatch('closeModal');

  const handleConfirmModal = () => {
    modalProps.value.callback();
    closeModal();
  };
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Please confirm</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ modalProps.message }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn 
          class="me-4"
          color="error"
          @click.prevent="closeModal"
        >
          Close
        </v-btn>
        <v-btn color="success" @click.prevent="handleConfirmModal">
          Confirm
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>