<template>
  <div>
    <v-row style="marginTop: 5px">
      <v-spacer></v-spacer>
      <v-chip style="marginBottom: 2px; itemAlign:center" outlined color="indigo">
        <v-icon style="padding: 10px">mdi-chat</v-icon>
        <h2>Bookworms reviews</h2>
      </v-chip>
      <v-spacer></v-spacer>
    </v-row>
    <v-card
      style="padding: 10px; margin-top:5px; marginBottom: 10px"
      v-for="(comment,index) in comments"
      :key="index"
    >
      <v-spacer></v-spacer>
      <CommentItem :comment="comment"></CommentItem>
      <v-spacer></v-spacer>
    </v-card>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
export default {
  name: "CommentList",
  data() {
    return {};
  },
  props: {
    comments: Array
  },
  components: {
    CommentItem
  }
};
</script>
