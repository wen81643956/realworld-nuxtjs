export default function ({ store, redirect, route }) {
  if (!store.state.user) {
    if (['article', 'settings', 'editor', 'profile'].includes(route.name)) {
      return redirect('/login')
    }
  }
}