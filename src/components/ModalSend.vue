<template v-slot:extension>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="#ff6600"
        v-on="on"
        v-bind="attrs"
        @click="dialog = !dialog"
        style="bottom: 50px !important; box-shadow: none !important"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form
        ref="form"

        lazy-validation
      >
      <v-card-title>
        <span class="headline">Создание заявки</span>
      </v-card-title>
      <v-card-text>
      
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="firstname"
                label="Имя*"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="lastname"
                :rules="lastNameRules"
                label="Фамилия*"
                hint=""
                required
              ></v-text-field>
            </v-col>
            <!--                      <v-col cols="12" sm="6" md="4">-->
            <!--                        <v-text-field-->
            <!--                          label="Legal last name*"-->
            <!--                          hint="example of persistent helper text"-->
            <!--                          persistent-hint-->
            <!--                          required-->
            <!--                        ></v-text-field>-->
            <!--                      </v-col>-->
            <v-col cols="12">

            </v-col>
            <v-col cols="12">
              <!--                        <v-text-field label="Password*" type="password" required></v-text-field>-->
              <v-textarea
                label="Проблема"
                :rules="[v => !!v || 'Поле обязательно']"
                v-model="problem"
                counter
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['СП-1', 'СП-2', 'СП-3', 'СП-4', 'СП-5']"
                label="СП"
                v-model="sp"
                :rules="[v => !!v || 'Поле обязательно']"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="cab"
                label="Кабинет*"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Обязательные поля</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Закрыть</v-btn>
        <v-btn color="blue darken-1" text @click="validate">Отправить</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>

  </v-dialog>
</template>

<script>
import dateFormat from "dateformat"
import ItemList from "./ItemList";
export default {
  name: "App",
  components: {

  },
  props: {
    source: String,
  },
  data: () => ({
    firstname: '',
    lastname: '',
    cab: '',
    problem: '',
    sp: '',

    drawer: true,
    dialog: false,
    items: ['СП-1', 'СП-2', 'СП-3', 'СП-4', 'СП-5'],
    nameRules: [
      v => !!v || 'Имя обязательно',
    ],
    lastNameRules: [
      v => !!v || 'Фамилия обязательна',
    ],
  }),
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.dialog = !this.dialog

        let data = {
          date: dateFormat(new Date(),'isoDate'),
          worker: this.firstname + ' ' +this.lastname,
          cab: this.cab,
          problem: this.problem,
          sp: this.sp,
        }
        console.log(data)
       let id =  await fetch("http://api-surpk.herokuapp.com/requests/",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(function (res) {
              console.log(data)
              return res.json();
            })
            .then(function (data) {
              // console.log(data['insertId'])
              const id =  data['insertId']
              // console.log(id)
              return id
            })
            .then(id => {
              return id})
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        console.log(ItemList)

        const newTodo = {
          id: id,
          worker: this.worker,
          cab: this.cab,
          problem: this.problem,
          status: "1",
          date: Date.now(),
          sp: this.sp,
        };
        console.log(id);
        ItemList.methods.addTodo(newTodo)
      }
    },
  }
};
</script>