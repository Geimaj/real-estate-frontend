<template>
  <v-card class="text-xs-center" color="green" dark width="900">
    <v-flex xs6 sm6 d-flex>
      <v-select
        v-model="year"
        :items="years"
        label="Year"
        v-on:change="yearChanged"
        outline
      ></v-select>
    </v-flex>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            R{{ moneyFormat(item.value) }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">Sales in {{ year }}</div>
    </v-card-text>

    <v-divider></v-divider>
    Total Sales: {{ total }}
  </v-card>
</template>

<script>
import API from '@/lib/API';

export default {
  data: () => ({
    value: [],
    year: 2018,
    years: [],
    sales: [],
  }),
  mounted() {
    this.load();
  },
  computed: {
    total: function() {
      return this.value.reduce((a, b) => a + b);
    },
  },
  methods: {
    load() {
      API.getSaleYears().then((years) => (this.years = years));
      API.getSales().then((sales) => {
        this.sales = sales;
        this.bindSales();
      });
    },
    bindSales() {
      let s = this.sales
        .filter((sale) => new Date(sale.date).getUTCFullYear() == this.year)
        .map((sale) => Number(sale.amount));
      this.value = s;
    },
    yearChanged(year) {
      this.year = year;
      this.bindSales();
    },
    moneyFormat(labelValue) {
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e9
        ? Math.abs(Number(labelValue)) / 1.0e9 + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? Math.abs(Number(labelValue)) / 1.0e6 + 'M'
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? Math.abs(Number(labelValue)) / 1.0e3 + 'K'
        : Math.abs(Number(labelValue));
    },
  },
};
</script>
