<template>
  <v-container>
    <v-flex sm12 md12>
      <div>
        <v-form>
          <v-row>
            <v-col md="4" xs="12"></v-col>
            <v-col md="4" xs="12">
              <v-text-field
                class="centered-input"
                style="text-align: center"
                label="Search for the book"
                v-model="findName"
              ></v-text-field>
            </v-col>
            <v-col md="4" xs="12"></v-col>
          </v-row>
        </v-form>
        <v-flex align-center justify-center v-for="book in filteredBooks" :key="book.id">
          <div>
            <BookListItem :book="book"></BookListItem>
          </div>
        </v-flex>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
import BookListItem from "./BookListItem";
export default {
  name: "BookList",
  data() {
    return {
      books: [],
      userBooks: [],
      findName: "",
      currentUser: ""
    };
  },
  components: {
    BookListItem
  },
  created() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }

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
            rating: parseFloat(doc.data().rating),
            favourites: doc.data().favourites,
            reading: doc.data().reading,
            wantRead: doc.data().wantRead
          };
          this.books.push(data);
        });
      });
  },
  computed: {
    filteredBooks() {
      let filter = new RegExp(this.findName, "i");
      return this.books.filter(book => book.title.match(filter));
    },
    dynamicColor() {
      console.log(this.comments);
      return this.book.likes.includes(this.currentUser) ? "red" : "grey";
    }
  }
};
</script>

<style>
.centered-input input {
  text-align: center;
}
</style>