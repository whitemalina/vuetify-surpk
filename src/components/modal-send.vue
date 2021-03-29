<template v-slot:extension>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        color="red"
        bottom
        left
        absolute
        v-on="on"
        v-bind="attrs"
        @click="dialog = !dialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
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
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="lastname"
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
                label="Опишите проблему: "

              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['СП-1', 'СП-2', 'СП-3', 'СП-4', 'СП-5']"
                label="СП"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*Обязательные поля</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Закрыть</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Отправить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

