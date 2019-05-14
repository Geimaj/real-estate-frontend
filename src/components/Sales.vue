<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Sales</v-toolbar-title>

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
          text: 'Agent',
          align: 'left',
          value: 'listingPrice',
        },
        {
          text: 'Buyer',
          align: 'left',
          value: 'listingPrice',
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
      API.getSales().then((properties) => {
        console.log(properties);
        this.properties = properties;
      });
    },
  },
};
</script>

<style></style>
