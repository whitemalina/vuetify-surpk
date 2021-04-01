<template>

  <v-expansion-panels
      accordion
      focusable
      class="mt-3"
  >
    <item
        v-for="todo in todos"
        v-bind:todo="todo"
        v-bind:key="todo.id"
    ></item>
  </v-expansion-panels>
</template>

<script>

import Item from "./Item";
export default {
  name: "App",
  components: {
    Item,
  },
  props: {
    source: String,
  },
  mounted() {
    fetch('http://api-surpk.herokuapp.com/requests/')
        .then(response => response.json())
        .then(json => {
          setTimeout(() => {
            this.todos = json
            console.log(json)
            this.loading = false
          }, 1000)

        })
  },
  data: () => ({
    firstname: '',
    lastname: '',
    drawer: false,
    dialog: false,
    items: ['СП-1', 'СП-2', 'СП-3', 'СП-4'],
    todos: [],
  }),
  methods: {
    addTodo(todoNew) {
      console.log(this)
      console.log(todoNew)
    }
  },
};
</script>