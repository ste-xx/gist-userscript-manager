<template>
  <div ref="div"/>
</template>

<script setup="props, { emit }" lang="ts">
import {onMounted, ref, watch} from "vue";
import * as monaco from 'monaco-editor';

declare const props: {
  code: string;
};

export const div = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!div.value) {
    return;
  }

  const editor = monaco.editor.create(div.value, {
    value: props.code,
    language: 'javascript',
    scrollBeyondLastLine: false,
    automaticLayout: true
  });

  watch(() => props.code, () => {
    if (editor.getValue() !== props.code) {
      editor.setValue(props.code);
    }
  });
  editor.onDidChangeModelContent(() => {
    emit('update:code', editor.getValue() ?? '');
  });
});
</script>
