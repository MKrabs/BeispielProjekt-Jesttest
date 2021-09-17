<template>
  <div class="bborder cards">
    <p>Bank:</p>
    <Bank v-for="(Name, index) in accounts" :key="index" :User="Name" />
  </div>
</template>

<script>
import Bank from "@/components/BankAccount";

export default {
  components: { Bank },
  data() {
    return {
      accounts: ["Carl", "Marx"],
    };
  },
};
</script>

<style scoped></style>
