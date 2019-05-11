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
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>gavel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sell</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Agents</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group prepend-icon="add_location" value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Address</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(address, i) in addressItems"
            :key="i"
            @click="() => addressNav(address[0])"
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
  }),
  methods: {
    properties() {
      this.$router.push({
        name: 'Properties',
      });
    },
    addressNav(addressType) {
      this.$router.push({
        name: addressType,
      });
    },
  },
  props: {
    source: String,
  },
};
</script>
