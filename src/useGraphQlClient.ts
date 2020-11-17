import {graphql} from "@octokit/graphql";
import {computed, ref, Ref} from "vue";

const _accessToken = ref<string | null>(null);
export const setAccessToken = (accessToken: string | null) => {
  _accessToken.value = accessToken;
};

export const useGraphQlClient = (): Ref<typeof graphql> =>
  computed(() => {
    const headers = _accessToken.value ? {authorization: `token ${_accessToken.value}`} : {};
    return graphql.defaults({
      headers
    });
  });
