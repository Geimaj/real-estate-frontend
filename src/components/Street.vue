<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Streets</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Street</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Street</span>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-text-field
                      v-model="street.name"
                      label="Street name"
                      :rules="streetRules"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md6>
                    <v-combobox
                      v-model="street.suburb"
                      :items="suburbs"
                      label="Suburb"
                      item-text="name"
                      item-value="id"
                      :rules="suburbRules"
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
    <v-data-table :headers="headers" :items="streets" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">
          {{ props.item.suburb && props.item.suburb.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item.suburb && props.item.suburb.zip }}
        </td>
        <td class="text-xs-right">
          {{ props.item.suburb && props.item.suburb.city.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item.suburb && props.item.suburb.city.country.name }}
        </td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
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
      edit: false,
      street: {
        name: '',
        suburb: {
          id: '',
          name: '',
        },
      },
      headers: [
        {
          text: 'Street name',
          align: 'left',
          value: 'name',
        },
        { text: 'Suburb', value: 'suburb.name' },
        { text: 'ZIP', value: 'suburb.zip' },
        { text: 'City', value: 'suburb.city.name' },
        { text: 'Country', value: 'suburb.city.country.name' },
        { text: 'Actions', value: 'name', sortable: false },
      ],
      streets: [
        {
          id: 0,
          name: 'Main Road',
          suburb: {
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
        },
      ],
      suburbs: [],
      streetRules: [(street) => !!street || 'Street Name is required'],
      suburbRules: [
        (suburb) => !!suburb || 'Suburb is required',
        (suburb) =>
          (suburb && suburb.id && isNaN(suburb)) || `Suburb does not exist`,
      ],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      API.getStreets().then((streets) => (this.streets = streets));
      API.getSuburbs().then((suburbs) => (this.suburbs = suburbs));
    },
    save() {
      if (this.valid) {
        if (!this.edit) {
          API.addStreet(this.street)
            .then((street) => {
              console.log(street);
              this.load();
              this.close();
            })
            .catch((error) => alert(error));
        } else {
          API.updateStreet(this.street)
            .then((street) => {
              console.log(street);
              this.load();
              this.close();
            })
            .catch((error) => alert(error));
        }
      }
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.edit = false;
    },
    editItem(item) {
      this.street = item;
      this.dialog = true;
      this.edit = true;
    },
    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') &&
        API.deleteStreet(item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
