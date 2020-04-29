<template>
  <v-flex xs12 class="float-left pa-3" style="margin-top: 30px">
    <v-card width="180px" height="240px;" v-if="book != null" shaped>
      <v-row style="textAlign: center">
        <v-col style="marginTop: -12px">
          <v-icon
            @click="onReading"
            color="green"
            style="textDecoration: none; boxShadow: none"
          >mdi-book-open-page-variant</v-icon>
          <v-icon
            @click="onWantRead"
            color="blue"
            style="textDecoration: none; boxShadow: none"
          >mdi-book-search</v-icon>

          <v-icon
            color="red"
            @click="onDelete"
            style="textDecoration: none; boxShadow: none"
          >mdi-delete-forever</v-icon>
        </v-col>
      </v-row>
      <router-link :to="'/book/' + book.id" style="textDecoration: none; color: black">
        <v-img contain :src="`${book.poster}`" style="backgroundSize: cover; height: 150px "></v-img>
        <v-card-title
          v-if="book.title.length > 18"
          style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
        >
          <v-spacer></v-spacer>
          {{book.title.substring(0,17) + "..."}}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-title
          v-else
          style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
        >
          <v-spacer></v-spacer>
          {{book.title}}
          <v-spacer></v-spacer>
        </v-card-title>
      </router-link>
    </v-card>
  </v-flex>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";

export default {
  name: "BookListItem",
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
    };
  },
  props: {
    book: Object
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    onDelete: async function() {
      if (this.book.favourites.includes(this.currentUser)) {
        let bookfavourites = this.book.favourites;
        const index = bookfavourites.indexOf(this.currentUser);
        if (index > -1) {
          bookfavourites.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { favourites: bookfavourites });
        });
        batch.commit();
      }
    },

    onWantRead: async function() {
      if (this.book.favourites.includes(this.currentUser)) {
        let bookfavourites = this.book.favourites;
        let bookWantRead = this.book.wantRead;
        bookWantRead.push(this.currentUser);
        const index = bookfavourites.indexOf(this.currentUser);
        if (index > -1) {
          bookfavourites.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            favourites: bookfavourites,
            wantRead: bookWantRead
          });
        });
        batch.commit();
      }
    },
    onReading: async function() {
      if (this.book.favourites.includes(this.currentUser)) {
        let bookfavourites = this.book.favourites;
        let booksReading = this.book.reading;
        booksReading.push(this.currentUser);
        const index = bookfavourites.indexOf(this.currentUser);
        if (index > -1) {
          bookfavourites.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            favourites: bookfavourites,
            reading: booksReading
          });
        });
        batch.commit();
      }
    }
  },
  computed: {}
};
</script>