import Vue from "vue";
import Router from "vue-router";
import Landing from "@/components/Landing";
import NewBook from "@/components/NewBook";
import BookList from "@/components/book/BookList";
import BookItem from "@/components/book/BookItem";
import GenreBookList from "@/components/book/GenreBookList";
import SignUp from "@/components/userManagment/SignUp";
import Login from "@/components/userManagment/Login";
import MyBook from "@/components/bookshelf/MyBook";
import userBooks from "@/components/userManagment/userBooks";
Vue.use(Router);

import firebase from "firebase";
import About from "@/components/About";

let router = new Router({
  routes: [
    {
      path: "/",
      name: "Landing",
      component: Landing
    },
    {
      path: "/add",
      name: "NewBook",
      component: NewBook
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/books",
      name: "BookList",
      component: BookList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/userBooks/:user",
      name: "userBooks",
      component: userBooks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/book/:bookId",
      name: "BookItem",
      component: BookItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "SignUp",
      component: SignUp,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/:genre",
      name: "GenreBookList",
      component: GenreBookList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:userUid/myBooks",
      name: "MyBook",
      component: MyBook,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
//Nav Guards
router.beforeEach((to, from, next) => {
  //CHeck for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //check if not logged in
    if (!firebase.auth().currentUser) {
      //go to login page
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //check if login
    if (firebase.auth().currentUser) {
      //go to login page
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else {
    next();
  }
});

export default router;
