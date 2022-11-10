<template>
    <v-container>
        <br><br>
        <SocialLogin />
        <br><br>
    </v-container>
  </template>
  
  <script>
  import SocialLogin from '@/components/SocialLogin'
  export default {
    name: 'login-page',
    components: {
      SocialLogin
    }
  }
  </script>