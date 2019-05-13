<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Suburbs</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Suburb</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Suburb</span>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedSuburb.name"
                      label="Suburb name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedSuburb.zip"
                      label="ZIP"
                      :rules="zipRules"
                      count="4"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-combobox
                      v-model="editedSuburb.city"
                      :items="cities"
                      label="City"
                      item-text="name"
                      item-value="id"
                      :rules="cityRules"
                      required
                    ></v-combobox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="suburbs" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.zip }}</td>
        <td class="text-xs-right">{{ props.item.city.name }}</td>
        <td class="text-xs-right">{{ props.item.city.country.name }}</td>
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
      valid: true,
      editedSuburb: {
        name: '',
        city: {
          id: '',
          name: '',
          country: {
            id: 0,
            name: '',
          },
        },
      },
      headers: [
        {
          text: 'Suburb',
          align: 'left',
          value: 'name',
        },
        { text: 'ZIP', value: 'zip' },
        { text: 'City', value: 'city.name' },
        { text: 'Country', value: 'city.country.name' },
      ],
      suburbs: [
        {
          id: 0,
          name: 'Wynberg',
          zip: 8005,
          city: {
            id: 0,
            name: 'Cape Town',
            country: {
              id: 0,
              name: 'South Africa',
            },
          },
        },
      ],
      cities: [],
      nameRules: [(name) => !!name || 'Name is required'],
      zipRules: [
        (zip) => !!zip || 'ZIP is required',
        (zip) => !isNaN(zip) || 'ZIP must be a valid number',
      ],
      cityRules: [
        (city) => !!city || 'City is required',
        (city) => ((city && city.id) || -1) > -1 || 'Valid City is required',
      ],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      API.getSuburbs().then((suburbs) => (this.suburbs = suburbs));
      API.getCities().then((cities) => (this.cities = cities));
    },
    save() {
      console.log(this.editedSuburb);
      if (this.valid) {
        API.addSuburb(this.editedSuburb)
          .then((suburb) => {
            this.load();
            this.close();
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
