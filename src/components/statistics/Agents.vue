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
    <v-tabs v-model="active" dark slider-color="blue">
      <v-tab>MAX</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-data-iterator
            :items="max"
            content-tag="v-layout"
            row
            wrap
            hide-actions
          >
            <template v-slot:item="props">
              <v-flex xs12 sm12 md12 lg12>
                <v-card>
                  <v-card-title><h4>Best Performing Agent</h4></v-card-title>
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
                    <v-list-tile>
                      <v-list-tile-content
                        >Properites sold:</v-list-tile-content
                      >
                      <v-list-tile-content class="align-end">{{
                        props.item.totalSales
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
          <v-data-table
            :headers="maxHeaders"
            :items="agents"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.firstname }}</td>
              <td class="text-xs-right">{{ props.item.lastname }}</td>
              <td class="text-xs-right">{{ props.item.totalValue }}</td>
              <td class="text-xs-right">{{ props.item.totalSales }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab>AVG</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-data-iterator
            :items="avg"
            content-tag="v-layout"
            row
            wrap
            hide-actions
          >
            <template v-slot:item="props">
              <v-flex xs12 sm12 md12 lg12>
                <v-card>
                  <v-card-title><h4>Best Agent on Average</h4></v-card-title>
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
                      <v-list-tile-content
                        >Average Selling Price:</v-list-tile-content
                      >
                      <v-list-tile-content class="align-end">{{
                        props.item.avgSales
                      }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        Average Time on Market:
                      </v-list-tile-content>
                      <v-list-tile-content class="align-end">{{
                        props.item.avgTimeOnMarket
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
          <v-data-table
            :headers="avgHeaders"
            :items="agents"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.firstname }}</td>
              <td class="text-xs-right">{{ props.item.lastname }}</td>
              <td class="text-xs-right">{{ props.item.avgSales }}</td>
              <td class="text-xs-right">{{ props.item.avgTimeOnMarket }}</td>
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
      avg: [
        {
          firstname: 'jamie',
          lastname: 'gregory',
          avgPrice: 100,
          avgTimeOnMarket: 1,
        },
      ],
      headers: [],
      maxHeaders: [
        {
          text: 'First name',
          align: 'left',
          value: 'firstname',
        },
        { text: 'Last name', value: 'lastname' },
        { text: 'Total Sales Value(R)', value: 'totalValue' },
        { text: 'Properties Sold', value: 'totalSales' },
      ],
      avgHeaders: [
        {
          text: 'First name',
          align: 'left',
          value: 'firstname',
        },
        { text: 'Last name', value: 'lastname' },
        { text: 'Avg Sale Ammount', value: 'avgSales' },
        { text: 'Avg Time on Market', value: 'avgTimeOnMarket' },
      ],
      agents: [],
      years: [2018],
      pagination: {
        sortBy: 'totalValue',
        descending: true,
      },
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      //get years for select
      API.getSaleYears().then((years) => {
        console.log(years);
        if (years.length > 0) {
          this.years = years;
        }
      });
      //get data for selected year
      this.loadSalesData();
    },
    loadSalesData() {
      API.getAgentMax(this.year).then((agent) => {
        console.log(agent);
        this.max = agent;
      });
      API.getAgentAvg(this.year).then((agent) => {
        this.avg = agent;
      });
      API.getAgentStats(this.year).then((agents) => {
        if (agents.length > 0) {
          this.agents = agents;
        }
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
