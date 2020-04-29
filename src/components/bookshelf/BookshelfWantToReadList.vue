<template>
  <v-container style="margin-top: 30px">
    <v-flex sm12 md12>
      <div>
        <v-flex align-center justify-center v-for="book in books" :key="book.id">
          <div>
            <BookshelfWantToReadItem :book="book"></BookshelfWantToReadItem>
          </div>
        </v-flex>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
import BookshelfWantToReadItem from "./BookshelfWantToReadItem";
export default {
  name: "BookshelfWantToReadList",
  data() {
    return {
      currentUser: ""
    };
  },
  components: {
    BookshelfWantToReadItem
  },
  props: {
    books: Array
  }
};
</script>
