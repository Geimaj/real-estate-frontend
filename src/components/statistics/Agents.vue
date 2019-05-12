<template>
  <div>
    <div class="text-xs-center mt-3">
      <v-flex xs12 sm6 d-flex>
        <v-select
          v-model="year"
          :items="years"
          label="Year"
          v-on:change="yearChanged"
          outline
        ></v-select>
      </v-flex>
    </div>
    <v-tabs v-model="active" dark slider-color="yellow">
      <v-tab v-for="n in tabs" :key="n" ripple>{{ n }}</v-tab>
      <v-tab-item v-for="n in tabs" :key="n">
        <v-card flat>
          <v-data-iterator
            :items="max"
            content-tag="v-layout"
            row
            wrap
            hide-actions
          >
            <template v-slot:item="props">
              <v-flex xs12 sm6 md4 lg3>
                <v-card>
                  <v-card-title><h4>Best Performer</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content>First name:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{
                        props.item.firstname
                      }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Last name:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{
                        props.item.lastname
                      }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Value sold:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{
                        props.item.totalValueSold
                      }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </v-card>

        <v-divider></v-divider>

        <v-card flat>
          <v-card-title>All Agents</v-card-title>
          <v-data-table :headers="headers" :items="agents" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.firstname }}</td>
              <td class="text-xs-right">{{ props.item.lastname }}</td>
              <td class="text-xs-right">{{ props.item.totalValueSold }}</td>
              <td class="text-xs-right">{{ props.item.totalSales }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      year: 2018,
      tabs: ['Max', 'Average'],
      active: 0,
      max: [
        {
          firstname: 'jamie',
          lastname: 'gregory',
          totalValueSold: 100,
        },
      ],
      headers: [
        {
          text: 'First name',
          align: 'left',
          value: 'firstname',
        },
        { text: 'Last name', value: 'lastname' },
        { text: 'Total Sales Value($)', value: 'totalValueSold' },
        { text: 'Properties Sold', value: 'totalSales' },
      ],
      agents: [
        {
          firstname: 'luke',
          lastname: 'malherbe',
          totalValueSold: 50,
          totalSales: 3,
        },
      ],
      years: [2018],
    };
  },
  mounted() {
    this.load();
  },

  methods: {
    load() {
      //get years for select
      API.getSaleYears().then((years) => (this.years = years));
      //get data for selected year
      this.loadSalesData();
    },
    loadSalesData() {
      API.getAgentMax(this.year).then((agent) => {
        this.max = agent;
      });
      API.getAgents(this.year).then((agents) => {
        this.agents = agents;
      });
    },

    yearChanged() {
      this.loadSalesData();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
