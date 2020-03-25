<template>
  <v-container v-if="book !== null">
    <v-layout row offset-2>
      <v-flex sm12 md2></v-flex>
      <v-flex wm12 md8>
        <v-flex>
          <div v-bind:key="book.id">
            <v-card style="padding: 10px;">
              <v-row>
                <v-chip style="marginBottom: 2px; marginLeft:3px" outlined color="indigo">
                  <v-icon style="padding: 10px">mdi-book</v-icon>
                  {{book.genre}}
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  style="marginBottom: 2px; marginRight:3px"
                  outlined
                  color="indigo"
                  @click="onLikeClick()"
                >
                  <v-icon style="padding: 10px" :color="dynamicColor">mdi-heart</v-icon>
                  {{book.likes}}
                </v-chip>
              </v-row>
              <v-card-title
                style="color: black; fontSize: 24px; fontWeight: bold; textAlign: center"
              >
                <v-spacer></v-spacer>
                {{book.title}}
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
      color: "grey",
      flag: false,
      likes: 0,
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
    onLikeClick: async function() {
      if (!this.flag) {
        let bookLikes = this.book.likes;
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { likes: bookLikes + 1 });
        });
        batch.commit();
      } else {
        let bookLikes = this.book.likes;
        var batch = db.batch();
        var querySnapshot = await db
          .collection("books")
          .where("title", "==", this.book.title)
          .get();
        querySnapshot.forEach(function(doc) {
          batch.update(doc.ref, { likes: bookLikes - 1 });
        });
        batch.commit();
      }
      this.flag = !this.flag;
    },
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
    db.collection("books").onSnapshot(snapshot => {
      const docs = snapshot.docs.map(doc => {
        return doc.id == this.$route.params.bookId
          ? (this.book = doc.data())
          : null;
      });
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
  },
  computed: {
    dynamicColor() {
      return this.flag ? "red" : "grey";
    }
  }
};
</script>
