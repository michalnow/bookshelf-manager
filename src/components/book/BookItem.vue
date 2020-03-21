<template>
  <v-container>
    <div style="display: grid; gridTemplateColumns: repeat(2,1fr); gridGap: 30px ">
      <v-flex xs2 sm12 offset-sm2 align-center justify-center>
        <div v-bind:key="this.book.id">
          <v-chip style="marginBottom: 2px" outlined color="indigo">
            <v-icon>mdi-book</v-icon>
            {{book.genre}}
          </v-chip>
          <v-card class="elevation-8" max-width="700px" color="#C5CAE9">
            <v-card-title
              style="color: black; backgroundColor: #C5CAE9; fontSize: 24px; fontWeight: bold; textAlign: center"
            >
              <v-spacer></v-spacer>
              {{this.book.title}}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-row>
              <v-col>
                <v-img :src="`${book.poster}`" max-width="400px"></v-img>
              </v-col>
              <v-col>
                <v-card-text
                  style="fontSize: 18px; textAlign: center; marginLeft: -30px"
                >Written by {{book.author}}</v-card-text>
                <v-card-text
                  style="fontSize: 18px; textAlign: center; marginLeft: -30px"
                >Published {{book.publishDate}}</v-card-text>
                <v-card-text
                  style="fontSize: 18px; textAlign: center; marginLeft: -30px"
                >{{book.pages}} pages</v-card-text>
              </v-col>
            </v-row>
            <v-row style="textAlign: center">
              <v-card-subtitle>{{book.plot}}</v-card-subtitle>
            </v-row>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs2 sm12 align-center justify-center>
        <div v-bind:key="this.book.id">
          <v-chip style="marginBottom: 2px" outlined color="indigo">
            <v-icon>mdi-book</v-icon>
          </v-chip>
          <v-card class="elevation-8" max-width="700px" color="#C5CAE9">
            <v-card-title
              style="color: black; backgroundColor: #C5CAE9; fontSize: 24px; fontWeight: bold; textAlign: center"
            >
              <v-spacer></v-spacer>REVIEWS HERE
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
    </div>
  </v-container>
</template>


<script>
import db from "../firebaseInit.js";
export default {
  name: "BookList",
  data() {
    return {
      book: null
    };
  },
  created() {
    //console.log(this.$route.params.bookId);
    db.collection("books")
      .doc(this.$route.params.bookId)
      .get()
      .then(doc => {
        const data = {
          id: doc.id,
          author: doc.data().author,
          title: doc.data().title,
          genre: doc.data().genre,
          plot: doc.data().plot,
          poster: doc.data().poster,
          pages: doc.data().pages,
          publishDate: doc.data().publishDate
        };
        this.book = data;
      });
    console.log(this.book);
  }
};
</script>
