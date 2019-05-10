<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field
            v-model="lastname"
            :rules="priceRules"
            label="Price"
            prefix="R"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      valid: true,
      firstname: '',
      lastname: '',
      nameRules: [
        (name) => {
          return true;
        },
      ],
      priceRules: [
        (price) => {
          return true;
        },
      ],
    };
  },
  mounted() {
    const id = this.$route.id;
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
