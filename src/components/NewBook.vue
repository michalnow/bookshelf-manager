<template>
  <div id="new-book" style="textAlign: center">
    <h1 style="textAlign: center">Add new Book</h1>
    <div style="width: 50%; textAlign: center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewBook",
  data() {
    return {};
  }
};
</script>