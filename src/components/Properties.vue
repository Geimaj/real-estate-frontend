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
    <v-data-table
      :headers="headers"
      :items="properties"
      class="elevation-1"
      :pagination.sync="pagination"
    >
      <template v-slot:items="props">
        <td class="text-xs-right">
          R{{ (props.item && props.item.listingPrice) || '(not for sale)' }}
        </td>
        <td class="text-xs-right">
          <a @click="propertyClicked(props.item)">
            {{ props.item && props.item.address.street.name }}
          </a>
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
      pagination: {
        sortBy: 'listingPrice',
      },
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
      this.pagination.descending = true;
      API.getProperties().then((properties) => {
        this.properties = properties;
      });
    },
    propertyClicked(property) {
      this.$router.push({
        name: 'Property',
        params: {
          id: property.propertyID,
        },
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
