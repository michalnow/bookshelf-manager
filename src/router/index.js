import Vue from "vue";
import Router from "vue-router";
import EditBook from "@/components/EditBook";
import Landing from "@/components/Landing";
import ViewBook from "@/components/ViewBook";
import NewBook from "@/components/NewBook";
import ShowBooks from "@/components/ShowBooks";
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
      path: "/book/:book_id",
      name: "ViewBook",
      component: ViewBook
    },
    {
      path: "/books",
      name: "ShowBooks",
      component: ShowBooks
    }
  ]
});
