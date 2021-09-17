<template>
  <div class="bborder">
    <p>This is a Reddit API call test:</p>
    <form @submit="callApi()" @submit.prevent>
      <input placeholder="Enter a valid URL" />
      <button>Send</button>
    </form>
    <RedditPost
      title="r/ich_iel/"
      image="../assets/meme.png"
      alt="Post aus r/ich_iel"
      upvotes="10"
      downvotes="1"
    />
    <iframe name="votar" style="display: none" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import RedditPost from "@/components/RedditPost.vue";

export default {
  name: "redditAPIdiv",
  components: { RedditPost },
  methods: {
    callApi(): void {
      const res = axios.get("https://httpbin.org/get?answer=42");
      console.log(res);
    },
  },
};
</script>

<style scoped></style>
