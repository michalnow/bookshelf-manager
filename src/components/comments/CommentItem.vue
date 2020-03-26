<template>
  <div v-if="comment !=null">
    <div>
      <v-layout row style="margin:10px">
        <v-flex md6>
          <v-row>
            <v-icon>mdi-account</v-icon>
            <h4 style="textAlign: left;">{{comment.author.substring(0,comment.author.indexOf("@"))}}</h4>
            <v-icon
              style="marginLeft: 10px; outline: none; border: none"
              :color="dynamicLikeColor"
              @click="onLikeClick"
            >mdi-plus</v-icon>
            <h5 style="marginTop:3px">{{comment.likes.length}}</h5>
            <v-icon style="marginLeft: 30px">mdi-minus</v-icon>
            <h5 style="marginTop:3px">{{comment.dislikes.length}}</h5>
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
      isLoggedIn: false,
      like: false,
      dislike: false
    };
  },
  props: {
    comment: Object
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    onLikeClick: async function() {}
  },
  computed: {
    dynamicLikeColor() {}
  }
};
</script>
