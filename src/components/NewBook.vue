<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs2 sm6 offset-sm3 align-center justify-center>
        <v-card class="elevation-12">
          <v-toolbar color="indigo">
            <v-spacer></v-spacer>
            <v-toolbar-title style="color: white; fontSize: 24px; fontWeight: bold">Add new book</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-select
                      :items="titles"
                      @change="onChangeTitle"
                      hint="Genre"
                      v-model="title"
                      style="fontSize: 18px"
                      placeholder="click to select"
                      persistent-hint
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      hint="Author"
                      v-model="author"
                      style="fontSize: 18px;"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      hint="genre"
                      v-model="genre"
                      style="fontSize: 18px;"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      hint="Publish date"
                      v-model="date"
                      style="fontSize: 18px;"
                      type="date"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      hint="Pages count"
                      v-model="pages"
                      style="fontSize: 18px;"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      hint="rating"
                      type="number"
                      v-model="rating"
                      style="fontSize: 18px;"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      hint="Poster link"
                      v-model="poster"
                      style="fontSize: 18px;"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      outlined
                      style="marginTop: 10px; fontSize: 12px"
                      hint="plot"
                      v-model="plot"
                      rows="2"
                      persistent-hint
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout row style="textAlign: center">
                  <v-flex>
                    <v-btn
                      rounded
                      outlined
                      x-large
                      color="indigo"
                      style="width: 200px"
                      @click="saveBook"
                    >Save</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import db from "./firebaseInit";
import axios from "axios";
export default {
  name: "NewBook",
  data() {
    return {
      genre: null,
      titles: null,
      title: null,
      author: null,
      date: null,
      poster: null,
      pages: null,
      plot: null,
      genre: null,
      rating: 0,
      books: null,
      favourites: [],
      reading: [],
      usersRating: [],
      wantRead: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:8081/api/book/all")
      .then(response => (this.books = response.data));

    axios
      .get("http://localhost:8081/api/book/titles")
      .then(response => (this.titles = response.data));
  },
  methods: {
    onChangeTitle() {
      this.books.map(book => {
        if (book.title == this.title) {
          this.plot = book.description;
          this.pages = book.pages;
          this.genre = book.genre;
          this.poster = book.poster;
          this.author = book.author;
        }
      });
    },
    saveBook() {
      db.collection("books")
        .add({
          title: this.title,
          publishDate: this.date,
          genre: this.genre,
          author: this.author,
          poster: this.poster,
          plot: this.plot,
          pages: this.pages,
          rating: parseFloat(this.rating),
          favourites: this.favourites,
          reading: this.reading,
          usersRating: this.usersRating,
          wantRead: this.wantRead,
          likes: []
        })
        .then(docRef => {
          this.$router.push("/books");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>