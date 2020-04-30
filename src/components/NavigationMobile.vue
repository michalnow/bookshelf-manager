<template>
  <div id="navigation-mobile">
    <div id="app">
      <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <v-list-item v-show="isLoggedIn" style="margin-left:-10px">
            <v-menu
              v-if="isLoggedIn"
              bottom
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn outlined color="indigo" v-on="on">{{
                  currentUser
                }}</v-btn>
              </template>

              <v-list color="indigo">
                <v-list-item style="textAlign: center">
                  <router-link
                    :to="'/' + userUid + '/myBooks'"
                    style="textDecoration: none; textAlign: center"
                  >
                    <v-list-item-title
                      style="color: white; fontWeight: bold; fontSize: 20px"
                      >My books </v-list-item-title
                    >
                  </router-link>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>

          <v-list-item link to="/about" @click="drawer = false">
            <v-list-item-action>
              <v-icon>fa-info</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px"
                >About
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-show="!isLoggedIn"
            to="/register"
            @click="drawer = false"
          >
            <v-list-item-action>
              <v-icon>fa-user-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px"
                >Sign up
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-show="!isLoggedIn" to="/login" @click="drawer = false">
            <v-list-item-action>
              <v-icon>fa-sign-in-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px"
                >Log in
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="isLoggedIn"
            v-on:click="logout"
            @click="drawer = false"
          >
            <v-list-item-action>
              <v-icon>fa-sign-out-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px"
                >Log out
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/books" @click="drawer = false">
            <v-list-item-action>
              <v-icon>fa-book</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px"
                >All Books
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/add" @click="drawer = false">
            <v-list-item-action>
              <v-icon>fa-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="fontSize: 16px">Add</v-list-item-title>
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
            <v-list-item-title>{{ genre }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <router-link to="/">
          <v-btn text x-large>
            <v-toolbar-title>Bookshelf Manager</v-toolbar-title>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
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
