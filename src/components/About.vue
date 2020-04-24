<template>
  <v-container>
    <div id="container">
      <div id="header">
        <v-layout row wrap class="mt-2">
          <v-flex xs12>
            <v-carousel>
              <v-carousel-item
                v-for="picture in pictures"
                :src="picture.imageUrl"
                :key="picture.id"
              ></v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </div>

      <div id="left" class="aboutCenterColumn">
        <h1>Who We Are</h1>
        <p>
          <em>Bookshelf Manager</em> is a vertical social network, dedicated to book lovers and all readers.
          Bookshelf Manager is the richest source of information on books and the most independent.
          Sign up and search Bookshelf Manager to find useful, interesting information on millions of books,
          share opinions with other readers, and see what other think by reading their reviews and opinions.
        </p>
        <p>
          <strong>Bookshelf Manager</strong> launched in March 2020.
        </p>
        <h2>A Few Things You Can Do On Bookshelf Manager:</h2>
        <ul>
          <li>Build and update your profile.</li>
          <li>Create your shelves and your wish list.</li>
          <li>Track the books you're reading, have read, and want to read.</li>
          <li>Review and rate books that you read.</li>
          <li>Check out your personalized book recommendations.</li>
          <li>Find out if a book is a good fit for you from our community’s reviews.</li>
        </ul>
      </div>

      <div id="center" class="aboutCenterColumn">
        <h2>What else should you know about Bookshelf Manager?</h2>
        <p>
          All the contents of Bookshelf Manager can be searched even without being a member.
          You must open an account in order to take part in activities, like building your own shelves,
          writing reviews or participating in discussions.
          The only information required to open an account is an e-mail and password.
          All other information is optional, though obviously useful in order to provide better service.
        </p>
        <p>
          In a nutshell,
          <strong>Bookshelf Manager</strong> is where book lovers call home.
        </p>
        <p>
          It is a place where you can see what your friends are reading and vice versa.
          You can create "bookshelves" to organize what
          you've read (or want to read). You can comment on each other's reviews.
          You can find your next favorite book. And on this journey with your
          friends you can explore new territory, gather information, and expand
          your mind.
        </p>
        <p>Knowledge is power, and power is best shared among readers.</p>
      </div>

      <div id="right" class="aboutRightColumn">
        <ul>
          <li>
            <div class="aboutMetric">{{booksQuantitiy}}</div>BOOKS ADDED
          </li>
          <hr>
          <li>
            <div class="aboutMetric">{{commentsQuanitiy}}</div>REVIEWS
          </li>
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script>
import db from "./firebaseInit.js";
import firebase from "firebase";
export default {
  name: "About",
  data() {
    return {
      booksQuantitiy: 0,
      commentsQuanitiy: 0,
      pictures: [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
          id: "afajfjadfaadfa323"
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1525358180237-7399f908a1d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          id: "aadsfhbkhlk1241"
        }
      ]
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }

    db.collection("books")
      .get()
      .then(querySnapshot => {
        this.booksQuantitiy = querySnapshot.docs.length;
      });

    db.collection("comments")
      .get()
      .then(querySnapshot => {
        this.commentsQuanitiy = querySnapshot.docs.length;
      });
  }
};
</script>

<style scoped>

#container {
  margin: 0 auto;
}

#header {
  text-align: center;
}

#left {
  display: table-cell;
  min-height: 150px;
  width: 25%;
}

#center {
  display: table-cell;
  min-height: 150px;
  width: 50%;
}

#right {
  display: table-cell;
  min-height: 150px;
  width: 25%;
}

.aboutCenterColumn h2 {
  font-size: 18px;
  padding-top: 20px;
}

.aboutCenterColumn {
  float: left;
  width: 540px;
  padding-top: 20px;
  margin-right: 20px;
}

.aboutRightColumn h2 {
  font-family: "Merriweather", Georgia, "Times New Roman", serif;
  font-size: 14px;
}

.aboutRightColumn {
  color: #181818;
  font-family: "Merriweather", Georgia, "Times New Roman", serif;
  font-size: 14px;
  line-height: 21px;
  padding-left: 20px;
  padding-top: 20px;
}

.aboutRightColumn ul li {
  list-style-type: none;
  padding: 10px 0px 10px 0px;
}

.aboutMetricBox ul li {
  border-bottom: 1px solid #dddddd;
  list-style-type: none;
  padding-top: 20px;
}

.aboutMetricBox li:first-child {
  padding-top: 10px;
}

.aboutMetric {
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>