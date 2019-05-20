<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Sales</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-data-table :headers="headers" :items="sales" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-right">R{{ props.item.amount }}</td>
        <td class="text-xs-right">
          <a :href="`/#/property/${props.item.propertyID}`">
            {{ props.item.propertyID }}
          </a>
        </td>
        <td class="text-xs-right">
          {{ props.item.date }}
        </td>
        <td class="text-xs-right">
          {{ props.item.agentLastName }}
        </td>
        <td class="text-xs-right">
          {{ props.item.buyerLastName }}
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
      sales: [],
      headers: [
        {
          text: 'Price',
          align: 'left',
          value: 'amount',
        },
        {
          text: 'Property',
          align: 'left',
          value: 'propertyID',
        },
        {
          text: 'Date',
          align: 'left',
          value: 'date',
        },
        {
          text: 'Agent',
          align: 'left',
          value: 'agentID',
        },
        {
          text: 'Buyer',
          align: 'left',
          value: 'buyerID',
        },
      ],
    };
  },
  mounted() {
    this.load();
  },

  methods: {
    load() {
      API.getSalesDetails().then((sales) => {
        this.sales = sales;
      });
    },
  },
};
</script>

<style></style>
