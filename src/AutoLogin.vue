<template>
  <label>Auto login</label>
  <input
      v-model="autoLogin"
      type="checkbox"
      class="form-checkbox"
  />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

export const autoLogin =  ref<string | null>( window.localStorage.getItem('autoLogin'));

watch(() => autoLogin.value, (autoLogin) => {
  if(autoLogin){
    window.localStorage.setItem('autoLogin', autoLogin.toString());
  } else {
    window.localStorage.removeItem('autoLogin');
  }
});
</script>
