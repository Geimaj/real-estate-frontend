<template>
  <v-flex xs8 align-end flexbox height="600px">
    <v-card md12>
      <v-img :src="card.src">
        <v-container fill-height fluid pa-2>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <h1>{{ card.title }}</h1>
              <span class="white--text" v-text="card.tag"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      card: {
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        title: 'Gregories',
        tag: 'Life is too short for bad homes.',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
