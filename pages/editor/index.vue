<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  required
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  required
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  required
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="editTag"
                  @keyup.enter="addTag($event)"
                />
                <div class="tag-list">
                  <span class="tag-default tag-pill" v-for="(tag, index) in article.tagList" :key="index">
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article';
export default {
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      editTag: ''
    }
  },
  methods: {
    submit () {
      createArticle({ article: this.article })
    },
    addTag(event) {
      event.preventDefault();
      this.article.tagList.push(this.editTag);
      this.editTag = '';
    },
    removeTag(tag) {
      this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
    }
  }
}
</script>

<style>
</style>