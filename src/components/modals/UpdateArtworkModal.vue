<script setup>
  import { computed, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useVuelidate } from '@vuelidate/core'
  import { required, numeric } from '@vuelidate/validators'

  const { dispatch, getters } = useStore();

  const closeModal = () => dispatch('closeModal');
  const modalProps = computed(() => getters.modalProps);

  const formData = reactive({
    name: getters.modalProps.artwork.name,
    height:  modalProps.value.artwork.height,
    width: modalProps.value.artwork.width,
    signature: modalProps.value.artwork.signature,
    technique: modalProps.value.artwork.technique,
    dateCreation: modalProps.value.artwork.date_creation,
  });

  const rules = computed(() => ({
    name: { required },
    width: { required, numeric },
    height: { required, numeric },
    signature: { required },
    technique: { required },
    dateCreation: { required },
  }));

  const v$ = useVuelidate(rules, formData);

  const handleUpdateArtwork = () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
      return ;
    }

    dispatch('updateArtwork', { id: modalProps.value.artwork.id, ...formData});
    closeModal();
  };

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Update Artwork {{ modalProps.artwork.name }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field 
          label="Title" 
          variant="solo" 
          density="compact" 
          hide-details="auto" 
          clearable
          v-model="formData.name"
          :error-messages="v$.name.$error && v$.name.$errors.at(0).$message"
          @blur="v$.name.$touch"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field 
          label="Width" 
          variant="solo" 
          density="compact" 
          hide-details="auto" 
          clearable 
          v-model="formData.width"
          :error-messages="v$.width.$error && v$.width.$errors.at(0).$message"
          @blur="v$.width.$touch" 
        />
      </v-col>
      <v-col>
        <v-text-field 
          label="Height" 
          variant="solo" 
          density="compact" 
          hide-details="auto" 
          clearable 
          v-model="formData.height"
          :error-messages="v$.height.$error && v$.height.$errors.at(0).$message"
          @blur="v$.height.$touch"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field 
          label="Technique and materials" 
          variant="solo" 
          density="compact" 
          hide-details="auto" 
          clearable 
          v-model="formData.technique"
          :error-messages="v$.technique.$error && v$.technique.$errors.at(0).$message"
          @blur="v$.technique.$touch"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field 
          label="Signature location" 
          variant="solo" 
          density="compact" 
          hide-details="auto" 
          clearable 
          v-model="formData.signature"
          :error-messages="v$.signature.$error && v$.signature.$errors.at(0).$message"
          @blur="v$.signature.$touch"
        />
      </v-col>
      <v-col sm="4">
        <v-text-field 
          label="Year of creation" 
          variant="solo" 
          density="compact" 
          hide-details="auto" 
          clearable 
          v-model="formData.dateCreation"
          :error-messages="v$.dateCreation.$error && v$.dateCreation.$errors.at(0).$message"
          @blur="v$.dateCreation.$touch"
        />
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
        <v-btn
          color="success"
          @click.prevent="handleUpdateArtwork"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>