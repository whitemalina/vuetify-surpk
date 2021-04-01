<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer
          v-model="drawer"
          app
        >
          <v-list dense>
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Создание заявки</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Обратная связь</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
       
        <v-app-bar
          app
          color="#23539c"
          flat
          hide-on-scroll
          dark
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>СПК ПОДДЕРЖКА</v-toolbar-title>
          
        </v-app-bar>

        <v-main>
          <v-container
            fluid
            style="position: relative;"
            class="py-2"
          >
            <v-row>
              <v-col  class="mx-auto col-12 col-md-10 col-xl-6 col-lg-8 ">
                <v-expansion-panels
                    accordion
                    flat
                    readonly

                >
                <v-expansion-panel class="my-0" style="cursor: default !important; "   >
                  <v-expansion-panel-header  disable-icon-rotate style="cursor: default !important; border: 1px solid #23539c"  >
                    <v-row>
                      <v-col class="col-12 col-lg-3 spkcolor" >
                        ДАТА
                      </v-col>
                      <v-col class="col-12 col-lg-4 spkcolor">
                        СП<span class="spkcolor-secondary ml-1 ">КАБ</span>
                      </v-col>
                      <v-col  class="d-flex spkcolor justify-lg-center justify-start  col-12 col-lg-5" style="letter-spacing: 1.6666667px">
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
                <ItemList></ItemList>
              </v-col>
            </v-row>
          </v-container>
          <ModalSend></ModalSend>
        </v-main>
        <v-footer
          color="#23539c"
          app
        >
          <span class="white--text copyc">&copy; {{ new Date().getFullYear() }} <a href="https://www.surpk.ru">www.surpk.ru</a></span>
        </v-footer>
      </v-app>
    </v-app>
  </div>

</template>

<script>
import ModalSend from "./components/ModalSend";
import ItemList from "./components/ItemList";
export default {
  name: "App",

  components: {
    ModalSend,
    ItemList,
  },
  props: {
    source: String,

  },

  data: () => ({
    firstname: '',
    lastname: '',
    drawer: false,
    dialog: false,
    items: ['СП-1', 'СП-2', 'СП-3', 'СП-4'],
    todos: [],
  }
  ),
};
</script>

<style lang="css">
.copyc a{
  color: white !important;
}
.spkcolor {
  color: #23539c;
}
.spkcolor-secondary{
  opacity: .75;
  color: #23539c;
}
</style>
