<template>
  <v-container style="margin-top: 30px">
    <v-flex sm12 md12>
      <div>
        <v-flex align-center justify-center v-for="book in books" :key="book.id">
          <div>
            <BookshelfReadingItem :book="book"></BookshelfReadingItem>
          </div>
        </v-flex>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
import BookshelfReadingItem from "./BookshelfReadingItem";
export default {
  name: "BookshelfReadingList",
  data() {
    return {
      currentUser: ""
    };
  },
  components: {
    BookshelfReadingItem
  },
  props: {
    books: Array
  }
};
</script>
