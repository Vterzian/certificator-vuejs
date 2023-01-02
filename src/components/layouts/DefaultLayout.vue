<script>
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  export default {
    name: 'DefaultLayout',
    setup() {
      const router = useRoute();
      const routeName = computed(() => router.name);

      return { routeName };
    },
  }
</script>

<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover
      rail
      permanent
      app
    >
      <div class="d-flex flex-column justify-space-between fill-height">
        <v-list density="compact" nav>
          <v-list-item 
            :active="routeName === 'home'"
            prepend-icon="mdi-home" 
            title="Home" 
            value="home"
            @click.prevent="$router.push({ name: 'home' })"
          ></v-list-item>
          <v-list-item
            :active="routeName === 'artworkList'"
            prepend-icon="mdi-palette" 
            title="My Artworks" 
            value="artworks"
            @click.prevent="this.$router.push({ name: 'artworkList' })"
          ></v-list-item>
          <v-list-item
            :active="routeName === 'certificateList'"
            prepend-icon="mdi-newspaper-variant"
            title="Certificates"
            value="certificates"
            @click.prevent="this.$router.push({ name: 'certificateList' })"
          ></v-list-item>
        </v-list>

        <v-list density="compact" nav>
          <v-list-item
            class="logout-btn"
            prepend-icon="mdi-power" 
            title="LOG OUT" 
            value="log out"
            @click.prevent="$router.push({ name: 'logIn' })"
          ></v-list-item>
        </v-list>
      </div>
      
    </v-navigation-drawer>

    <v-app-bar app>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      footer
    </v-footer>
  </v-app>
</template>

<style scoped>
  .logout-btn {
    color: red;
  }
</style>
