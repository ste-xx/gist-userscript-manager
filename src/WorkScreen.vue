<template>
  <div class="grid app-grid-template h-screen">
    <div style="grid-area: head; background-color: red">
      <AutoLogin/>
    </div>
    <div style="grid-area: nav; background-color: green">
      <button @click="listQuery">refresh</button>
      <a v-for="entry in gistEntries" :key="entry.id" href="javascript:void(0)" @click="code = entry.code">
        {{ entry.name }}
      </a>
    </div>
    <div style="grid-area: main; background-color: yellow">
      <MonacoEditor :code="code" style="height: calc(100% - 50px)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {List} from "@/__gen_gql/List";
import listGql from "@/List.gql";
import {useGraphQlClient} from "@/useGraphQlClient";
import {onMounted, ref} from "vue";
export {default as AutoLogin} from './AutoLogin';
export {default as MonacoEditor} from './MonacoEditor';

const graphQlClient = useGraphQlClient();

interface GistEntries {
  id: string;
  name: string;
  code: string;
}

export const gistEntries = ref<GistEntries[]>([]);
export const listQuery = async () => {
  gistEntries.value = (await graphQlClient.value<List>(listGql)).viewer.gists.edges.map(({node}) => ({
    id: node.name,
    name: node.files[0].name,
    code: node.files[0].text
  }));
};

export const code = ref<string>("");

onMounted(() => {
  listQuery();
});

</script>

<style scoped>
.app-grid-template {
  grid-template-areas:
      "head head"
      "nav main";
  grid-template-rows: 70px 1fr;
  grid-template-columns: 150px 1fr;
}
</style>

