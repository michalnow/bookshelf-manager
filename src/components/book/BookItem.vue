<template>
  <v-container>
    <v-layout row offset-2>
      <v-flex sm12 md2></v-flex>
      <v-flex wm12 md8>
        <v-flex>
          <div v-bind:key="this.book.id">
            <v-card style="padding: 10px;">
              <v-chip style="marginBottom: 2px" outlined color="indigo">
                <v-icon style="padding: 10px">mdi-book</v-icon>
                {{book.genre}}
              </v-chip>
              <v-card-title
                style="color: black; fontSize: 24px; fontWeight: bold; textAlign: center"
              >
                <v-spacer></v-spacer>
                {{this.book.title}}
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <b>Author:</b>
                {{book.author}}
                <br>
                <b>Publish date:</b>
                {{book.publishDate}}
                <br>
                <b>Pages:</b>
                {{book.pages}}
              </v-card-text>

              <v-img
                :src="`${book.poster}`"
                style="width:300px; margin-left: auto;  margin-right: auto;"
                contain
              ></v-img>
              <v-spacer></v-spacer>
              <v-card-subtitle style="textAlign: justify; font-size: 16px;">{{book.plot}}</v-card-subtitle>
            </v-card>
          </div>
        </v-flex>
        <div v-bind:key="this.book.id">
          <v-card style="padding: 10px; margin-top:20px">
            <v-row>
              <v-spacer></v-spacer>
              <v-chip style="marginBottom: 2px; itemAlign:center" outlined color="indigo">
                <v-icon style="padding: 10px">mdi-chat</v-icon>
                <h2>Bookworms reviews</h2>
              </v-chip>
              <v-spacer></v-spacer>
            </v-row>
            <v-spacer></v-spacer>
            <CommentItem v-bind:comments="comments"></CommentItem>
            <v-spacer></v-spacer>
            <div>
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
            </div>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                rounded
                large
                @click="addComment()"
                color="indigo darken-4"
                style="color: white; marginBottom: 5px; "
              >
                <v-icon>mdi-chat</v-icon>Add Comment
              </v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
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

    db.collection("comments")
      .where("bookId", "==", this.$route.params.bookId)
      .onSnapshot(
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
