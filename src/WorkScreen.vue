<template>
  <div class="grid app-grid-template h-screen">
    <div style="grid-area: head; background-color: red">
      <h1>
       Gist User Script Manager
      </h1>
      <AutoLogin/>
    </div>
    <div style="grid-area: nav;" class="nav-grid-template">
      <button @click="listQuery" class="w-full mt-2 flex mr-3">
        <fa type="fab" icon="github" class="h-4 mr-2"/>
        refresh
      </button>
      <input type="text" v-model="filter" class="form-input w-full mt-2 mr-3"/>
      <div class="overflow-y-auto w-full mt-2 h-full h-full">
        <div v-for="entry in gistEntries" :key="entry.id" class="flex flex-wrap w-full mt-2">
          <a @click="code = entry.code" class="w-full cursor-pointer mr-2">{{ entry.name }}</a>
          <div class="w-full h-px border-gray-400 border-t border-solid mt-1 mr-2">&nbsp;</div>
        </div>
      </div>
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
  gistEntries.value = (await graphQlClient.value<List>(listGql))?.viewer.gists.edges.map(({node}) => ({
    id: node.name,
    name: node.files[0].name,
    code: node.files[0].text
  }));
};

export const code = ref<string>("");

export const filter = ref<string>("");

onMounted(() => {
  listQuery();
});

</script>

<style scoped>
.app-grid-template {
  grid-template-areas:
      "head head head"
      ". nav main";
  grid-template-rows: 70px minmax(0, 1fr);
  grid-template-columns: 8px 160px 1fr;
  height: 100vh;
  max-height: 100%;
  overflow-y: hidden;
}
.nav-grid-template {
  display: grid;
  grid-template-areas:
  "button"
  "filter"
  "result";
  grid-template-rows: auto auto 1fr;
  height: 100%;
}
</style>

