<template v-slot:extension>
  <v-dialog v-model="dialog" scrollable max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="#ff6600"
        v-on="on"
        v-if="IsMaster !== 1"
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
                  aria-valuemax="5"
                  :rules="[(v) => !!v || 'Поле обязательно']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Обязательные поля</small>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              :disabled="btns.ModalSendEsc"
              text
              @click.prevent="
                () => {
                  dialog = false;
                  $refs.form.reset();
                }
              "
              >Закрыть</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              :loading="loaders.loader"
              type="submit"
              @click.prevent="validate()"
              >Отправить</v-btn
            >
          </v-card-actions>
        </v-card-text>
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
    loaders: {
      loader: null,
    },
    btns: {
      ModalSend: null,
    },
    IsAdmin: 0,
    IsMaster: 0,
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
  }),
  mounted() {
    this.UserIsAdmin();
  },
  methods: {
    UserIsAdmin() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.IsAdmin = user.IsAdmin;
      this.IsMaster = user.IsMaster;
    },
    async validate() {
      if (this.$refs.form.validate()) {
        this.loaders.loader = !this.loaders.loader;
        this.dialog = !this.dialog;
        let data = {
          sp: this.newForm.sp,
          cab: this.newForm.cab,
          text: this.newForm.problem.trim(),
        };
        bus.$emit("create-Todo", data);
        this.$refs.form.reset();
        this.loaders.loader = !this.loaders.loader;
      }
    },
  },
};
</script>
