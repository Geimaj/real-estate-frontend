<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap align-start>
      <v-toolbar dark color="blue">
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">
              <span>{{ searchType.name }}</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>

          <v-list>
            <v-list-tile
              v-for="item in searchTypes"
              :key="item.id"
              @click="searchTypeChanged(item)"
            >
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="filteredSuburbs"
          :search-input.sync="search"
          item-text="name"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          return-object
          :label="searchTypeName"
          solo-inverted
        ></v-autocomplete>

        <template v-slot:extension>
          <v-toolbar-items>
            <v-flex xs2 md1>
              <v-select label="Beds" v-model="beds" :items="bedItems">
              </v-select>
            </v-flex>
            <v-flex xs2 md1>
              <v-select label="Baths" v-model="baths" :items="bathItems">
              </v-select>
            </v-flex>
            <v-flex xs2 md1>
              <v-select
                label="Pool"
                v-model="pool"
                :items="poolItems"
                item-value="id"
                item-text="value"
              >
              </v-select>
            </v-flex>
            <v-flex xs2 md2>
              <v-text-field
                label="Min Price"
                v-model="price.min"
                prefix="$"
                mask="##########"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs2 md2>
              <v-text-field
                label="Max Price"
                v-model="price.max"
                prefix="$"
                mask="##########"
              >
              </v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn flat @click="doSearch">Search</v-btn>
          </v-toolbar-items>
        </template>
      </v-toolbar>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md12>{{ properties.length }} Results</v-flex>
      <v-flex xs12 md4 v-for="property in properties" :key="property.id">
        <v-card>
          <v-card-media
            :src="getPhoto(property.photo)"
            height="400px"
          ></v-card-media>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                {{ property.address.street.suburb.name }},
                {{ property.address.street.suburb.city.name }}
              </h3>

              <v-chip
                v-if="Number(property.pool)"
                color="primary"
                text-color="white"
                >Pool</v-chip
              >
              <div>{{ property.description }}</div>
              <div>{{ property.street }}</div>
              <div>R{{ property.listingPrice }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn
              flat
              color="primary"
              :to="{
                name: 'Property',
                params: {
                  id: property.propertyID,
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
      searchTypes: [],
      searchType: {},
      bedItems: ['0+', '1', '2', '3', '4', '5+'],
      beds: '0+',
      bathItems: ['0+', '1', '2', '3', '4', '5+'],
      baths: '0+',
      poolItems: [
        {
          id: 0,
          value: 'Any',
        },
        {
          id: 1,
          value: 'Pool',
        },
        {
          id: 2,
          value: 'No Pool',
        },
      ],
      pool: {
        id: 0,
        value: 'Any',
      },
      price: {
        min: null,
        max: null,
      },
      properties: [],
      suburbs: [],
      filteredSuburbs: [],
      cities: [],
      filteredCities: [],
      loading: false,
      select: null,
      search: null,
    };
  },
  computed: {
    searchTypeName: () => {
      return 'Search by... ';
    },
  },
  mounted() {
    this.load();
  },
  watch: {
    select(val) {
      this.doSearch();
    },
    searchType(val) {
      this.filteredSuburbs = [];
      if (val.id == 0) {
        this.filteredSuburbs = this.suburbs.map((suburb) => suburb.city);
      } else {
        this.filteredSuburbs = this.suburbs;
      }
    },
  },
  methods: {
    load() {
      API.getAvailable().then((properties) => {
        this.properties = properties;
        this.filteredProperties = properties;

        let suburbIds = [];
        let uniqueSuburbs = properties
          .map((property) => property.address.street.suburb)
          .sort((a, b) => a.id > b.id)
          .filter((suburb, index, self) => {
            return (
              suburbIds.indexOf(suburb.id) < 0 && suburbIds.push(suburb.id)
            );
          });

        this.suburbs = uniqueSuburbs;
        this.filteredSuburbs = uniqueSuburbs;

        let searchTyes = API.searchTypes;
        this.searchTypes = searchTyes;
        this.searchType = this.searchTypes[0];
      });

      //get areas from current advertisements

      API.getAreas().then((areas) => {
        this.areas = areas;
      });
    },
    getPhoto(src) {
      let path = API.getPhoto(src);
      return path;
    },
    searchTypeChanged(type) {
      this.searchType = type;
    },
    doSearch() {
      let search = {
        searchType: this.searchType,
        price: this.price,
        pool: this.pool,
        beds: this.beds,
        baths: this.baths,
        price: {
          min: this.price.min || 0,
          max: this.price.max || -1,
        },
        search: this.select,
      };

      API.searchAvailable(search).then((properties) => {
        this.properties = properties;
      });
    },
  },
};
</script>

<style></style>
