<template>
  <v-expansion-panels accordion focusable class="mt-3">
    <transition-group class="w-100" name="fade"
      ><item
        @del-todo="delTodo"
        @start-todo="startTodo"
        @finish-todo="finishTodo"
        class="w-100"
        v-for="(todo, index) in todos"
        v-bind:todo="todo"
        v-bind:count="index"
        v-bind:key="todo.id"
      ></item
    ></transition-group>
  </v-expansion-panels>
</template>

<script>
import Item from "./Item";
import { bus } from "@/bus";
export default {
  name: "App",
  components: {
    Item,
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
