<template>
  <v-container>
    <v-flex xs2 sm12 offset-sm1 align-center justify-center>
      <div style="display: grid; gridTemplateColumns: repeat(6,250px); gridGap: 1rem ">
        <div v-for="book in books" v-bind:key="book.id">
          <v-chip style="marginBottom: 2px" outlined color="indigo" small>
            <v-icon>mdi-book</v-icon>
            {{book.genre}}
          </v-chip>
          <v-card
            class="elevation-8"
            max-width="200px"
            color="white"
            style="border: none; marginBottom: 5px"
          >
            <router-link :to="'/book/' + book.id" style="textDecoration: none; color: black">
              <v-img
                :src="`${book.poster}`"
                style="backgroundSize: cover; width:300px; height: 300px"
              ></v-img>
              <h4 style="textAlign: center">{{book.title}}</h4>
            </router-link>
            <v-rating
              v-model="book.rating"
              color="yellow darken-3"
              background-color="grey-darken-1"
              half-increments
              readonly
            ></v-rating>
          </v-card>
        </div>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
export default {
  name: "BookList",
  data() {
    return {
      books: []
    };
  },
  created() {
    db.collection("books")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            author: doc.data().author,
            title: doc.data().title,
            genre: doc.data().genre,
            plot: doc.data().plot,
            poster: doc.data().poster,
            publishDate: doc.data().publishDate,
            rating: doc.data().rating
          };
          this.books.push(data);
        });
      });
  }
};
</script>
