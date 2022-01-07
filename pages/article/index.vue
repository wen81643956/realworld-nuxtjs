<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments></article-comments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import { getArticle } from "@/api/article";
import ArticleMeta from "./components/articleMeta";
import ArticleComments from "./components/articleComments";
export default {
  components: {
    ArticleMeta,
    ArticleComments
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    return {
      article: {
        ...article,
        body: md.render(article.body),
      },
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  }
};
</script>

<style>
</style>