<template>
  <v-expansion-panel class="my-0">
    <v-expansion-panel-header disable-icon-rotate>
      <v-row>
        <v-col class="col-12 col-lg-3">
          {{dateupdate(todo.date)}}
        </v-col>
        <v-col class="col-12 col-lg-4 ">
          {{todo.sp}}<span class="text--secondary ml-1 ">{{todo.cab}}</span>
        </v-col>
        <v-col  class="d-flex justify-lg-center justify-start  col-12 col-lg-5">
          {{todo.worker}}
        </v-col>
      </v-row>
      <template v-slot:actions>
        <v-icon color="teal">
          mdi-check
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content >
      <span class="d-block pt-4">
        {{todo.problem}}
      </span>
      <v-row class="mt-3">
        <v-btn class="ma-2" outlined color="#23539c">Принять</v-btn>
        <v-btn class="ma-2 ml-auto" outlined color="green">Завершить</v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import dateFormat from "dateformat"
export default {
  name: "App",
  props: {
    todo: {
      date: '',
      sp: '',
      cab: '',
      worker: '',
      problem: '',
    }
  },
  methods: {
    dateupdate(todo) {
      // var dateFormat = require("dateformat");
      return dateFormat(todo, 'paddedShortDate')
    }
  }
};
</script>