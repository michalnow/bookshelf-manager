<template>
  <div v-if="comment !=null">
    <div>
      <v-layout row style="margin:10px">
        <v-flex md6>
          <v-row>
            <v-icon>mdi-account</v-icon>
            <router-link
              :to="'/userBooks/' + comment.author"
              style="textDecoration: none; color: black"
            >
              <h4
                style="textAlign: left;"
              >{{comment.author.substring(0,comment.author.indexOf("@"))}}</h4>
            </router-link>
            <v-icon
              style="marginLeft: 10px; outline: none; border: none; userSelect: none; fontWeight: bold"
              :color="dynamicColorLike"
              @click="onLikeClick"
            >mdi-plus</v-icon>
            <h5 style="marginTop:3px">{{comment.likes.length}}</h5>
            <v-icon
              style="marginLeft: 30px"
              @click="onDisLikeClick"
              :color="dynamicColorDislike"
            >mdi-minus</v-icon>
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
      dislike: false,
      currentUser: ""
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
    onLikeClick: async function() {
      if (
        !this.comment.likes.includes(this.currentUser) &&
        !this.comment.dislikes.includes(this.currentUser)
      ) {
        this.like = !this.like;
        let commentLikes = this.comment.likes;
        commentLikes.push(this.currentUser);
        var batch = db.batch();
        var querySnapshot = await db
          .collection("comments")
          .where("date", "==", this.comment.date)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { likes: commentLikes });
        });
        batch.commit();
      } else if (
        !this.comment.likes.includes(this.currentUser) &&
        this.comment.dislikes.includes(this.currentUser)
      ) {
        this.like = !this.like;
        let commentLikes = this.comment.likes;
        commentLikes.push(this.currentUser);
        this.dislike = !this.dislike;
        let commentdislikes = this.comment.dislikes;
        const index = commentdislikes.indexOf(this.currentUser);
        if (index > -1) {
          commentdislikes.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("comments")
          .where("date", "==", this.comment.date)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            likes: commentLikes,
            dislikes: commentdislikes
          });
        });
        batch.commit();
      } else {
        this.like = !this.like;
        let commentLikes = this.comment.likes;
        const index = commentLikes.indexOf(this.currentUser);
        if (index > -1) {
          commentLikes.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("comments")
          .where("date", "==", this.comment.date)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { likes: commentLikes });
        });
        batch.commit();
      }
    },
    onDisLikeClick: async function() {
      if (
        !this.comment.dislikes.includes(this.currentUser) &&
        !this.comment.likes.includes(this.currentUser)
      ) {
        this.dislike = !this.dislike;
        let commentDislikes = this.comment.dislikes;
        commentDislikes.push(this.currentUser);
        var batch = db.batch();
        var querySnapshot = await db
          .collection("comments")
          .where("date", "==", this.comment.date)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { dislikes: commentDislikes });
        });
        batch.commit();
      } else if (
        !this.comment.dislikes.includes(this.currentUser) &&
        this.comment.likes.includes(this.currentUser)
      ) {
        this.dislikes = !this.dislike;
        let commentDislikes = this.comment.dislikes;
        commentDislikes.push(this.currentUser);
        this.like = !this.like;
        let commentLikes = this.comment.likes;
        const index = commentLikes.indexOf(this.currentUser);
        if (index > -1) {
          commentLikes.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("comments")
          .where("date", "==", this.comment.date)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, {
            dislikes: commentDislikes,
            likes: commentLikes
          });
        });
        batch.commit();
      } else {
        this.dislike = !this.dislike;
        let commentDislikes = this.comment.dislikes;
        const index = commentDislikes.indexOf(this.currentUser);
        if (index > -1) {
          commentDislikes.splice(index, 1);
        }
        var batch = db.batch();
        var querySnapshot = await db
          .collection("comments")
          .where("date", "==", this.comment.date)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { dislikes: commentDislikes });
        });
        batch.commit();
      }
    }
  },
  computed: {
    dynamicColorLike() {
      return this.comment.likes.includes(this.currentUser) ? "green" : "grey";
    },
    dynamicColorDislike() {
      return this.comment.dislikes.includes(this.currentUser) ? "red" : "grey";
    }
  }
};
</script>
