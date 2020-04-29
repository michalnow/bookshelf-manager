<template>
  <v-container style="margin-top: 30px">
    <v-expansion-panels flat hover popout style="marginTop: -20px" multiple>
      <v-expansion-panel style="textAlign: center; ">
        <v-expansion-panel-header style="textAlign: center; fontSize: 20px">
          <v-spacer></v-spacer>Bookshelf
          <v-spacer></v-spacer>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="marginTop: -15px">
          <BookshelfList :books="bookshelf"></BookshelfList>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel style="textAlign: center;">
        <v-expansion-panel-header style="textAlign: center; fontSize: 20px;">
          <v-spacer></v-spacer>Want to read
          <v-spacer></v-spacer>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="marginTop: -15px">
          <BookshelfWantToReadList :books="wantRead"></BookshelfWantToReadList>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel style="textAlign: center;">
        <v-expansion-panel-header style="textAlign: center; fontSize: 20px;">
          <v-spacer></v-spacer>Reading
          <v-spacer></v-spacer>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="marginTop: -15px">
          <BookshelfReadingList :books="reading"></BookshelfReadingList>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
import BookshelfList from "./BookshelfList";
import BookshelfWantToReadList from "./BookshelfWantToReadList";
import BookshelfReadingList from "./BookshelfReadingList";
export default {
  name: "MyBook",
  data() {
    return {
      bookshelf: [],
      wantRead: [],
      reading: [],
      currentUser: ""
    };
  },
  components: {
    BookshelfList,
    BookshelfWantToReadList,
    BookshelfReadingList
  },
  created() {
    window.scrollTo(0, 0);
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }

    db.collection("books")
      .where("favourites", "array-contains", this.currentUser)
      .orderBy("title")
      .onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const item = doc.data();
            item.id = doc.id;
            return item;
          });
          this.bookshelf = documents;
        },
        error => {
          // handle errors
          alert("Error getting documents: " + error);
        }
      );

    db.collection("books")
      .where("wantRead", "array-contains", this.currentUser)
      .onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const item = doc.data();
            item.id = doc.id;
            return item;
          });
          this.wantRead = documents;
        },
        error => {
          // handle errors
          alert("Error getting documents: " + error);
        }
      );

    db.collection("books")
      .where("reading", "array-contains", this.currentUser)
      .onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const item = doc.data();
            item.id = doc.id;
            return item;
          });
          this.reading = documents;
        },
        error => {
          // handle errors
          alert("Error getting documents: " + error);
        }
      );
  },
  computed: {
    dynamic() {
      return this.bookshelf.includes(this.currentUser) ? "red" : "grey";
    }
  }
};
</script>
