module.exports = {
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // clean old routes
      routes.splice(0)
      // add new routes
      routes.push(...[
        { 
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            { 
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            },
            { 
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login')
            },
            { 
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login')
            },
            { 
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article')
            },
            { 
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings')
            },
            { 
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor')
            },
            { 
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile')
            }
          ]
        }
      ])
    }
  }
}