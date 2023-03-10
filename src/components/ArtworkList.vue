<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'ArtworkList',
    data() {
      return {
        currentPage: 1,
        perPage: 10,
      }
    },
    methods: {
      ...mapActions({
        openModal: 'openModal',
        fetchArtworkList: 'fetchArtworkList',
        deleteArtwork: 'deleteArtwork',
        getPdf: 'getPdf',
      }),
    },
    computed: {
      ...mapGetters([
        'artworkList',
        'artworkIsLoading',
        'artworkError',
        'artworkListLastPage',
        'artworkListCurrentPage',
      ])
    },
    mounted() {
      this.fetchArtworkList({ page: this.currentPage, perPage: this.perPage });
      this.currentPage = 1;
    },
    watch: {
      currentPage(newCurrentPage) {
        this.fetchArtworkList({ page: newCurrentPage, perPage: this.perPage });
      },
      artworkList(newArtworkList) {
        if (!newArtworkList.length) {
          this.currentPage = this.artworkListLastPage;
        }
      },
    },
  }
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn @click.prevent="openModal({ componentName: 'AddArtwork' })">
          Add Artwork
        </v-btn>
      </v-col>
    </v-row>
    <v-table hover fixed-header height="calc(100vh - 275px)" class="mt-4">
      <thead>
        <tr>
          <th class="w-0">Image</th>
          <th>
            Added at
          </th>
          <th>
            Name
          </th>
          <th>Size</th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody class="position-relative">
        <v-overlay v-model="artworkIsLoading" contained scrim="#CCCCCC" class="align-center justify-center rounded">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-overlay>
        <div v-if="!artworkList?.length && !artworkIsLoading" class="w-100 position-absolute text-center pa-8">
          No artwork found
        </div>
        <tr v-for="artwork in artworkList" :key="artwork.id" @click="openModal({ componentName: 'ArtworkDetail', props: { artwork }})">
          <td>
            <v-img cover width="75" aspect-ratio="1" :src="artwork.image" class="my-2"/>
          </td>
          <td>{{ new Date(artwork.created_at).toLocaleDateString('fr-FR') }}</td>
          <td>{{ artwork.name }}</td>
          <td>{{ artwork.width }}x{{ artwork.height }}</td>
          <td class="text-end">
            <v-btn variant="plain" icon="mdi-download" elevation="0" size="small" @click.stop="getPdf(artwork.id)"/>
            <v-btn variant="plain" icon="mdi-pencil" elevation="0" size="small" @click.stop="openModal({ componentName: 'UpdateArtwork', props: { artwork } })"/>
            <v-btn 
              variant="plain" 
              icon="mdi-delete" 
              elevation="0" 
              size="small" 
              @click.stop="openModal({ componentName: 'Confirm', props: { callback: () => deleteArtwork(artwork.id), message: `Confirm delete ${artwork.name} ?` }})"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      density="compact"
      v-if="artworkListLastPage > 1"
      :length="artworkListLastPage"
      :total-visible="7"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>