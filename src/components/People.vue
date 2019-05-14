<template>
  <div>
    <v-toolbar flat>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>{{ personType.text }}</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile
            v-for="item in peopleTypes"
            :key="item.text"
            @click="personTypeChanged(item)"
          >
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Person</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-text-field
                      v-model="editedPerson.firstname"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-text-field
                      v-model="editedPerson.lastname"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-text-field
                      v-model="editedPerson.email"
                      label="Email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-text-field
                      v-model="editedPerson.phone"
                      label="Phone"
                      mask="(###) ### - ####"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-text-field
                      v-model="editedPerson.dob"
                      label="Date of Birth"
                      mask="##/##/####"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg8>
                    <v-checkbox
                      v-model="editedPerson.buyerID"
                      label="Buyer"
                    ></v-checkbox>

                    <v-checkbox
                      v-model="editedPerson.sellerID"
                      label="Seller"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="editedPerson.agentID"
                      label="Agent"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="people" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{ props.item && props.item.firstname }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.lastname }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.phone }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.email }}
        </td>
        <td class="text-xs-right">
          {{ props.item && props.item.dob }}
        </td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      dialog: false,
      valid: true,
      edit: false,
      peopleTypes: API.peopleTypes,
      personType: API.peopleTypes[0],
      editedIndex: -1,
      person: {},
      editedPerson: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        dob: '',
        buyerID: false,
        sellerID: false,
        agentID: false,
      },
      defaultPerson: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        dob: '',
        buyerID: false,
        sellerID: false,
        agentID: false,
      },
      headers: [
        {
          text: 'First name',
          align: 'left',
          value: 'firstname',
        },
        { text: 'Last name', value: 'lastname' },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Date of Birth', value: 'dob' },
        { text: 'Actions' },
      ],
      people: [
        {
          firstname: 'Jamie',
          lastname: 'Gregory',
          phone: '0000000000',
          email: 'me@test.com',
          dob: '1/1/99',
        },
      ],
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Person' : 'Edit Person';
    },
  },
  methods: {
    load() {
      API.getPeople().then((people) => {
        this.people = people;
      });
    },
    save() {
      if (this.valid) {
        console.log(this.editedIndex);
        let promise =
          this.editedIndex === -1
            ? API.addPerson(this.editedPerson)
            : API.updatePerson(this.editedPerson);

        promise
          .then((res) => {
            this.load();
            this.close();
          })
          .catch((err) => alert(err));
      }
    },
    close() {
      this.dialog = false;
      this.editedPerson = Object.assign({}, this.defaultPerson);
      this.editedIndex = -1;
    },
    editItem(item) {
      console.log(item);
      console.log(item.buyerID);
      console.log(item.sellerID);
      console.log(item.agentID);

      this.editedIndex = this.people.indexOf(item);
      this.editedPerson = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') &&
        API.deletePerson(item);
    },
    personTypeChanged(type) {
      this.personType = type;
      type.data().then((people) => {
        this.people = people;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
