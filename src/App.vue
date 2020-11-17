<template>
  <LoginScreen v-if="!accessToken" v-model:access-token="accessToken"/>
  <WorkScreen v-else></WorkScreen>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {setAccessToken} from "@/useGraphQlClient";

export {default as LoginScreen} from './LoginScreen.vue';
export {default as WorkScreen} from './WorkScreen.vue';

export const accessToken = ref<string | null>(null);
watch(() => accessToken.value, (accessToken) => setAccessToken(accessToken));

</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
