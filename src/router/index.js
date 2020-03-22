import Vue from "vue";
import Router from "vue-router";
import EditBook from "@/components/EditBook";
import Landing from "@/components/Landing";
import ViewBook from "@/components/ViewBook";
import NewBook from "@/components/NewBook";
import BookList from "@/components/book/BookList";
import BookItem from "@/components/book/BookItem";
import GenreBookList from "@/components/book/GenreBookList";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Landing",
      component: Landing
    },
    {
      path: "/editBook/:book_id",
      name: "EditBook",
      component: EditBook
    },
    {
      path: "/add",
      name: "NewBook",
      component: NewBook
    },
    {
      path: "/books",
      name: "BookList",
      component: BookList
    },
    {
      path: "/book/:bookId",
      name: "BookItem",
      component: BookItem
    },
    {
      path: "/:genre",
      name: "GenreBookList",
      component: GenreBookList
    }
  ]
});
