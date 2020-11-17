<template>
  <div>
    <button @click="login">login</button>
    <div>
     You need to login to github, to use your gists with this dev tool.
    </div>
    <AutoLogin/>

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
