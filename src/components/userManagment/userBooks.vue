<template>
  <v-container>
    <h3 style="textAlign: center; marginBottom: 20px">{{user}} books</h3>

    <v-expansion-panels flat hover popout style="marginTop: -20px" multiple>
      <v-row>
        <v-col>
          <v-expansion-panel>
            <v-expansion-panel style="textAlign: center; ">
              <v-expansion-panel-header style="textAlign: center; fontSize: 20px">
                <v-icon
                  color="green"
                  style="textDecoration: none; boxShadow: none"
                >mdi-book-open-page-variant</v-icon>
                <h5>reading</h5>
              </v-expansion-panel-header>
              <v-expansion-panel-content style="marginTop: -15px">
                <v-flex
                  xs12
                  class="float-left pa-1"
                  v-for="readingBook in reading"
                  :key="readingBook.title"
                >
                  <v-card width="160px" height="220px;" shaped>
                    <router-link
                      :to="'/book/' + readingBook.id"
                      style="textDecoration: none; color: black"
                    >
                      <v-img
                        contain
                        :src="`${readingBook.poster}`"
                        style="backgroundSize: cover; height: 150px "
                      ></v-img>
                      <v-card-title
                        v-if="readingBook.title.length > 14"
                        style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
                      >
                        <v-spacer></v-spacer>
                        {{readingBook.title.substring(0,13) + "..."}}
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <v-card-title
                        v-else
                        style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
                      >
                        <v-spacer></v-spacer>
                        {{readingBook.title}}
                        <v-spacer></v-spacer>
                      </v-card-title>
                    </router-link>
                  </v-card>
                </v-flex>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panel>
        </v-col>
        <v-col>
          <v-expansion-panel>
            <v-expansion-panel style="textAlign: center; ">
              <v-expansion-panel-header style="textAlign:   center; fontSize: 20px">
                <v-icon color="red" style="textDecoration: none; boxShadow: none">mdi-book</v-icon>
                <h5>bookshelf</h5>
              </v-expansion-panel-header>
              <v-expansion-panel-content style="marginTop: -15px">
                <v-flex
                  xs12
                  class="float-left pa-1"
                  v-for="bookshelfBook in bookshelf"
                  :key="bookshelfBook.title"
                >
                  <v-card width="160px" height="220px;" shaped>
                    <router-link
                      :to="'/book/' + bookshelfBook.id"
                      style="textDecoration: none; color: black"
                    >
                      <v-img
                        contain
                        :src="`${bookshelfBook.poster}`"
                        style="backgroundSize: cover; height: 150px "
                      ></v-img>
                      <v-card-title
                        v-if="bookshelfBook.title.length > 14"
                        style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
                      >
                        <v-spacer></v-spacer>
                        {{bookshelfBook.title.substring(0,13) + "..."}}
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <v-card-title
                        v-else
                        style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
                      >
                        <v-spacer></v-spacer>
                        {{bookshelfBook.title}}
                        <v-spacer></v-spacer>
                      </v-card-title>
                    </router-link>
                  </v-card>
                </v-flex>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panel>
        </v-col>
        <v-col>
          <v-expansion-panel>
            <v-expansion-panel style="textAlign: center; ">
              <v-expansion-panel-header style="textAlign: center; fontSize: 20px">
                <v-icon color="blue" style="textDecoration: none; boxShadow: none">mdi-book-search</v-icon>
                <h5>want read</h5>
              </v-expansion-panel-header>
              <v-expansion-panel-content style="marginTop: -15px">
                <v-flex
                  xs12
                  class="float-left pa-1"
                  v-for="wantBook in wantRead"
                  :key="wantBook.title"
                >
                  <v-card width="160px" height="220px;" shaped>
                    <router-link
                      :to="'/book/' + wantBook.id"
                      style="textDecoration: none; color: black"
                    >
                      <v-img
                        contain
                        :src="`${wantBook.poster}`"
                        style="backgroundSize: cover; height: 150px "
                      ></v-img>
                      <v-card-title
                        v-if="wantBook.title.length > 14"
                        style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
                      >
                        <v-spacer></v-spacer>
                        {{wantBook.title.substring(0,13) + "..."}}
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <v-card-title
                        v-else
                        style="textAlign: center; wordWrap: break-word; fontSize: 16px; marginTop: -15px"
                      >
                        <v-spacer></v-spacer>
                        {{wantBook.title}}
                        <v-spacer></v-spacer>
                      </v-card-title>
                    </router-link>
                  </v-card>
                </v-flex>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import db from "../firebaseInit.js";
import firebase from "firebase";
export default {
  name: "userBooks",
  data() {
    return {
      bookshelf: [],
      wantRead: [],
      reading: [],
      currentUser: "",
      user: this.$route.params.user
    };
  },
  components: {},
  created() {
    window.scrollTo(0, 0);
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }

    db.collection("books")
      .where("favourites", "array-contains", this.$route.params.user)
      .orderBy("title")
      .onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const item = doc.data();
            item.id = doc.id;
            return item;
          });
          this.bookshelf = documents;
        },
        error => {
          // handle errors
          alert("Error getting documents: " + error);
        }
      );

    db.collection("books")
      .where("wantRead", "array-contains", this.$route.params.user)
      .onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const item = doc.data();
            item.id = doc.id;
            return item;
          });
          this.wantRead = documents;
        },
        error => {
          // handle errors
          alert("Error getting documents: " + error);
        }
      );

    db.collection("books")
      .where("reading", "array-contains", this.$route.params.user)
      .onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const item = doc.data();
            item.id = doc.id;
            return item;
          });
          this.reading = documents;
        },
        error => {
          // handle errors
          alert("Error getting documents: " + error);
        }
      );
  },
  computed: {
    dynamic() {
      return this.bookshelf.includes(this.currentUser) ? "red" : "grey";
    }
  }
};
</script>
