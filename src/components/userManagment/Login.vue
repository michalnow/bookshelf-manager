<template>
  <v-container>
    <v-layout row wrap style="margin-top: 30px">
      <v-flex sm6 offset-sm3 align-center justify-center>
        <v-card class="elevation-12">
          <v-toolbar color="indigo">
            <v-spacer></v-spacer>
            <v-toolbar-title
              style="color: white; fontSize: 24px; fontWeight: bold"
            >Log in to Bookshelf</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      hint="E-Mail"
                      v-model="email"
                      persistent-hint
                      style="fontSize: 18px;"
                      type="email"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      hint="Password"
                      v-model="password"
                      persistent-hint
                      style="fontSize: 18px;"
                      type="password"
                    ></v-text-field>
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
                      @click="login"
                    >Log in</v-btn>
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
import firebase from "firebase";
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("elo");
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>