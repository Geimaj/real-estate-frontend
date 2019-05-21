<template>
  <v-card class="text-xs-center" color="green" dark width="900">
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="values"
          :labels="years"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">
        Sales from {{ years[0] }} - {{ years[years.length - 1] || years[0] }}
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text>
      <v-data-table :headers="headers" :items="salesData">
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.year }}</td>
          <td class="text-xs-left">R {{ props.item.amount }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import API from '@/lib/API';

export default {
  data: () => ({
    values: [],
    years: [],
    headers: [
      {
        text: 'Year',
        align: 'left',
        value: 'year',
      },
      { text: 'Total Sales', value: 'amount', align: 'left' },
    ],
    salesData: [],
  }),
  mounted() {
    this.load();
  },
  computed: {
    minYear: function() {
      return 'zero';
    },
    maxYear: function() {
      return 'now';
    },
  },
  methods: {
    load() {
      API.getSaleYears().then((years) => (this.years = years.sort()));
      API.getSales().then((sales) => {
        let data = sales
          .map((sale) => {
            return {
              amount: sale.amount,
              date: sale.date,
            };
          })
          .sort((saleA, saleB) => new Date(saleA.date) > new Date(saleB.date));

        let saleData = {};

        let result = [];

        data.forEach((element) => {
          let year = new Date(element.date).getFullYear();
          let currentVal = saleData[year] || 0;
          saleData[year] = Number(currentVal) + Number(element.amount);
        });

        this.salesData = saleData;

        let amounts = [];

        Object.keys(saleData).forEach((key, i) => {
          // console.log(`${key} ${i} ${saleData[key]}`);
          amounts[i] = saleData[key];
          result.push({
            year: key,
            amount: saleData[key],
          });
        });
        this.salesData = result;
        this.values = amounts;
      });
    },
  },
};
</script>
