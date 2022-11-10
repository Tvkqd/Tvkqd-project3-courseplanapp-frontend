<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!--Search bar-->
    <v-col cols="12" md="8">
      <v-text-field
        v-model="username"
        label="Username"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="8">
      <v-text-field
        v-model="password"
        label="Password"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="Login"> Login </v-btn>
    </v-col>
  </v-row>
</template>
