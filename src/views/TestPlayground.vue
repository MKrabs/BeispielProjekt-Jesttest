<template>
  <div class="basictests">
    <h1>Testing Area</h1>
    <Bank />
    <BasicAPIcall />
    <LoadJSON />
    <RedditAPIdiv />
  </div>
</template>

<script>
import Bank from "@/components/Bank";
import LoadJSON from "@/components/LoadJSON";
import BasicAPIcall from "@/components/BasicAPIcall";
import RedditAPIdiv from "@/components/redditAPIdiv";
import RedditPost from "@/components/RedditPost";

export default {
  components: { RedditAPIdiv, BasicAPIcall, LoadJSON, Bank },
};
</script>

<style scoped>
.basictests {
  max-width: 1200px;
  margin: auto;
}
</style>
