<script setup>
  import { computed, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

  const { dispatch } = useStore();

  const formData = reactive({
    email: '',
    password: '',
  });
  const rules = computed(() => ({
    email: { required },
    password: { required },
  }));

  const v$ = useVuelidate(rules, formData);

  const handleLogin = () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
      return ;
    }

    dispatch('login', {...formData});
  };
</script>

<template>
  <v-app>
    <v-row>
      <v-col 
        xs="10" sm="6" md="4" 
        offset-xs="1" offset-sm="3" offset-md="4" 
        align-self="center"
      >
        <v-card elevation="3" class="pa-6">
          <v-form>
            <v-text-field
              variant="solo"
              label="Email"
              clearable
              v-model="formData.email"
              :error-messages="v$.email.$error && v$.email.$errors.at(0).$message"
              @blur="v$.email.$touch"
            ></v-text-field>
            <v-text-field
              variant="solo"
              label="Password"
              clearable
              v-model="formData.password"
              :error-messages="v$.password.$error && v$.password.$errors.at(0).$message"
              @blur="v$.password.$touch"
            ></v-text-field>
          </v-form>
          <v-btn
            color="primary"
            class="mr-4 w-100"
            @click="handleLogin"
          >
            Log in
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>