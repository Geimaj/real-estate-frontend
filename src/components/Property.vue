<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card>
          <v-card-media :src="property.photos[0]" height="600px">
          </v-card-media>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ property.suburb }}</h3>
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
                  id: property.id,
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
                  id: property.id,
                },
              }"
              >BUY</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg4>
        <v-card>
          <v-card-title><h4>Name</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Price:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.price
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Date Listed:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                property.price
              }}</v-list-tile-content>
            </v-list-tile>
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
              <v-list-tile-content>Square meters::</v-list-tile-content>
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
          </v-list>
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
      property: {
        photos: [
          {
            path: API.getPhoto(''),
          },
        ],
        date: new Date(),
      },
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
    },
  },
};
</script>

<style></style>
