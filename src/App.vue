<template>
  <v-app>
    <div id="app" style="margin-top: 30px">
      <NavigationMobile v-show="mobileView"/>
      <div class="content" :class="{'open':showNav}" >
              <div class="top-bar">
               
                <Navbar v-if="!mobileView" />
                 <router-view/>
              </div>
              </div>
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import NavigationMobile from "./components/NavigationMobile.vue";

export default {
  name: "App",
  data: () => {
    return {
      mobileView: false,
      showNav: false
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    }
  },
  components: {
    Navbar,
    NavigationMobile,
    
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  }
};

</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");

* {
  font-size: 1rem;
}

i {
    font-size: 2rem;
  }

.top-bar {
  display: flex;
  width: 100%;
}

#navigation-icon {
  padding: 10px 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}
</style>

