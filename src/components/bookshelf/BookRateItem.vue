<template >
  <div style="margin-top: 30px">
    <v-flex xs12 md12 class="float-left pa-4">
      <v-card width="330px" height="555px" v-if="book != null">
        <v-row>
          <v-col style="marginTop: -12px">
            <v-chip style="marginBottom: 2px" outlined color="white" small>
              <v-icon>mdi-book</v-icon>
              {{book.genre}}
            </v-chip>
          </v-col>
        </v-row>
        <router-link :to="'/book/' + book.id" style="textDecoration: none; color: black">
          <v-img contain :src="`${book.poster}`" style="backgroundSize: cover; height: 320px "></v-img>
          <v-card-title style="color: white; textAlign: center; wordWrap: break-word">
            <v-spacer></v-spacer>
            {{book.title}}
            <v-spacer></v-spacer>
          </v-card-title>
        </router-link>
        <div style="textAlign: center">
          <h3 v-if="bookRating != null">Your rating: {{bookRating}}</h3>
          <v-rating
            v-model="bookRating"
            color="yellow darken-3"
            background-color="grey-darken-1"
            half-increments
            @input="onRate"
          ></v-rating>

          <h3>Current rating: {{Math.round((book.rating) * 10) / 10}}</h3>
        </div>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";

export default {
  name: "BookRateItem",
  data() {
    return {
      isLoggedIn: false,
      currentUser: "",
      bookRating: null
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

    this.book.usersRating.map(obj => {
      console.log(obj);
      if (obj.email == this.currentUser) {
        this.bookRating = obj.rate;
        console.log(this.bookRating);
      }
    });
  },
  methods: {
    onRate: async function() {
      if (this.book.usersRating.some(e => e.email == this.currentUser)) {
        let bookRate = (this.bookRating + this.book.rating) / 2;
        let userRate = this.bookRating;
        let user = this.currentUser;
        let userRatingArr = this.book.usersRating;

        userRatingArr.map(obj => {
          if (obj.email == this.currentUser) {
            obj.rate = this.bookRating;
          }
        });

        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            rating: bookRate,
            usersRating: userRatingArr
          });
        });
        batch.commit();
      } else {
        let bookRate = (this.bookRating + this.book.rating) / 2;
        let userRate = this.bookRating;
        let user = this.currentUser;
        let userRatingArr = this.book.usersRating;

        userRatingArr.push({ email: this.currentUser, rate: this.bookRating });

        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            rating: bookRate,
            usersRating: userRatingArr
          });
        });
        batch.commit();
      }
    }
  },
  computed: {}
};
</script>