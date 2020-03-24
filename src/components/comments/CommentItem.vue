<template>
  <div>
    <div v-for="(comment, idx) in comments  " :key="idx">
      <v-layout row style="margin:10px">
        <v-flex md6>
          <v-row>
            <v-icon>mdi-account</v-icon>
            <h4 style="textAlign: left;">{{comment.author.substring(0,comment.author.indexOf("@"))}}</h4>
          </v-row>
        </v-flex>
        <v-flex md6>
          <h5
            style="textAlign: right; "
          >{{new Date(comment.date.seconds * 1000).toUTCString().substring(0,25)}}</h5>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <p
        class="font-italic font-weight-medium"
        style="fontSize: 14px; textAlign:justify"
      >{{comment.content}}</p>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
export default {
  name: "CommentItem",
  data() {
    return {
      isLoggedIn: false
    };
  },
  props: {
    comments: Array
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  }
};
</script>
