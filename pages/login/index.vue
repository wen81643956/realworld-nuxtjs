<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign {{ isLogin ? 'in' : 'up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

      
          <ul class="error-messages" v-if="!isLogin || Object.keys(errors).length">
            <li v-for="err in errors" :key="err">{{ err }}</li>
          </ul>

          <form @submit.prevent="submit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign {{ isLogin ? 'in' : 'up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { userLogin, userRegister } from '@/api/user'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data () {
    return {
      user: {
        email: '',
        password: '',
        username: ''
      },
      errors: {}
    }
  },
  middleware: 'notAuthenticated',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async submit () {
      try {
        const methodName = this.isLogin ? userLogin : userRegister;
        const { data } = await methodName({ user: this.user })
        if (data) {
          this.setUser(data.user)
          Cookie.set('user', JSON.stringify(data.user))
          this.$router.push({ path: '/' })
        }
      } catch (err) {
        this.errors = err
      }
    },
    ...mapMutations(['setUser'])
  }
}
</script>

<style>
</style>