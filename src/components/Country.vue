<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-combobox
          v-model="country"
          :items="countries"
          label="Countries"
          item-text="name"
          item-value="id"
        ></v-combobox>
      </v-flex>

      <v-btn color="success" @click="addCountry">
        Add
      </v-btn>

      <v-btn color="warning" v-if="country.id > 0" @click="editCountry">
        EDIT
      </v-btn>

      <v-btn color="error" @click="deleteCountry">
        DELETE
      </v-btn>

      <CountryDialog
        v-if="dialog"
        :country="country"
        :onSave="save"
        :onCancel="cancel"
      >
      </CountryDialog>
    </v-layout>
  </v-container>
</template>

<script>
import CountryDialog from '@/components/CountryDialog';
import API from '@/lib/API';

export default {
  components: {
    CountryDialog,
  },
  data() {
    return {
      dialog: false,
      countries: [],
      country: {
        id: -1,
        name: '',
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      API.getCountries().then((countries) => {
        this.countries = countries;
      });
    },
    addCountry() {
      this.country = {
        name: '',
        id: -1,
      };
      this.dialog = true;
      console.log(this.dialog);
    },
    editCountry() {
      this.dialog = true;
    },
    deleteCountry() {},
    save() {
      API.addCountry(this.country).then((country) => {
        this.country = country;
        this.load();
      });

      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
v-container {
  background: red;
}
</style>
