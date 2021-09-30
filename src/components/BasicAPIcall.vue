<template>
  <div id="BasicAPIcall" class="bborder">
    <p>This is a Basic API call:</p>
    <form @submit="callApi()" v-on:submit.prevent="selected === '/python'">
      <select v-model="selected">
        <option
          v-for="(path, index) in directories"
          v-bind:value="path.path"
          :key="index"
        >
          {{ path.Name }}
        </option>
      </select>
      <div @click="asJson = selected.startsWith('/t') ? !asJson : asJson">
        <input
          type="checkbox"
          v-model="asJson"
          :disabled="!selected.startsWith('/t')"
        />
        <label>{{ asJson ? "As JSON object" : "As plain text" }}</label>
      </div>
      <input
        id="textfield"
        type="text"
        :disabled="!selected.startsWith('/t')"
        v-model="messageToSend"
        :placeholder="
          selected === '/python' ? 'Good Question' : 'Enter text to send'
        "
      />
      <button>Send</button>
    </form>
    <table style="margin-top: 20px; margin-bottom: 14px">
      <tbody>
        <tr>
          <th>Type</th>
          <td>{{ axiosResponse.type }}</td>
        </tr>
        <tr>
          <th>Response</th>
          <td>{{ axiosResponse.data }}</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>{{ axiosResponse.timeItTook }} s</td>
        </tr>
      </tbody>
    </table>
    <iframe name="emptyFrame" style="display: none" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BasicAPIcall",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      messageToSend: null,
      axiosResponse: {
        data: "-",
        type: "-",
        timeItTook: 0,
      },
      selected: "/python",
      asJson: false,
      directories: [
        { path: "/python", Name: "Is Python cool?" },
        { path: "/text", Name: "Text" },
        { path: "/txet", Name: "txeT" },
        { path: "/json", Name: "Retrieve JSON" },
      ],
    };
  },
  methods: {
    async callApi() {
      this.axiosResponse = {
        data: "Loading...",
        type: "Loading...",
        timeItTook: 0,
      };
      const now = Date.now();
      await axios
        .get(`http://localhost:8088${this.selected}`, {
          params: {
            text: this.messageToSend,
            json: this.asJson,
          },
          timeout: 2250,
        })
        .then((res) => {
          this.axiosResponse = {
            data: res.data,
            type: this.isJson(res.data),
            timeItTook: (Date.now() - now) / 1000,
          };
        })
        .catch((err) => {
          this.axiosResponse = {
            data: "An Error has occurred: " + err.message,
            type: "Error",
            timeItTook: (Date.now() - now) / 1000,
          };
        });
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isJson(item) {
      item = typeof item !== "string" ? JSON.stringify(item) : item;
      try {
        item = JSON.parse(item);
      } catch (e) {
        return "Text";
      }
      return typeof item === "object" && item !== null ? "JSON" : "Unknown";
    },
  },
};
</script>

<style scoped>
form {
  margin: auto;
  display: grid;
  max-width: 300px;
  cursor: pointer;
}

form * {
  margin: 4px;
}
</style>
