<template>
  <v-tabs>
    <v-tab ripple>
      Details
    </v-tab>
    <v-tab ripple>
      Images
    </v-tab>
    <v-tab-item>
      <v-form v-model="valid">
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-text-field
                v-model="property.price"
                :rules="priceRules"
                label="Price"
                prefix="R"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-text-field
                v-model="property.bedrooms"
                :rules="bedroomRules"
                label="Bedrooms"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field
                v-model="property.bathrooms"
                :rules="bathroomRules"
                label="Bathrooms"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md2>
              <v-checkbox v-model="property.pool" label="Pool"></v-checkbox>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                v-model="property.street"
                label="Street"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-combobox
                v-model="property.suburb"
                :items="suburbs"
                item-text="name"
                item-value="id"
                label="Suburb"
              ></v-combobox>
            </v-flex>

            <v-flex xs12 md6>
              <v-combobox
                v-model="property.city"
                :items="cities"
                item-text="name"
                item-value="id"
                label="City"
              ></v-combobox>
            </v-flex>

            <v-flex xs12 md6>
              <v-combobox
                v-model="property.country"
                :items="countries"
                item-text="name"
                item-value="id"
                label="Country"
              ></v-combobox>
            </v-flex>

            <v-btn color="success">Save</v-btn>
            <v-btn color="warning" @click="warning">Cancel</v-btn>
            <v-btn color="error">Delete</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-tab-item>

    <v-tab-item>
      <v-flex v-for="photo in property.photos" :key="photo">
        <v-img md6 :src="photo" aspect-ratio="1" class="grey lighten-2">
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-flex>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      valid: true,
      property: {
        bedrooms: 0,
        bathrooms: 0,
        pool: false,
        street: '',
        suburb: 0,
        city: '',
        country: 0,
      },
      suburbs: [],
      countries: [],
      cities: [],
      bedroomRules: [
        (bedrooms) => {
          return true;
        },
      ],
      priceRules: [
        (price) => {
          return true;
        },
      ],
      bathroomRules: [
        (bathrooms) => {
          return true;
        },
      ],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.load(id);
  },
  methods: {
    load(id) {
      API.getProperty(id).then((property) => {
        this.property = property;
      });
      API.getSuburbs().then((suburbs) => {
        this.suburbs = suburbs;
      });
      API.getCountries().then((countries) => {
        this.countries = countries;
      });
      API.getCities().then((cities) => {
        this.cities = cities;
      });
    },
    warning() {
      this.$router.push({
        name: 'Property',
        params: {
          id: this.$route.params.id,
        },
      });
    },
  },
};
</script>

<style></style>
