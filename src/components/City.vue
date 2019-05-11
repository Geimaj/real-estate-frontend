<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Cities</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New City</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New City</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedCity.name"
                    label="City name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-combobox
                    v-model="editedCity.country"
                    :items="countries"
                    label="County"
                    item-text="name"
                    item-value="id"
                  ></v-combobox>
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
    <v-data-table :headers="headers" :items="cities" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.country.name }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      dialog: false,
      editedCity: {
        name: '',
        country: {
          id: '',
          name: '',
        },
      },
      headers: [
        {
          text: 'City',
          align: 'left',
          value: 'name',
        },
        { text: 'Country', value: 'country.name' },
      ],
      cities: [
        {
          id: 0,
          name: 'Cape Town',
          country: {
            name: 'South Africa',
          },
        },
      ],
      countries: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      API.getCities().then((cities) => (this.cities = cities));
      API.getCountries().then((countries) => (this.countries = countries));
    },
    save() {
      if (this.editedCity.country.id) {
        API.addCity(this.editedCity)
          .then((city) => {
            this.load();
            this.close();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert('Select a valid Country');
      }
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
