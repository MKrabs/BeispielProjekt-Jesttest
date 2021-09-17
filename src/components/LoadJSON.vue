<template>
  <div class="bborder">
    <p>Load a JSON:</p>
    <select v-model="selected">
      <option
        v-for="(people, index) in applicants"
        v-bind:value="people"
        :key="index"
      >
        {{people.ID}} - {{ people.Name }}
      </option>
    </select>
    <div class="table">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{{ selected.ID }}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ selected.Name }}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{{ selected.Country }}</td>
          </tr>
          <tr>
            <th>House</th>
            <td>{{ selected.House }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import JSONdata from "../JSON Files/data_file_1.json";

export default {
  name: "LoadJSON",
  data(): unknown {
    return {
      applicants: JSONdata,
      selected: {
        type: Object,
        ID: "-",
        Name: "-",
        Country: "-",
        House: "-",
      },
    };
  },
};
</script>

<style scoped>
select {
  margin: 12px;
}

table th {
  text-align: left;
  width: 100px;
}
</style>
