<template>
  <div>
    hello world
  </div>
  <button @click="login">login</button>
  <button @click="listQuery">list</button>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {auth} from './auth';
import listGql from './List.gql';
import { graphql } from '@octokit/graphql';

const accessToken = ref<string | null>(null);

const graphQlClient = computed(() => {
  const headers = accessToken.value ? {authorization: `token ${accessToken.value}`}: {};
  alert(headers);
  return graphql.defaults({
    headers
  });
});

export const login = async () => {
  const {access_token} = await auth();
  accessToken.value = access_token;
  alert('logged in');
};

export const listQuery = async () => {
  if(!graphQlClient.value){
    return;
  }
  const result = await graphQlClient.value(listGql);
  alert(JSON.stringify(result, null, 2));
};

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
