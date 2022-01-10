<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{
                    name: 'home',
                    query: {
                      tag,
                      tab: 'tag',
                    },
                  }"
                  ># {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="`/profile/${article.author.username}`">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="`/profile/${article.author.username}`"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD,YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="checkFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="`article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <div class="article-preview" v-if="!articles.length">
            No articles are here... yet.
          </div>
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: p === page }"
                v-for="p in pageCount"
                :key="p"
              >
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      page: p,
                      tag: $route.query.tag,
                      tab,
                    },
                  }"
                  class="page-link"
                  >{{ p }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag,
                  },
                }"
                class="tag-pill tag-default"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getListArticles,
  getUserArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
export default {
  async asyncData({ query, store }) {
    const limit = 2;
    let page = Number.parseInt(query.page) || 1;
    const { tag, tab } = query;
    const getArticles =
      tab === "your" && store.state.user ? getUserArticles : getListArticles;
    const [articleRes, tagRes] = await Promise.all([
      getArticles({ limit, offset: (page - 1) * limit, tag }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    return {
      articles: articles.map((item) => ({ ...item, favoriteDisabled: false })),
      pageCount: Math.ceil(articlesCount / limit),
      page,
      tags: tags,
      tag,
      tab: tab || "global",
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    checkFavorite(item) {
      if (!this.user) this.$router.push('/login');
      item.favoriteDisabled = true;
      const fn = item.favorited ? deleteFavorite : addFavorite;
      fn(item.slug).then(() => {
        item.favorited = !item.favorited;
        item.favoritesCount = item.favorited
          ? item.favoritesCount + 1
          : item.favoritesCount - 1;
        item.favoriteDisabled = false;
      });
    },
  },
};
</script>

<style>
</style>