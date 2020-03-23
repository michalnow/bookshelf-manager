<template>
  <div>
    <div v-for="comment in comments  " :key="comment.date">
      <h4
        style="textAlign: left"
      >{{comment.author}} at {{new Date(comment.date.seconds * 1000).toUTCString().substring(0,25)}}</h4>
      <v-spacer></v-spacer>
      <p class="font-italic font-weight-medium" style="fontSize: 18px">{{comment.content}}</p>
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
