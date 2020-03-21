<template>
  <v-container>
    <v-flex xs2 sm6 offset-sm2 align-center justify-center>
      <div style="display: grid; gridTemplateColumns: repeat(4,1fr); gridGap: 30px ">
        <div v-for="book in books" v-bind:key="book.id">
          <v-chip style="marginBottom: 2px" outlined color="indigo">
            <v-icon>mdi-book</v-icon>
            {{book.genre}}
          </v-chip>
          <v-card class="elevation-8" max-width="320px" color="#C5CAE9">
            <v-card-title
              style="color: black; backgroundColor: #C5CAE9; fontSize: 24px; fontWeight: bold; textAlign: center"
            >
              <v-spacer></v-spacer>
              {{book.title}}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-img :src="`${book.poster}`"></v-img>
            <v-card-actions>
              <v-row>
                <v-col></v-col>
                <v-col>
                  <router-link :to="'/book/' + book.id">
                    <v-btn
                      color="indigo"
                      x-large
                      rounded
                      style="textAlign: center; fontWeight: bold"
                      outlined
                      text
                    >View details</v-btn>
                  </router-link>
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-card-actions>
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
      .orderBy("genre", "desc")

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
            publishDate: doc.data().publishDate
          };
          this.books.push(data);
        });
      });
  }
};
</script>
