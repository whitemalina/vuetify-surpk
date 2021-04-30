<template>
  <v-expansion-panel class="my-0">
    <v-expansion-panel-header disable-icon-rotate>
      <v-row>
        <v-col class="col-12 col-lg-3">
          {{ dateupdate(todo.date) }}
        </v-col>
        <v-col class="col-12 col-lg-4">
          {{ todo.sp }}<span class="text--secondary ml-1">{{ todo.cab }}</span>
        </v-col>
        <v-col class="d-flex justify-lg-center justify-start col-12 col-lg-5">
          {{ todo.user }}
        </v-col>
      </v-row>
      <template v-slot:actions>
        <v-progress-circular
          :size="22"
          :width="2"
          v-if="todo.status == 2"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <v-icon color="teal" size="22" v-if="todo.status == 3">
          mdi-check
        </v-icon>
        <v-icon color="gray" size="22" v-if="todo.status == 1">
          mdi-clock-outline
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <span class="d-block pt-4">
        {{ todo.text }}
      </span>
      <v-row class="mt-3">
        <v-btn
          height="35"
          class="ma-2 ml-auto"
          width="150"
          v-if="todo.status == 2"
          color="green"
          dark
          @click.prevent="$emit('finish-todo', [todo.id, count])"
        >
          Завершить
          <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
        </v-btn>
        <v-btn
          height="35"
          width="150"
          v-if="todo.status == 1"
          class="ma-2 ml-auto"
          color="#23539c"
          dark
          @click.prevent="$emit('start-todo', [todo.id, count])"
        >
          Принять
          <v-icon dark right> mdi-text-box-check </v-icon>
        </v-btn>
        <v-btn
          height="35"
          v-if="todo.status == 3"
          width="150"
          class="ma-2 ml-auto"
          color="red"
          dark
          @click.prevent="$emit('del-todo', [todo.id, count])"
        >
          удалить
          <v-icon dark right> mdi-delete </v-icon>
        </v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import dateFormat from "dateformat";
export default {
  name: "App",
  props: {
    todo: {
      date: "",
      sp: "",
      cab: "",
      user: "",
      text: "",
      status: "",
    },
    count: null,
  },
  methods: {
    dateupdate(todo) {
      // var dateFormat = require("dateformat");
      return (
        dateFormat(todo, "dd") +
        "." +
        dateFormat(todo, "mm") +
        "." +
        dateFormat(todo, "yy")
      );
    },
  },
};
</script>
