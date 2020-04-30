<template>
  <v-container v-if="randomBooks !== null">
    <div class="float-left pa-4" style="margin-top: 30px">
      <h3 style="textAlign: left; padding: 4">MOST POPULAR BOOKS</h3>
      <v-flex
        xs12
        md4
        align-center
        justify-center
        v-for="book in books"
        :key="book.id"
        class="float-left pa-4"
      >
        <div offset-1>
          <v-card width="290px" height="520px">
            <v-chip style="marginBottom: 2px" outlined color="indigo" small>
              <v-icon>mdi-book</v-icon>
              {{ book.genre }}
            </v-chip>
            <router-link
              :to="'/book/' + book.id"
              style="textDecoration: none; color: black"
            >
              <v-img
                contain
                :src="`${book.poster}`"
                style="backgroundSize: cover; height: 350px "
              ></v-img>
              <v-card-title style="textAlign: center">
                <v-spacer></v-spacer>
                {{ book.title }}
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

    <div class="float-left pa-4">
      <h3 style="textAlign: left; padding: 4">Recommended</h3>
      <v-flex
        xs12
        md4
        align-center
        justify-center
        v-for="book in randomBooks.slice(this.rand, this.rand + 5)"
        :key="book.id"
        class="float-left pa-4"
      >
        <div offset-1>
          <v-card width="290px" height="520px">
            <v-chip style="marginBottom: 2px" outlined color="indigo" small>
              <v-icon>mdi-book</v-icon>
              {{ book.genre }}
            </v-chip>
            <router-link
              :to="'/book/' + book.id"
              style="textDecoration: none; color: black"
            >
              <v-img
                contain
                :src="`${book.poster}`"
                style="backgroundSize: cover; height: 350px "
              ></v-img>
              <v-card-title style="textAlign: center">
                <v-spacer></v-spacer>
                {{ book.title }}
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

    <div style="textAlign: center; marginRight: 20px">
      <router-link v-if="!isLoggedIn" link to="/register">
        <v-btn
          x-large
          style="border: solid; borderRadius: 15px; borderColor: indigo"
          >SIgn Up</v-btn
        >
      </router-link>
      <router-link v-if="!isLoggedIn" link to="/login">
        <v-btn
          x-large
          style="border: solid; borderRadius: 15px;borderColor: indigo "
          >Login&nbsp;</v-btn
        >
      </router-link>
    </div>
  </v-container>
</template>

<script>
import db from "./firebaseInit.js";
import firebase from "firebase";
export default {
  name: "Landing",
  data() {
    return {
      isLoggedIn: false,
      books: [],
      randomBooks: [],
      rand: parseInt(Math.random() * 44)
    };
  },
  created() {
    window.scrollTo(0, 0);
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }

    db.collection("books")
      .orderBy("rating", "desc")
      .limit(5)
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
            rating: parseFloat(doc.data().rating)
          };
          this.books.push(data);
        });
      });

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
            rating: parseFloat(doc.data().rating)
          };
          this.randomBooks.push(data);
        });
      });
  }
};
</script>
