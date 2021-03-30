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
          collapse-on-scroll
          dark
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>СПК ПОДДЕРЖКА</v-toolbar-title>
          
        </v-app-bar>

        <v-main>
          <v-container
            class="fill-height "
            fluid
            style="position: relative"
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-col class="text-center">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon large>mdi-code-tags</v-icon>

                    </v-btn>
                  </template>
                  <span>Source</span>
                  
                </v-tooltip>
                
              </v-col>
              
            </v-row>
            <ModalSend></ModalSend>
          </v-container>
          
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
//import HelloWorld from "./components/HelloWorld";
import ModalSend from "./components/ModalSend";
export default {
  name: "App",
  components: {
    //HelloWorld,
    ModalSend,
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
  }),
};
</script>

<style lang="css">
.copyc a{
  color: white !important;
}
</style>
