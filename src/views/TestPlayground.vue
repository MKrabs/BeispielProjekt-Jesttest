<template>
  <div class="testingArea">
    <h1>Testing Area</h1>
    <BasicAPIcall />
    <Bank />
    <LoadJSON />
  </div>
</template>

<script>
import Bank from "@/components/Bank";
import LoadJSON from "@/components/LoadJSON";
import BasicAPIcall from "@/components/BasicAPIcall";

export default {
  components: { BasicAPIcall, LoadJSON, Bank },
};
</script>

<style scoped>
.testingArea {
  max-width: 1000px;
  margin: auto;
}
</style>
