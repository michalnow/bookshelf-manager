<template>
  <div @mouseover="hover = true" @mouseleave="hover = false" style="backgroundColor: green">elo</div>
</template>

<script>
import db from "../firebaseInit.js";
export default {
  name: "MyBook",
  data() {
    return {
      hover: false
    };
  },
  methods: {
    mouseOver: function() {
      this.active = !this.active;
    }
  }
};
</script>