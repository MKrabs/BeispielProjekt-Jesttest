<template>
  <div class="bborder cards">
    <p>Bank:</p>
    <Bank v-for="(Name, index) in accounts" :key="index" :User="Name" />
    <form ref="form" id="addClient" @submit="addClient()" @submit.prevent>
      <input
        id="textfield"
        type="text"
        v-model="Client"
        :placeholder="typeof Client"
        required
      />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import Bank from "@/components/BankAccount";

export default {
  components: { Bank },
  data() {
    return {
      accounts: [],
      Client: undefined, // https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript
    };
  },
  mounted() {
    // this.addClient();
    // this.$refs.form.submit();
  },
  methods: {
    addClient() {
      this.accounts.push(this.Client);
      this.Client = "";
    },
  },
};
</script>

<style scoped></style>
