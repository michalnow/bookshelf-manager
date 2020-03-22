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
                    <v-text-field
                      hint="Title"
                      v-model="title"
                      persistent-hint
                      style="fontSize: 18px;"
                    ></v-text-field>
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
                    <v-select
                      :items="items"
                      hint="Genre"
                      v-model="genre"
                      style="fontSize: 18px"
                      placeholder="click to select"
                      persistent-hint
                    ></v-select>
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
export default {
  name: "NewBook",
  data() {
    return {
      items: [
        "Art",
        "Biography",
        "Business",
        "Children's",
        "Christian",
        "Classics",
        "Comics",
        "Cookbooks",
        "Ebooks",
        "Fantasy",
        "Fiction",
        "Graphic Novels",
        "Historical Fiction",
        "History",
        "Horror",
        "Memoir",
        "Music",
        "Mystery",
        "Nonfiction",
        "Poetry",
        "Psychology",
        "Romance",
        "Science",
        "Science Fiction",
        "Self Help",
        "Sports",
        "Thriller",
        "Travel",
        "Young Adult"
      ],
      title: null,
      author: null,
      date: null,
      poster: null,
      pages: null,
      plot: null,
      genre: null,
      genreArr: null,
      rating: null
    };
  },
  methods: {
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
          rating: this.rating
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