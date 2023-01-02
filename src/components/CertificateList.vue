<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'CertificateList',
    methods: {
      ...mapActions({
        openModal: 'openModal',
      }),
    }
  }
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn @click.prevent="openModal('AddCertification')">
          Add Certification
        </v-btn>
      </v-col>
    </v-row>
    <v-table hover>
      <thead>
        <tr>
          <th>
            Date creation
          </th>
          <th>
            Name
          </th>
          <th>
            ID Number
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>12.12.12</td>
          <td>Certificate {{ i }}</td>
          <td>420-772-88{{ i - 1 }}</td>
          <td class="text-end">
            <v-btn variant="plain" icon="mdi-eye" elevation="0" size="small" @click.prevent="openModal('CertificationDetail')"/>
            <v-btn variant="plain" icon="mdi-download" elevation="0" size="small" />
            <v-btn variant="plain" icon="mdi-delete" elevation="0" size="small" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      density="compact"
      :length="15"
      :total-visible="7"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>