<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card>
          <v-card-media :src="image" height="600px"> </v-card-media>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                {{ property.address.street.name }},
                {{ property.address.street.suburb.name }}
              </h3>
              <div>{{ property.street }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn
              flat
              color="warning"
              :to="{
                name: 'PropertyEdit',
                params: {
                  id: property.propertyID,
                },
              }"
              >Edit</v-btn
            >
            <v-btn
              flat
              color="error"
              :to="{
                name: 'Property',
                params: {
                  id: property.propertyID,
                },
              }"
              >BUY</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg4>
        <v-card>
          <v-card-title><h4>Property Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Bedrooms:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.bedrooms
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Bathrooms:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.bathrooms
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Square meters:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.squareMeter
              }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Pool:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.pool ? 'Yes' : 'No'
              }}</v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>Street:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.address.street.name
              }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Suburb:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.address.street.suburb.name
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>City:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.address.street.suburb.city.name
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Country:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.address.street.suburb.city.country.name
              }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg4 v-if="property.listingID">
        <v-card>
          <v-card-title><h4>Listing Details</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Price:</v-list-tile-content>
              <v-list-tile-content class="align-end"
                >R{{ listing.listingPrice }}</v-list-tile-content
              >
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Date Listed:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                listing.listingDate
              }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import API from '@/lib/API';

let defaultListing = {
  id: '',
  listingDate: '',
  listingPrice: '',
};

export default {
  data() {
    return {
      image: '',
      listing: defaultListing,
      property: API.emptyProperty,
      photos: [],
    };
  },
  watch: {
    photos(val) {
      this.image = (val && val[0]) || API.getPhoto('');
    },
    property(val) {
      console.log(val);
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.load(id);
  },
  methods: {
    load(id) {
      API.getProperty(id).then((property) => {
        console.log(property);
        this.property = (property && property) || API.emptyProperty;
      });
      API.getAvailable(id).then((listing) => {
        this.listing = (listing && listing[0]) || defaultListing;
      });
      API.getPropertyPhotos(id).then((photos) => {
        this.photos = photos;
      });
    },
    getPhoto(src) {
      return API.getPhoto(src);
    },
  },
};
</script>

<style></style>
