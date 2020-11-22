<template>
  <div class="app-grid-template h-screen max-h-full overflow-y-hidden">
    <div style="grid-area: head;" class="header-grid-template">
      <div style="grid-area: content;" class="flex flex-col">
        <h1>
          Gist User Script Manager
        </h1>
        <div class="self-end">
          <AutoLogin/>
        </div>
      </div>
      <div style="grid-area: divider;">
        <div class="w-full h-px border-gray-400 border-t border-solid">&nbsp;</div>
      </div>
    </div>
    <div style="grid-area: nav;" class="nav-grid-template h-full">
      <button @click="listQuery" class="mt-2 flex mr-3" style="width: calc(100% - 8px)">
        <fa type="fab" icon="github" class="h-4 mr-2"/>
        refresh
      </button>
      <div class="flex" style="width: calc(100% - 8px)">
        <input type="text" v-model="filter" class="form-input mt-2 mr-3 flex-grow w-full"/>
        <fa icon="filter" class="h-4 self-center"/>
      </div>
      <div class="overflow-y-auto w-full mt-2 h-full h-full">
        <div v-for="entry in filteredGistEntries" :key="entry.id" class="flex flex-wrap w-full mt-2">
          <a @click="code = entry.code" class="w-full cursor-pointer mr-2">{{ entry.name }}</a>
          <div class="w-full h-px border-gray-400 border-t border-solid mt-1 mr-2">&nbsp;</div>
        </div>
      </div>
    </div>
    <div style="grid-area: main; background-color: yellow">
      <MonacoEditor :code="code" class="h-full"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {List} from "@/__gen_gql/List";
import listGql from "@/List.gql";
import {useGraphQlClient} from "@/useGraphQlClient";
import {onMounted, ref, computed} from "vue";

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

export const filteredGistEntries = computed(() => gistEntries.value.filter(({name}) => filter.value === '' || name.toLowerCase().includes(filter.value.toLowerCase())));

onMounted(() => {
  listQuery();
});

</script>

<style scoped>
.app-grid-template {
  display: grid;
  grid-template-areas:
      "head head head"
      ". nav main";
  grid-template-rows: 70px minmax(0, 1fr);
  grid-template-columns: 8px 160px 1fr;
}

.header-grid-template {
  display: grid;
  grid-template-areas:
      ". . ."
      ". content ."
      ". . ."
      "divider divider divider";
  grid-template-columns: 8px 1fr 8px;
  grid-template-rows: 8px auto 1fr 1px;
}

.nav-grid-template {
  display: grid;
  grid-template-areas:
  "button"
  "filter"
  "result";
  grid-template-rows: auto auto 1fr;
}
</style>

