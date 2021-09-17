<template>
  <div>
    <div class="post">
      <h3>{{ Title }}</h3>
      <h5>
        <b-icon icon="bar-chart-fill"></b-icon>
        ↑ {{ Upvotes }} {{ Downvotes }} ↓
      </h5>
      <img src="../assets/meme.png" v-bind:alt="Alt"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "RedditPost",
  props: {
    Title: String,
    Alt: String,
    Image: String,
    Upvotes: Number,
    Downvotes: Number,
  },
};
</script>

<style scoped>
img {
  max-width: 400px;
  width: 100%;
}

.post {
  background-color: #eaeaea;
  border-radius: 4px;
  max-width: 450px;
  margin: auto;
  padding-bottom: 25px;
}
</style>
