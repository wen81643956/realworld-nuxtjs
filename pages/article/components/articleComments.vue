<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted"
          >{{ comment.createdAt | date("MMM DD") }}th</span
        >
        <span
          class="mod-options"
          v-if="user.username === comment.author.username"
        >
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getComments, addComments, deleteComments } from "@/api/comments";
export default {
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getCommentData();
  },
  methods: {
    async getCommentData() {
      const { data } = await getComments(this.$route.params.slug);
      this.comments = data.comments;
    },
  },
};
</script>

<style>
</style>