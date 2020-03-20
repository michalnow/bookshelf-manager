<template>
  <v-toolbar dense color="#E0F2F1" class="pa-0">
    <v-row>
      <v-col>
        <router-link to="/">
          <v-btn text x-large>
            <v-icon color="#616161" large>mdi-home</v-icon>Bookshelf-Manager
          </v-btn>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link to="/books">
          <v-btn text x-large>
            <v-icon color="#616161" large outline="true">mdi-book</v-icon>Book
          </v-btn>
        </router-link>
        <router-link to="/about">
          <v-btn text x-large>About</v-btn>
        </router-link>
        <router-link to="/add">
          <v-btn text x-large>
            <v-icon color="#616161" large outline="true">mdi-plus</v-icon>Add
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-toolbar>
</template>