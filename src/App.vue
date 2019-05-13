<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="properties">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Properties</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="buy">
          <v-list-tile-action>
            <v-icon>shopping_basket</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Buy</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>gavel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sell</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="people">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>People</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group prepend-icon="timeline" value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Statistics</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(stat, i) in statItems"
            :key="i"
            @click="() => nav(stat[2])"
          >
            <v-list-tile-title v-text="stat[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="stat[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group prepend-icon="add_location" value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Address</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(address, i) in addressItems"
            :key="i"
            @click="() => nav(address[0])"
          >
            <v-list-tile-title v-text="address[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="address[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>(not)Real Estates</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    addressItems: [
      ['Country', 'location_city'],
      ['City', 'location_city'],
      ['Suburb', 'location_city'],
      ['Street', 'location_city'],
    ],
    statItems: [
      ['Agents', 'supervised_user_circle', 'AgentStatistics'],
      ['Properties', 'location_city', 'AgentStatistics'],
      ['Sellers', 'location_city', 'AgentStatistics'],
      ['Buyers', 'location_city', 'AgentStatistics'],
    ],
  }),
  methods: {
    properties() {
      this.$router.push({
        name: 'Properties',
      });
    },
    buy() {
      this.$router.push({
        name: 'Buy',
      });
    },
    people() {
      this.$router.push({
        name: 'People',
      });
    },
    nav(routeName) {
      console.log(routeName);
      this.$router.push({
        name: routeName,
      });
    },
  },
  props: {
    source: String,
  },
};
</script>
