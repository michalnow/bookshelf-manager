<template>
  <v-container style="margin-top: 30px">
    <v-flex sm12 md12>
      <div>
        <v-flex align-center justify-center v-for="book in books" :key="book.id">
          <div>
            <BookshelfItem :book="book"></BookshelfItem>
          </div>
        </v-flex>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
import BookshelfItem from "./BookshelfItem";
export default {
  name: "BookshelfList",
  data() {
    return {
      currentUser: ""
    };
  },
  components: {
    BookshelfItem
  },
  props: {
    books: Array
  },
  created() {
    window.scrollTo(0, 0);
  }
};
</script>
