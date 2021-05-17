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
      <v-form ref="form" lazy-validation>
        <v-card-title>
          <span class="headline">Создание заявки</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!--                      <v-col cols="12" sm="6" md="4">-->
              <!--                        <v-text-field-->
              <!--                          label="Legal last name*"-->
              <!--                          hint="example of persistent helper text"-->
              <!--                          persistent-hint-->
              <!--                          required-->
              <!--                        ></v-text-field>-->
              <!--                      </v-col>-->
              <v-col cols="12"> </v-col>
              <v-col cols="12">
                <!--                        <v-text-field label="Password*" type="password" required></v-text-field>-->
                <v-textarea
                  label="Проблема"
                  :rules="[(v) => !!v || 'Поле обязательно']"
                  v-model="newForm.problem"
                  counter
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['СП-1', 'СП-2', 'СП-3', 'СП-4', 'СП-5']"
                  label="СП"
                  v-model="newForm.sp"
                  :rules="[(v) => !!v || 'Поле обязательно']"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newForm.cab"
                  label="Кабинет*"
                  type="number"
                  aria-valuemax="5"
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
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Закрыть</v-btn
          >
          <v-btn color="blue darken-1" text @click="validate">Отправить</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from "../bus";
export default {
  name: "App",
  components: {},
  props: {
    source: String,
  },
  data: () => ({
    newForm: {
      firstname: "",
      lastname: "",
      cab: "",
      problem: "",
      sp: "",
    },

    drawer: true,
    dialog: false,
    items: ["СП-1", "СП-2", "СП-3", "СП-4", "СП-5"],
    nameRules: [
      (v) => {
        if (v >= 60 || v < 0) {
          return "Число должно быть меньше 60 и больше 0";
        }
      },
    ],
    lastNameRules: [(v) => !!v || "Фамилия обязательна"],
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.dialog = !this.dialog;
        let data = {
          sp: this.newForm.sp,
          cab: this.newForm.cab,
          text: this.newForm.problem,
        };
        console.log("modal");
        bus.$emit("create-Todo", data);
      }
    },
  },
};
</script>
