
<template>
  <div style="height: 70px">
    <v-app id="app">
      <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <v-list-item link to="/books">
            <v-list-item-action>
              <v-icon>mdi-book</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px">All Books</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/add">
            <v-list-item-action>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Add</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <h4 style="textAlign: center">Genres</h4>
          <v-list-item
            link
            :to="'/' + genre"
            v-for="genre in genres"
            v-bind:key="genre"
            @click="forceReload"
          >
            <v-list-item-title>{{genre}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
    <v-app>
      <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <router-link to="/">
          <v-btn text x-large>
            <v-toolbar-title>Bookshelf Manager</v-toolbar-title>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-icon v-if="isLoggedIn">mdi-account</v-icon>
        <h4 v-if="isLoggedIn" style="marginRight: 10px">{{currentUser}}</h4>
        <v-btn color="indigo" style="marginRight: 3px" link to="/about">
          <v-icon>mdi-help-circle</v-icon>
          <h2 style="fontWeight: none">&nbsp;About</h2>
        </v-btn>
        <v-btn v-if="!isLoggedIn" color="indigo" style="marginRight: 3px" link to="/register">
          <v-icon>mdi-help-circle</v-icon>
          <h2 style="fontWeight: none">Sign up</h2>
        </v-btn>
        <v-btn v-if="!isLoggedIn" color="indigo" style="marginRight: 3px" link to="/login">
          <v-icon>mdi-help-circle</v-icon>
          <h2 style="fontWeight: none">Log in</h2>
        </v-btn>
        <v-btn v-if="isLoggedIn" color="indigo" style="marginRight: 3px" v-on:click="logout">
          <v-icon>mdi-help-circle</v-icon>
          <h2 style="fontWeight: none">Log out</h2>
        </v-btn>
      </v-app-bar>

      <v-footer color="indigo" app>
        <v-spacer></v-spacer>
        <h5 style="color: white">&copy; 2020</h5>
        <v-spacer></v-spacer>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    source: String
  },
  data: () => ({
    isLoggedIn: false,
    currentUser: false,
    drawer: null,
    genres: [
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
    ]
  }),
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    forceReload: function() {
      this.$router.go();
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>
