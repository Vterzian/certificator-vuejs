<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'AddArtworkModal',
    methods: {
      ...mapActions([
        'closeModal',  
      ])
    }
  }
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Add new artwork</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Title" variant="solo" density="compact" hide-details="auto" clearable/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Width" variant="solo" density="compact" hide-details="auto" clearable/>
      </v-col>
      <v-col>
        <v-text-field label="Height" variant="solo" density="compact" hide-details="auto" clearable/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Technique and materials" variant="solo" density="compact" hide-details="auto" clearable/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Signature location" variant="solo" density="compact" hide-details="auto" clearable/>
      </v-col>
      <v-col sm="4">
        <v-text-field label="Year of creation" variant="solo" density="compact" hide-details="auto" clearable />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-file-input label="Image" variant="solo" density="compact" hide-details="auto" clearable/>
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