<template>
  <v-tabs>
    <v-tab ripple>
      Details
    </v-tab>
    <v-tab ripple>
      Images
    </v-tab>
    <v-tab ripple v-if="property.propertyID > 0">
      Listing
    </v-tab>
    <v-tab-item>
      <v-form v-model="valid">
        <v-container>
          <v-layout row wrap>
            <v-flex xs3 md2>
              <v-text-field
                v-model="property.bedrooms"
                mask="###"
                label="Bedrooms"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs3 md2>
              <v-text-field
                v-model="property.bathrooms"
                mask="###"
                label="Bathrooms"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs3 md6>
              <v-checkbox v-model="property.pool" label="Pool"></v-checkbox>
            </v-flex>

            <v-flex xs12 md4>
              <v-select
                v-model="country"
                :items="countries"
                item-text="name"
                item-value="id"
                label="Country"
                return-object
              ></v-select>
            </v-flex>

            <v-flex xs12 md4>
              <v-select
                v-model="city"
                :items="filteredCities"
                item-text="name"
                item-value="id"
                label="City"
                return-object
              ></v-select>
            </v-flex>

            <v-flex xs12 md4>
              <v-select
                v-model="suburb"
                :items="filteredSuburbs"
                item-text="name"
                item-value="id"
                label="Suburb"
                return-object
              ></v-select>
            </v-flex>

            <v-flex xs6 md5>
              <v-text-field
                v-model="address.houseNumber"
                label="House Number"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs6 m5>
              <v-select
                v-model="street"
                :items="filteredStreets"
                item-text="name"
                item-value="id"
                label="Street"
                required
              ></v-select>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex xs12>
              <v-textarea
                outline
                name="input-7-4"
                label="Details"
                v-model="property.description"
              ></v-textarea>
            </v-flex>

            <v-flex xs12 m12>
              <v-btn color="success" @click="save">Save</v-btn>
              <v-btn color="warning" @click="cancel">Cancel</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-tab-item>

    <v-tab-item>
      <v-flex v-for="photo in photos" :key="photo">
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
    <v-tab-item>
      <v-form v-model="valid">
        <v-container>
          <v-layout row wrap>
            <v-flex xs3 md4>
              <v-text-field
                v-model="listing.listingPrice"
                mask="##################"
                label="Price"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs3 md4>
              <v-select
                v-model="listing.agentID"
                :items="agents"
                label="Agent"
                item-text="lastname"
                item-value="agentID"
                required
              ></v-select>
            </v-flex>
            <v-flex xs3 md4>
              <v-select
                v-model="listing.sellerID"
                label="Seller"
                :items="sellers"
                item-text="lastname"
                item-value="agentID"
                required
              ></v-select>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex xs12 m12>
              <v-btn color="success" @click="addListing">Save</v-btn>
              <v-btn color="warning" @click="cancel">Cancel</v-btn>
            </v-flex>

            <v-flex v-if="listing.id >= 0" xs12 m12>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="error" dark v-on="on">Mark as Sold</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Sale Details</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-select
                            label="Buyer*"
                            :items="buyers"
                            v-model="listing.buyerID"
                            item-text="lastname"
                            item-value="id"
                            required
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field
                            v-model="listing.salePrice"
                            mask="##################"
                            label="Sale Price*"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false"
                      >Close</v-btn
                    >
                    <v-btn color="blue darken-1" flat @click="sell()"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      valid: true,
      property: API.emptyProperty,
      listing: API.emptyListing,
      dialog: false,
      agents: [],
      sellers: [],
      buyers: [],
      photos: [],

      country: { id: '', name: '' },
      city: { id: '', name: '' },
      street: { id: '', name: '' },
      suburb: { id: '', name: '' },
      address: {
        houseNumber: '',
      },

      suburbs: [],
      countries: [],
      cities: [],
      streets: [],
      filteredSuburbs: [],
      filteredCountries: [],
      filteredCities: [],
      filteredStreets: [],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.load(id);
  },
  watch: {
    country: {
      handler(country, oldCountry) {
        //update cities when country changes
        const modelCountryID = this.property.address.street.suburb.city.country
          .id;

        if (
          (oldCountry.id && oldCountry.id !== modelCountryID) ||
          country.id !== modelCountryID
        ) {
          this.city = { id: '', name: '' };
          this.bindCities();
        }
      },
      deep: true,
    },
    city: {
      handler(city, oldCity) {
        //update suburbs when city changes
        const modelCityID = this.property.address.street.suburb.city.id;

        if (
          (oldCity.id && oldCity.id != modelCityID) ||
          city.id !== modelCityID
        ) {
          this.suburb = { id: '', name: '' };
          this.bindSuburbs();
        }
      },
      deep: true,
    },
    suburb: function(suburb, oldSuburb) {
      //update streets when suburb changes
      const modelSuburbID = this.property.address.street.suburb.id;

      if (
        (oldSuburb.id && oldSuburb.id != modelSuburbID) ||
        suburb.id !== modelSuburbID
      ) {
        this.street = { id: '', name: '' };
        this.bindStreets();
      }
    },
  },
  methods: {
    load(id) {
      API.getProperty(id).then((property) => {
        this.property = property;
        this.country = property.address.street.suburb.city.country;
        this.city = property.address.street.suburb.city;
        this.suburb = property.address.street.suburb;
        this.street = property.address.street;

        this.listing = API.getAvailable(property.propertyID).then((res) => {
          this.listing = res[0] || emptyListing;
        });

        API.getPropertyPhotos(this.property.propertyID).then((buyers) => {
          this.photos = buyers;
        });
      });
      API.getAgents().then((agents) => {
        this.agents = agents;
      });
      API.getSellers().then((sellers) => {
        this.sellers = sellers;
      });
      API.getBuyers().then((buyers) => {
        this.buyers = buyers;
      });

      Promise.all([
        API.getSuburbs(),
        API.getCountries(),
        API.getCities(),
        API.getStreets(),
      ]).then((values) => {
        this.countries = values[1];
        this.cities = values[2];
        this.suburbs = values[0];
        this.streets = values[3];

        this.bindCities();
        this.bindSuburbs();
        this.bindStreets();
      });
    },
    addListing() {
      if (this.listing.id > 0) {
        console.log('update listing');
      } else {
        console.log('add listin');
        API.addListing(this.listing).then((listing) => {
          this.listing = listing;
        });
      }
    },
    save() {
      if (this.property.propertyID > 0) {
        API.updateProperty(this.property).then((property) => {
          console.log('result:');
          console.log(property);
          if (property.id) {
            this.$router.go(-1);
          } else {
            alert('error updating property');
          }
        });
      } else {
        API.addProperty(this.property).then(
          (property) => (this.property = property),
        );
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    sell() {
      API.makeSale(this.listing).then((sale) => {
        console.log(sale);
      });
    },
    bindCities() {
      this.filteredCities = this.cities.filter((city) => {
        return this.country.id === city.country.id;
      });
    },
    bindSuburbs() {
      this.filteredSuburbs = this.suburbs.filter((suburb) => {
        return this.city.id === suburb.city.id;
      });
    },
    bindStreets() {
      this.filteredStreets = this.streets.filter((street) => {
        return this.suburb.id === street.suburb.id;
      });
    },
  },
};
</script>

<style></style>
