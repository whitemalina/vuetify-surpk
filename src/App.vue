<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-app-bar app color="#23539c" flat hide-on-scroll dark>
          <v-toolbar-title class="mr-auto">СПК ПОДДЕРЖКА</v-toolbar-title>
          <v-dialog v-model="profile" scrollable max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <span class="ml-auto d-flex align-center" v-if="user == null"
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
              <span class="ml-auto d-flex align-center" v-else>
                <v-icon class="mr-1" @click.prevent="logout()" size="30" right>
                  mdi-exit-to-app
                </v-icon>
                <v-dialog
                  v-model="userinfo"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <span
                      v-bind="attrs"
                      v-on="on"
                      @click.prevent="userinfo = true"
                      class="d-none d-sm-inline pointer"
                      >{{ user.username }}</span
                    >
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="userinfo = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Настройки</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn
                          dark
                          text
                          @click="update()"
                          :loading="loaders.updateLoader"
                        >
                          Сохранить
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                    <v-list three-line subheader>
                      <v-subheader>Настройки профиля</v-subheader>
                      <v-list-item>
                        <v-container class="ml-0 pl-0">
                          <!--                          <v-row>-->
                          <!--                            <v-col cols="12" sm="6" md="2">-->
                          <!--                              <v-text-field-->
                          <!--                                v-model="updateForm.firstName"-->
                          <!--                                label="Имя"-->
                          <!--                              ></v-text-field>-->
                          <!--                            </v-col>-->
                          <!--                            <v-col cols="12" sm="6" md="2">-->
                          <!--                              <v-text-field-->
                          <!--                                v-model="updateForm.lastName"-->
                          <!--                                label="Фамилия"-->
                          <!--                              ></v-text-field>-->
                          <!--                            </v-col>-->
                          <!--                          </v-row>-->
                          <v-row>
                            <v-col cols="12" sm="6" md="2">
                              <v-text-field
                                v-model="updateForm.login"
                                label="Логин"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="2">
                              <v-text-field
                                v-model="updateForm.contact"
                                label="Номер телефона"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-list-item>
                      <!--                      <v-list-item>-->
                      <!--                        <v-list-item-content>-->
                      <!--                          <v-list-item-title>Password</v-list-item-title>-->
                      <!--                          <v-list-item-subtitle-->
                      <!--                            >Require password for purchase or use password to-->
                      <!--                            restrict purchase</v-list-item-subtitle-->
                      <!--                          >-->
                      <!--                        </v-list-item-content>-->
                      <!--                      </v-list-item>-->
                    </v-list>

                    <v-divider></v-divider>
                  </v-card>
                </v-dialog>
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
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        :disabled="btns.LoginEsc"
                        @click.prevent="
                          () => {
                            profile = false;
                            $refs.loginForm.reset();
                          }
                        "
                      >
                        Отмена
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        type="submit"
                        :loading="loaders.LoginLoader"
                        text
                        @click.prevent="auth()"
                      >
                        Вход
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-container>
              </v-card-text>
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
              <ItemList @alert="alert"></ItemList>
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
      this.updateForm.login = this.user.username;
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
        this.loaders.LoginLoader = !this.loaders.LoginLoader;
        this.btns.LoginEsc = !this.btns.LoginEsc;
        let data = {
          login: this.loginForm.login.trim(),
          password: this.loginForm.password.trim(),
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
          this.loadLocalData();
        } else {
          this.changeProfile();
          this.alert("Что-то пошло не так", "error");
        }
      }
    },

    async update() {
      this.loaders.updateLoader = !this.loaders.updateLoader;
      let result;
      let data = {
        name: null,
        login: null,
        contact: null,
      };
      this.updateForm.firstName == null
        ? delete data.name
        : (data.name =
            this.updateForm.firstName + " " + this.updateForm.lastName);
      this.updateForm.login == null
        ? delete data.login
        : (data.login = this.updateForm.login);
      this.updateForm.contact == null
        ? delete data.contact
        : (data.contact = this.updateForm.contact);
      await fetch("http://surpk-api-last.herokuapp.com/public/api/update", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
        },
      }).then((res) => {
        if (res.status == 202) {
          result = 1;
        } else {
          result = 2;
        }
        return res.json();
      });

      if (result == 1) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.username = data.login;
        localStorage.setItem("user", JSON.stringify(user));
        await this.loadLocalData();
        this.alert("Изменения сохранены!", "success");
      } else {
        this.alert("Что-то пошло не так", "error");
      }
      this.loaders.updateLoader = !this.loaders.updateLoader;
      this.userinfo = !this.userinfo;
    },
  },

  mounted() {
    this.loadLocalData();

    this.userkak = true;
  },

  data: function () {
    return {
      userinfo: false,
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
      search: "",
      btns: {
        LoginEsc: null,
      },
      loaders: {
        LoginLoader: null,
        updateLoader: null,
      },
      alerts: [],
      user: null,
      updateForm: {
        firstName: null,
        lastName: null,
        login: null,
        contact: null,
      },
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
