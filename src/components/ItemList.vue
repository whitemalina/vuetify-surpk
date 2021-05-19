<template>
  <v-col class="mx-auto col-12 col-md-10 col-xl-6 col-lg-8">
    <v-expansion-panels accordion flat readonly>
      <v-expansion-panel class="my-0" style="cursor: default !important">
        <v-expansion-panel-header
          disable-icon-rotate
          style="cursor: default !important; border: 1px solid #23539c"
        >
          <v-row align="center">
            <v-col class="col-12 col-lg-2 spkcolor"> ДАТА</v-col>
            <v-col class="col-12 col-lg-2 spkcolor text-center">
              СП <br />
              <span class="spkcolor-secondary ml-1">КАБИНЕТ</span>
            </v-col>
            <v-col class="col-12 col-lg-4 spkcolor text-center">
              ПРОБЛЕМА
            </v-col>

            <v-col
              class="d-flex spkcolor justify-lg-center justify-start col-12 col-lg-3"
              style="letter-spacing: 1.6666667px"
            >
              ФИО
            </v-col>
          </v-row>
          <template v-slot:actions>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" width="22" height="22">
                  <v-icon color="#23539c" size="22">mdi-magnify</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-actions>
                  <!--                  <v-form class="d-flex align-center">-->
                  <v-text-field
                    v-model="search"
                    class="mx-3 my-0"
                    append-icon="mdi-magnify"
                    single-line
                  ></v-text-field>
                  <!--                  </v-form>-->
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
        </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels focusable class="mt-3">
      <transition-group class="w-100" name="fade"
        ><item
          @del-todo="delTodo"
          @start-todo="startTodo"
          @finish-todo="finishTodo"
          class="w-100"
          v-for="(todo, index) in searching"
          v-bind:todo="todo"
          v-bind:count="index"
          v-bind:key="todo.id"
        ></item
      ></transition-group>
    </v-expansion-panels>
  </v-col>
</template>

<script>
import Item from "./Item";
import { bus } from "@/bus";
export default {
  name: "App",
  components: {
    Item,
  },
  computed: {
    searching() {
      if (!this.search) return this.todos;

      const search = this.search.toLowerCase();

      return this.todos.filter((todo) => {
        const text = (
          todo.sp +
          " " +
          todo.cab +
          " " +
          todo.user +
          " " +
          todo.text +
          " " +
          todo.master
        ).toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
  },
  props: {
    source: String,
  },
  mounted() {
    bus.$on("getAllPosts", () => {
      this.getPosts();
    });
    bus.$on("create-Todo", (data) => {
      this.createTodo(data);
    });
    this.getPosts();
  },
  data: function () {
    return {
      firstname: "",
      lastname: "",
      drawer: false,
      dialog: false,
      items: ["СП-1", "СП-2", "СП-3", "СП-4"],
      todos: [],
      token: null,
      search: "",
    };
  },

  methods: {
    getPosts() {
      if (this.getToken() !== null) {
        fetch("http://surpk-api-last.herokuapp.com/public/api/post", {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setTimeout(() => {
              this.todos = json;
              this.loading = true;
            }, 1000);
          });
      } else {
        this.alert("Вы не авторизованы!", "error");
      }
    },
    delTodo(id) {
      console.log(id);
      fetch(`http://surpk-api-last.herokuapp.com/public/api/post/${id[0]}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
        method: "DELETE",
      }).then((response) => {
        if (response.status == 202) {
          this.alert("Удаление успешно", "info");
          this.todos.splice(id[1], 1);
        } else {
          if (response.status == 401) {
            this.alert("Ошибка аутентификации", "error");
          } else {
            this.alert("Ошибка", "error");
          }
        }
      });
    },
    startTodo(id) {
      console.log(id);
      fetch(`http://surpk-api-last.herokuapp.com/public/api/post/${id[0]}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 2 }),
        method: "PATCH",
      }).then((response) => {
        if (response.status == 202) {
          this.alert("Заявка принята", "success");
          this.todos[id[1]].status = 2;
        } else {
          if (response.status == 401) {
            this.alert("Ошибка аутентификации", "error");
          } else {
            this.alert("Ошибка", "error");
          }
        }
      });
    },
    finishTodo(id) {
      console.log(id);
      fetch(`http://surpk-api-last.herokuapp.com/public/api/post/${id[0]}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 3 }),
        method: "PATCH",
      }).then((response) => {
        if (response.status == 202) {
          this.alert("Заявка завершена", "success");
          this.todos[id[1]].status = 3;
        } else {
          if (response.status == 401) {
            this.alert("Ошибка аутентификации", "error");
          } else {
            this.alert("Ошибка", "error");
          }
        }
      });
    },

    async createTodo(data) {
      let result;
      let s = await fetch(
        `http://surpk-api-last.herokuapp.com/public/api/post`,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          method: "POST",
        }
      )
        .then((response) => {
          if (response.status == 201) {
            this.alert("Создание успешно", "info");
            result = 1;
          } else {
            if (response.status == 401) {
              this.alert("Ошибка аутентификации", "error");
            } else {
              this.alert("Ошибка", "error");
            }
          }
          return response.json();
        })
        .then((data) => {
          return data;
        });
      if (result == 1) {
        s.user = this.getUsername();
        s.status = 1;
        console.log(s);

        this.todos.push(s);
      }
    },
    alert(text, type, duration) {
      this.$emit("alert", text, type, duration);
    },
    getToken() {
      if (this.token == null) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
          this.token = user.token;
        }
      }
      return this.token;
    },
    getUsername() {
      if (this.username == null) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.username = user.username;
      }
      return this.username;
    },
    // addTodo(todoNew) {
    //   // console.log(this);
    //   // console.log(todoNew);
    // },
  },
};
</script>
<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  animation: fadein 1s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  animation: fadein 1s reverse;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.w-100 {
  width: 100%;
}
</style>
