<template>
  <v-container>
    <div
      v-if="this.book !== null"
      style="display: grid; gridTemplateColumns: repeat(2,1fr); gridGap: 30px "
    >
      <v-flex xs2 sm12 offset-sm2 align-center justify-center>
        <div v-bind:key="this.book.id">
          <v-chip style="marginBottom: 2px" outlined color="indigo">
            <v-icon>mdi-book</v-icon>
            {{book.genre}}
          </v-chip>
          <v-card class="elevation-8" max-width="700px" color="#C5CAE9">
            <v-card-title
              style="color: black; backgroundColor: #C5CAE9; fontSize: 24px; fontWeight: bold; textAlign: center"
            >
              <v-spacer></v-spacer>
              {{this.book.title}}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-row>
              <v-col>
                <v-img :src="`${book.poster}`" max-width="400px"></v-img>
              </v-col>
              <v-col>
                <v-card-text
                  style="fontSize: 18px; textAlign: center; marginLeft: -30px"
                >Written by {{book.author}}</v-card-text>
                <v-card-text
                  style="fontSize: 18px; textAlign: center; marginLeft: -30px"
                >Published {{book.publishDate}}</v-card-text>
                <v-card-text
                  style="fontSize: 18px; textAlign: center; marginLeft: -30px"
                >{{book.pages}} pages</v-card-text>
              </v-col>
            </v-row>
            <v-row style="textAlign: center">
              <v-card-subtitle>{{book.plot}}</v-card-subtitle>
            </v-row>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs2 sm12 align-center justify-center>
        <div v-bind:key="this.book.id">
          <v-chip style="marginBottom: 2px" outlined color="indigo">
            <v-icon>mdi-chat</v-icon>
          </v-chip>
          <v-card class="elevation-8" max-width="700px" color="#C5CAE9">
            <v-card-title
              style="color: black; backgroundColor: #C5CAE9; fontSize: 24px; fontWeight: bold; textAlign: center"
            >
              <v-spacer></v-spacer>REVIEWS HERE
              <v-spacer></v-spacer>
            </v-card-title>
            <v-row>
              <v-spacer></v-spacer>
              <CommentItem v-bind:comments="comments"></CommentItem>
              <v-spacer></v-spacer>
            </v-row>
            <v-row style="textAlign: center">
              <v-card-subtitle></v-card-subtitle>
            </v-row>
            <v-row>
              <v-textarea
                v-model="comment.content"
                rows="1"
                style="border: solid; borderColor: gray; borderWidth: 1px; backgroundColor: white; marginBottom: 5px "
                auto-grow
                clearable
                dense
                placeholder="review"
                rounded
              ></v-textarea>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                rounded
                large
                @click="addComment()"
                color="indigo darken-4"
                style="color: white; marginBottom: 5px"
              >
                <v-icon>mdi-chat</v-icon>Add Comment
              </v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </div>
      </v-flex>
    </div>
  </v-container>
</template>


<script>
import firebase from "firebase";
import db from "../firebaseInit.js";
import CommentItem from "../comments/CommentItem";
export default {
  name: "BookItem",
  data() {
    return {
      book: null,
      isLoggedIn: false,
      currentUser: null,
      comment: {
        bookId: null,
        author: null,
        date: null,
        content: ""
      },
      comments: []
    };
  },
  components: {
    CommentItem
  },
  methods: {
    addComment: function() {
      const comms = this.book.comments;
      console.log(comms);
      this.comment.date = new Date();
      let comm = this.comment;
      //comms.push(this.comment);
      db.collection("comments")
        .add(comm)
        .then(docRef => {
          console.log("add");
        })
        .catch(err => {
          console.log(err);
        });
      this.comment.content = "";
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.comment.author = firebase.auth().currentUser.email;
      this.comment.bookId = this.$route.params.bookId;
    }

    //console.log(this.$route.params.bookId);
    db.collection("books")
      .doc(this.$route.params.bookId)
      .get()
      .then(doc => {
        const data = {
          id: doc.id,
          author: doc.data().author,
          title: doc.data().title,
          genre: doc.data().genre,
          plot: doc.data().plot,
          poster: doc.data().poster,
          pages: doc.data().pages,
          publishDate: doc.data().publishDate,
          comments: doc.data().comments
        };
        this.book = data;
      });

    db.collection("comments").onSnapshot(
      snapshot => {
        const documents = snapshot.docs.map(doc => {
          const item = doc.data();
          return item;
        });
        console.log(documents);
        this.comments = documents;
      },
      error => {
        // handle errors
        alert("Error getting documents: " + error);
      }
    );
  }
};
</script>
