<template>
  <div class="offset-2" style="margin-top: 30px">
    <v-flex
      xs12
      md4
      align-center
      justify-center
      v-for="book in books  "
      :key="book.id"
      class="float-left pa-4"
    >
      <div offset-1>
        <v-card width="320px" height="520px">
          <v-chip style="marginBottom: 2px" outlined color="indigo" small>
            <v-icon>mdi-book</v-icon>
            {{book.genre}}
          </v-chip>
          <router-link :to="'/book/' + book.id" style="textDecoration: none; color: black">
            <v-img contain :src="`${book.poster}`" style="backgroundSize: cover; height: 350px "></v-img>
            <v-card-title style="textAlign: center; wordWrap: normal">
              <v-spacer></v-spacer>
              {{book.title}}
              <v-spacer></v-spacer>
            </v-card-title>
          </router-link>
          <div style="textAlign: center">
            <v-rating
              v-model="book.rating"
              color="yellow darken-3"
              background-color="grey-darken-1"
              half-increments
              readonly
            ></v-rating>
          </div>
        </v-card>
      </div>
    </v-flex>
  </div>
</template>

<script>
import db from "../firebaseInit.js";
export default {
  name: "GenreBookList",
  data() {
    return {
      books: [],
      componentKey: 0
    };
  },
  created() {
    window.scrollTo(0, 0);
    db.collection("books")
      .where("genre", "==", this.$route.params.genre)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
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
