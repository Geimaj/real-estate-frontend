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
          :items="filteredSearchItems"
          :search-input.sync="search"
          item-text="name"
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
              <v-select label="Beds" v-model="beds" :items="bedBathItems">
              </v-select>
            </v-flex>
            <v-flex xs2 md1>
              <v-select label="Baths" v-model="baths" :items="bedBathItems">
              </v-select>
            </v-flex>
            <v-flex xs2 md1>
              <v-select
                label="Pool"
                v-model="pool"
                :items="poolItems"
                return-object
                item-value="value"
                item-text="text"
              >
              </v-select>
            </v-flex>
            <v-flex xs2 md2>
              <v-text-field
                label="Min Price"
                v-model="price.min"
                prefix="R"
                mask="##########"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs2 md2>
              <v-text-field
                label="Max Price"
                v-model="price.max"
                prefix="R"
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
                {{
                  property.address.street &&
                    property.address.street.suburb.name
                }},
                {{
                  property.address.street &&
                    property.address.street.suburb.city.name
                }}
              </h3>
              <v-chip color="teal" text-color="white"
                >{{ property.beds }} beds</v-chip
              >
              <v-chip color="light-green" text-color="white"
                >{{ property.baths }} baths</v-chip
              >
              <v-chip
                v-if="Number(property.pool) > 0"
                color="primary"
                text-color="white"
                >Pool</v-chip
              >
              <v-divider></v-divider>
              <div>{{ property.description }}</div>
              <div>
                {{ property.address.street && property.address.street.name }}
              </div>
              <div>
                <h4>R{{ property.listingPrice }}</h4>
              </div>
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
      beds: API.bedBathItems[0],
      bedBathItems: API.bedBathItems,
      baths: API.bedBathItems[0],
      poolItems: API.poolItems,
      pool: API.poolItems[0],
      price: {
        min: null,
        max: null,
      },
      properties: [],
      suburbs: [],
      filteredSearchItems: [],
      cities: [],
      loading: false,
      select: null,
      search: null,
    };
  },
  computed: {
    searchTypeName: () => {
      return `Search...`;
    },
  },
  mounted() {
    this.load();
  },
  watch: {
    select(val) {
      this.doSearch();
    },
  },
  methods: {
    load() {
      API.getAvailable().then((properties) => {
        if (properties.length > 0) {
          this.properties = properties;

          let suburbIds = [];
          let uniqueSuburbs = properties
            .map((property) => property.address.street.suburb)
            .sort((a, b) => a.id > b.id)
            .filter((suburb, index, self) => {
              return (
                suburbIds.indexOf(suburb.id) < 0 && suburbIds.push(suburb.id)
              );
            });

          let cityIds = [];
          let uniqueCities = uniqueSuburbs
            .map((suburb) => suburb.city)
            .sort((a, b) => a.id > b.id)
            .filter((city, index, self) => {
              return cityIds.indexOf(city.id) < 0 && cityIds.push(city.id);
            });

          this.cities = uniqueCities;
          this.suburbs = uniqueSuburbs;

          this.filteredSearchItems = uniqueCities;

          let searchTyes = API.searchTypes;
          this.searchTypes = searchTyes;
          this.searchType = this.searchTypes[0];
        }
      });
    },
    getPhoto(src) {
      let path = API.getPhoto(src);
      return path;
    },
    searchTypeChanged(type) {
      this.searchType = type;
      if (type.id == 0) {
        //search cities
        this.filteredSearchItems = this.cities;
      } else {
        //search burbs
        this.filteredSearchItems = this.suburbs;
      }
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
