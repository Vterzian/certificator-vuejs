<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const closeModal = () => store.dispatch('closeModal');
  const artwork = computed(() => store.getters.modalProps.artwork);
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ artwork.name }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img :src="artwork.image" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list lines="one">
          <v-list-item
            :title="`Name: ${artwork.name}`"
          ></v-list-item>
          <v-list-item
            :title="`Size: ${artwork.width}x${artwork.height}`"
          ></v-list-item>
          <v-list-item
            :title="`Signature: ${artwork.signature}`"
          ></v-list-item>
          <v-list-item
            :title="`Technique: ${artwork.technique}`"
          ></v-list-item>
          <v-list-item
            :title="`Date creation: ${new Date(artwork.date_creation).toLocaleDateString('fr-FR')}`"
          ></v-list-item>
        </v-list>
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
      </v-col>
    </v-row>
  </v-container>
</template>