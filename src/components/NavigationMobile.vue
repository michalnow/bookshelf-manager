<template>
<div id="navigation-mobile">
    <div id="app">
  
        <v-navigation-drawer v-model="drawer" app>
             <v-list dense>
          <v-list-item link to="/books" @click="drawer = false">
            <v-list-item-action>
              <v-icon>mdi-book</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px">All Books  </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/add" @click="drawer = false">
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
    
    
       
 <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <router-link to="/">
          <v-btn text x-large>
            <v-toolbar-title>Bookshelf Manager</v-toolbar-title>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-menu v-if="isLoggedIn" bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              rounded
              large
              style=" color: white; padding: 10px; text-transform-none; marginRight: 10px"
              v-on="on"
              color="indigo darken-4"
            >{{currentUser}}</v-btn>
          </template>
        </v-menu>

    
      </v-app-bar>

      <v-footer color="indigo" app>
        <v-spacer></v-spacer>
        <h5 style="color: white">&copy; 2020</h5>
        <v-spacer></v-spacer>
      </v-footer>

  </div>
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
    userUid: "",
    drawer: false,
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
      this.userUid = firebase.auth().currentUser.uid;
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    forceReload: function() {
      this.drawer = false;
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

<style>
#navigation-mobile {
  padding: 20px 0 0 0;
}
</style>