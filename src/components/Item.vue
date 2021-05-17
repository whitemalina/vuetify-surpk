<template>
  <v-expansion-panel class="my-0">
    <v-expansion-panel-header disable-icon-rotate>
      <v-row align="center">
        <v-col class="col-12 col-lg-2">
          {{ dateupdate(todo.date) }}
        </v-col>
        <v-col class="col-12 col-lg-2 text-center">
          {{ todo.sp }} <br />
          <span class="text--secondary">{{ todo.cab }}</span>
        </v-col>
        <v-col class="col-12 col-lg-4 text-center text-overflow">
          {{ todo.text }}
        </v-col>
        <v-col class="text-center col-12 col-lg-3">
          {{ todo.user }}
          <br />
          <span class="caption">{{ todo.master }}</span>
        </v-col>
      </v-row>
      <template v-slot:actions>
        <v-tooltip bottom v-if="todo.status == 2">
          <template v-slot:activator="{ on, attrs }">
            <v-progress-circular
              v-bind="attrs"
              v-on="on"
              :size="22"
              :width="2"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>
          <span>Выполняется</span>
        </v-tooltip>
        <v-tooltip bottom v-if="todo.status == 3">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="teal" size="22" v-bind="attrs" v-on="on">
              mdi-check
            </v-icon>
          </template>
          <span>Выполнена</span>
        </v-tooltip>
        <v-tooltip bottom v-if="todo.status == 1">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="teal" size="22" v-bind="attrs" v-on="on">
              mdi-clock-outline
            </v-icon>
          </template>
          <span>Ожидание</span>
        </v-tooltip>

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
          width="150"
          class="ma-2 mr-auto"
          color="red"
          v-if="IsMaster !== 1"
          dark
          @click.prevent="$emit('del-todo', [todo.id, count])"
        >
          удалить
          <v-icon dark right> mdi-delete </v-icon>
        </v-btn>
        <v-btn
          height="35"
          class="ma-2 ml-auto"
          width="150"
          v-if="todo.status == 2 && IsMaster == 1"
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
          v-if="todo.status == 1 && IsMaster == 1"
          class="ma-2 ml-auto"
          color="#23539c"
          dark
          @click.prevent="$emit('start-todo', [todo.id, count])"
        >
          Принять
          <v-icon dark right> mdi-text-box-check </v-icon>
        </v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import dateFormat from "dateformat";
export default {
  name: "App",
  data: function () {
    return {
      IsAdmin: 0,
      IsMaster: 0,
      menu: false,
    };
  },
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
  mounted() {
    this.UserIsAdmin();
  },
  methods: {
    UserIsAdmin() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.IsAdmin = user.IsAdmin;
      this.IsMaster = user.IsMaster;
    },

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
<style lang="css">
.text-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50px;
  overflow: hidden;
}
.height {
  max-height: 15px;
}
</style>
