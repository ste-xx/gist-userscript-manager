<template>
  <div class="login--container">
    <div style="grid-area: button">
      <button @click="login" class="flex mr-2">
        <fa type="fab" icon="github" class="h-4 mr-2"/>
        Sign in
      </button>
    </div>
    <div style="grid-area: autologin">
      <AutoLogin/>
    </div>
    <div style="grid-area: description">
      You need to sign in to github, to use your gists with this dev tool.
    </div>
  </div>
</template>

<script setup="props, {emit}" lang="ts">
export {default as AutoLogin} from './AutoLogin.vue';
import {onMounted} from "vue";
import {auth} from "@/auth";

export const login = async () => {
  const {access_token} = await auth();
  emit('update:access-token', access_token);
};

onMounted(()=> {
  if(window.localStorage.getItem('autoLogin') !== null){
    login();
  }
});

</script>

<style scoped>
.login--container {
  display: grid;
  grid-template-areas:
  '. . .'
  '. button .'
  '. autologin .'
  'description description description'
  '. . .';
  grid-template-rows: 250px 2rem 1rem auto auto;
  grid-template-columns: 100px 150px 100px;
  justify-content: center;
  grid-row-gap: 10px;
  min-height: 100%;
}
</style>
