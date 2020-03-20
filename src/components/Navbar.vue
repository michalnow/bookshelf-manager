
<template>
<div style="height: 70px">  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      
    >
      <v-list dense>
        <v-list-item link to="/books">
          <v-list-item-action >
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Book</v-list-item-title>
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
        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</v-app>
<v-app>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link to="/">
          <v-btn text x-large>
            
             <v-toolbar-title>Bookshelf Manager</v-toolbar-title>
          </v-btn>
      </router-link>
    </v-app-bar>

   
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
  </div>

</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

