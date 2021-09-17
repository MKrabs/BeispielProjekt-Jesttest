<template>
  <div class="bborder">
    <p>This is a Basic API call:</p>
    <form @submit="callApi(url2call)" @submit.prevent style="margin: 24px">
      <input v-model="url2call" placeholder="Enter a valid URL" />
      <button>Send</button>
    </form>
    <p v-if="axiosResponse != null">{{ axiosResponse }}</p>
    <iframe name="votar" style="display: none" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "BasicAPIcall",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      url2call: "",
      axiosResponse: null,
    };
  },
  methods: {
    async callApi(value: string): Promise<string>{
      this.axiosResponse = "Loading..."
      return await Vue.axios
        .get("http://localhost:8088/vue", {
          params: {
            text: value,
          },
          timeout: 2250,
        })
        .then((res) => {
          console.log(res.data);
          this.axiosResponse = res.data;
          return res.data;
        })
        .catch((err) => {
          this.axiosResponse = "An Error has occured."
          return console.error("Error catching API! " + err.message);
        });
    },
  },
};
</script>

<style scoped></style>
