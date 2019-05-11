<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template> -->
    <v-card>
      <v-card-title>
        <span class="headline">New Country</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="country.name"
                label="Name*"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['country', 'onSave', 'onCancel'],
  data() {
    return {
      countries: [],
      dialog: true,
    };
  },
  methods: {
    save() {
      this.onSave();

      this.dialog = false;
    },
    close() {
      this.onCancel();
      this.dialog = false;
    },
  },
};
</script>

<style></style>
