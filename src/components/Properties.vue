<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Properties</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="newProperty()">
        New Property
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="properties" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{ props.item && props.item.listingPrice }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.bedrooms }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.bathrooms }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.pool }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.squareMeter }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.address.street.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.address.street.suburb.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.address.street.suburb.city.name }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.address.street.suburb.city.country.name }}
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
      headers: [
        {
          text: 'Price',
          align: 'left',
          value: 'listingPrice',
        },
        {
          text: 'Beds',
          align: 'left',
          value: 'bedrooms',
        },
        {
          text: 'Baths',
          value: 'bathrooms',
        },
        {
          text: 'Pool',
          value: 'pool',
        },
        {
          text: 'square Meters',
          value: 'squareMeter',
        },
        {
          text: 'Street',
          value: 'address.street.name',
        },
        {
          text: 'Suburb',
          value: 'address.street.suburb.name',
        },
        {
          text: 'City',
          value: 'address.street.suburb.city.name',
        },
        {
          text: 'Country',
          value: 'address.street.suburb.city.country.name',
        },

        {
          text: 'Actions',
          sortabble: false,
        },
      ],
      properties: [],
      items: [],
      areas: [],
      loading: false,
      select: null,
      search: null,
      server: 'http://localhost:5000',
      placeholderImage: `http://localhost:5000/photos/placeholder.png`,
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    search(val) {
      if (val && val !== this.select) this.querySelections(val);
    },
  },
  methods: {
    load() {
      API.getProperties().then((properties) => {
        this.properties = properties;
      });
    },
    editItem(item) {
      this.$router.push({
        name: 'PropertyEdit',
        params: {
          id: item.propertyID,
        },
      });
    },
    newProperty() {
      this.$router.push({
        name: 'PropertyEdit',
        params: {
          id: -1,
        },
      });
    },
  },
};
</script>

<style></style>
