<template>
  <v-container>
      <v-toolbar>
        <v-toolbar-title>Welcome to Schedules!</v-toolbar-title>
      </v-toolbar>
      <br><br>
      <SocialLogin />
      <br><br>
  </v-container>
</template>

<script>
import SocialLogin from '@/components/SocialLogin'
export default {
  name: 'loginUser',
  components: {
    SocialLogin
  }
}
</script>