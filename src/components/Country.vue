<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Countries</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Country</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Country</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="country.name"
                    label="Country name"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="countries" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editCountry(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteCountry(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
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
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Actions',
          align: 'left',
          sortable: false,
        },
      ],
      countries: [],
      country: { id: -1, name: '' },
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
    editCountry(country) {
      this.dialog = true;
    },
    deleteCountry(country) {},
    save() {
      API.addCountry(this.country)
        .then((country) => {
          this.load();
        })
        .catch((error) => alert(`error adding country. ${error}`));

      this.close();
    },
    close() {
      this.dialog = false;
      this.countryName = '';
    },
  },
};
</script>

<style scoped></style>
