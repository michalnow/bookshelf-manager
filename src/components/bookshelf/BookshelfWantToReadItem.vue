<template>
  <v-flex xs12 class="float-left pa-3" style="margin-top: 30px">
    <v-card width="180px" height="240px;" v-if="book != null" shaped>
      <v-row style="textAlign: center">
        <v-spacer></v-spacer>
        <v-col style="marginTop: -12px">
          <v-icon
            color="red"
            @click="onDelete"
            style="textDecoration: none; boxShadow: none"
          >mdi-delete-forever</v-icon>
        </v-col>
        <v-spacer></v-spacer>
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
      if (this.book.wantRead.includes(this.currentUser)) {
        let booksWantRead = this.book.wantRead;
        let bookfavourites = this.book.favourites;
        bookfavourites.push(this.currentUser);
        const index = booksWantRead.indexOf(this.currentUser);
        if (index > -1) {
          booksWantRead.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            wantRead: booksWantRead,
            favourites: bookfavourites
          });
        });
        batch.commit();
      }
    }
  },
  computed: {}
};
</script>