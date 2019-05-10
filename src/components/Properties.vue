<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-toolbar dark color="teal">
        <v-toolbar-title>Area</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="Search by area"
          solo-inverted
        ></v-autocomplete>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4 v-for="property in properties" :key="property.id">
        <v-card>
          <v-card-media :src="property.images[0]" height="400px"></v-card-media>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ property.name }}</h3>
              <v-chip v-if="property.hasPool" color="primary" text-color="white"
                >Pool</v-chip
              >
              <div>{{ property.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn
              flat
              color="primary"
              :to="{
                name: 'Property',
                params: {
                  id: property.id,
                },
              }"
              >View</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      properties: [],
      items: [],
      areas: [],
      loading: false,
      select: null,
      search: null,
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
      API.getAreas().then((areas) => {
        this.areas = areas;
      });
    },
    querySelections(val) {
      this.loading = true;
      this.items = this.areas.filter((x) => {
        x.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });

      this.loading = false;
    },
  },
};
</script>

<style></style>
