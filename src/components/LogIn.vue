<script>
  export default {
    name: 'LogIn',
  }
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
              label="Login"
            ></v-text-field>
            <v-text-field
              variant="solo"
              label="Password"
            ></v-text-field>
          </v-form>
          <v-btn
            color="primary"
            class="mr-4 w-100"
            @click="this.$router.push({ name: 'home' })"
          >
            Log in
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>