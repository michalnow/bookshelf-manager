<template >
  <div>
    <v-flex xs12 md4 class="float-left pa-4">
      <v-card width="320px" height="520px" v-if="book != null">
        <v-row>
          <v-col style="marginTop: -12px">
            <v-chip style="marginBottom: 2px" outlined color="indigo" small>
              <v-icon>mdi-book</v-icon>
              {{book.genre}}
            </v-chip>
          </v-col>
          <v-spacer></v-spacer>
          <v-col style="marginTop: -12px">
            <v-chip style="marginBottom: 2px" outlined @click="onLikeClick" :color="dynamic" small>
              <v-icon :color="dynamic">mdi-heart</v-icon>Bookshelf
            </v-chip>
          </v-col>
        </v-row>
        <router-link :to="'/book/' + book.id" style="textDecoration: none; color: black">
          <v-img contain :src="`${book.poster}`" style="backgroundSize: cover; height: 350px "></v-img>
          <v-card-title style="textAlign: center; wordWrap: break-word">
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
    </v-flex>
  </div>
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
    onLikeClick: async function() {
      if (
        !this.book.favourites.includes(this.currentUser) &&
        !this.book.reading.includes(this.currentUser) &&
        !this.book.wantRead.includes(this.currentUser)
      ) {
        let bookfavourites = this.book.favourites;
        bookfavourites.push(this.currentUser);
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { favourites: bookfavourites });
        });
        batch.commit();
      } else {
        let bookfavourites = this.book.favourites;
        let bookReading = this.book.reading;
        let bookWant = this.book.wantRead;
        const index = bookfavourites.indexOf(this.currentUser);
        const readingIndex = bookReading.indexOf(this.currentUser);
        const wantIndex = bookWant.indexOf(this.currentUser);
        if (index > -1) {
          bookfavourites.splice(index, 1);
        }
        if (readingIndex > -1) {
          bookReading.splice(readingIndex, 1);
        }
        if (wantIndex > -1) {
          bookWant.splice(wantIndex, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            favourites: bookfavourites,
            reading: bookReading,
            wantRead: bookWant
          });
        });
        batch.commit();
      }
    }
  },
  computed: {
    dynamic() {
      return this.book.favourites.includes(this.currentUser) ||
        this.book.reading.includes(this.currentUser) ||
        this.book.wantRead.includes(this.currentUser)
        ? "red"
        : "grey";
    }
  }
};
</script>

