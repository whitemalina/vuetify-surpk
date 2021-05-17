<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <!--        <v-navigation-drawer v-model="drawer" app>-->
        <!--          <v-list dense>-->
        <!--            <v-list-item link>-->
        <!--              <v-list-item-action>-->
        <!--                <v-icon>mdi-home</v-icon>-->
        <!--              </v-list-item-action>-->
        <!--              <v-list-item-content>-->
        <!--                <v-list-item-title>Создание заявки</v-list-item-title>-->
        <!--              </v-list-item-content>-->
        <!--            </v-list-item>-->
        <!--            <v-list-item link>-->
        <!--              <v-list-item-action>-->
        <!--                <v-icon>mdi-email</v-icon>-->
        <!--              </v-list-item-action>-->
        <!--              <v-list-item-content>-->
        <!--                <v-list-item-title>Обратная связь</v-list-item-title>-->
        <!--              </v-list-item-content>-->
        <!--            </v-list-item>-->
        <!--          </v-list>-->
        <!--        </v-navigation-drawer>-->

        <v-app-bar app color="#23539c" flat hide-on-scroll dark>
          <!--          <v-app-bar-nav-icon-->
          <!--            @click.stop="drawer = !drawer"-->
          <!--          ></v-app-bar-nav-icon>-->
          <v-toolbar-title>СПК ПОДДЕРЖКА</v-toolbar-title>

          <v-dialog v-model="profile" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <span class="ml-auto" v-if="user == null"
                ><v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="mr-1"
                  @click.prevent="profile = !profile"
                  size="30"
                  right
                >
                  mdi-account-circle
                </v-icon></span
              >
              <span class="ml-auto" v-else>
                <v-icon class="mr-1" @click.prevent="logout()" size="30" right>
                  mdi-exit-to-app
                </v-icon>
                <span class="d-none d-sm-inline">{{ user.username }}</span>
              </span>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Вход</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="loginForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Логин"
                          :rules="loginForm.loginRules"
                          v-model="loginForm.login"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          :rules="loginForm.passRules"
                          v-model="loginForm.password"
                          label="Пароль"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="profile = false">
                  Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click.prevent="auth()">
                  Вход
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>

        <v-main>
          <v-container class="container-f" v-if="user == null">
            <span class="overline">ВЫ НЕ АВТОРИЗОВАНЫ</span>
            <v-btn
              width="175px"
              class="mt-3"
              depressed
              color="primary"
              @click.prevent="profile = !profile"
            >
              ВОЙТИ
            </v-btn>
          </v-container>
          <v-container
            v-if="user !== null"
            fluid
            style="position: relative"
            class="py-2"
          >
            <v-row>
              <v-col class="mx-auto col-12 col-md-10 col-xl-6 col-lg-8">
                <v-expansion-panels accordion flat readonly>
                  <v-expansion-panel
                    class="my-0"
                    style="cursor: default !important"
                  >
                    <v-expansion-panel-header
                      disable-icon-rotate
                      style="
                        cursor: default !important;
                        border: 1px solid #23539c;
                      "
                    >
                      <v-row>
                        <v-col class="col-12 col-lg-3 spkcolor"> ДАТА</v-col>
                        <v-col class="col-12 col-lg-4 spkcolor">
                          СП<span class="spkcolor-secondary ml-1">КАБ</span>
                        </v-col>
                        <v-col
                          class="d-flex spkcolor justify-lg-center justify-start col-12 col-lg-5"
                          style="letter-spacing: 1.6666667px"
                        >
                          ФИО
                        </v-col>
                      </v-row>
                      <template v-slot:actions>
                        <v-icon color="#23539c">
                          mdi-information-outline
                        </v-icon>
                      </template>
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                </v-expansion-panels>
                <ItemList @alert="alert"></ItemList>
              </v-col>
            </v-row>
          </v-container>
          <div class="alerts">
            <transition-group name="fade">
              <v-alert
                :type="alert.type"
                v-for="alert in alerts"
                :key="alert.id"
                class="toast show mb-2"
              >
                {{ alert.text }}
              </v-alert>
            </transition-group>
          </div>
          <modal-send v-if="user !== null"></modal-send>
        </v-main>
        <v-footer color="#23539c" app>
          <span class="white--text copyc"
            >&copy; {{ new Date().getFullYear() }}
            <a href="https://www.surpk.ru">www.surpk.ru</a></span
          >
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import ModalSend from "./components/ModalSend";
import ItemList from "./components/ItemList";
import { bus } from "@/bus";

export default {
  name: "App",

  components: {
    ModalSend,
    ItemList,
  },
  props: {
    source: String,
  },
  methods: {
    getPosts() {
      bus.$emit("getAllPosts");
    },
    token() {
      return this.user.token;
    },
    async changeProfile() {
      this.profile = !this.profile;
    },
    async saveLocalData() {
      await localStorage.setItem("user", JSON.stringify(this.user));
    },
    async loadLocalData() {
      this.user = await JSON.parse(localStorage.getItem("user"));
    },
    logout() {
      localStorage.clear();
      location.reload();
    },
    alert(text, type, duration = 2000) {
      const alert = { text, type, id: Math.random() };
      this.alerts.push(alert);

      setTimeout(() => {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
      }, duration);
    },

    async auth() {
      if (this.$refs.loginForm.validate()) {
        let data = {
          login: this.loginForm.login,
          password: this.loginForm.password,
        };
        let result;
        await fetch("http://surpk-api-last.herokuapp.com/public/api/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status == 200) {
              result = 1;
            } else {
              result = 2;
            }
            return res.json();
          })
          .then((data) => {
            if (result == 1) {
              this.user = data;
              this.saveLocalData();
            }
          });
        if (result == 1) {
          this.changeProfile();
          this.alert("Вы успешно вошли", "success");
          this.getPosts();
        } else {
          this.changeProfile();
          this.alert("Что-то пошло не так", "error");
        }

        this.$refs.loginForm.reset();
        this.$refs.loginForm.resetValidation();
      }
    },
  },

  mounted() {
    this.loadLocalData();
    this.userkak = true;
  },

  data: function () {
    return {
      firstname: "",
      lastname: "",
      account: false,
      drawer: false,
      dialog: false,
      items: ["СП-1", "СП-2", "СП-3", "СП-4"],
      todos: [],
      profile: false,
      loginForm: {
        login: "",
        password: "",
        loginRules: [(v) => !!v || "Логин обязателен"],
        passRules: [(v) => !!v || "Пароль обязателен"],
      },
      alerts: [],
      user: null,
    };
  },
};
</script>

<style lang="css">
.container-f {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
.copyc a {
  color: white !important;
}

.spkcolor {
  color: #23539c;
}

.spkcolor-secondary {
  opacity: 0.75;
  color: #23539c;
}
.alerts {
  width: 300px;
  position: absolute;
  right: 85px;
  bottom: 5px;
  z-index: 99;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transform: translateY(150%);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(150%);
  opacity: 0;
}
</style>
