<script setup>
  import { useStore } from 'vuex';

  const store = useStore();
  const closeModal = () => store.dispatch('closeModal');
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Artwork name</h3>
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
        <v-btn color="success">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>