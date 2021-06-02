<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: ['token'],
  created () {
    if (!this.token && localStorage.getItem('token')) {
      this.$router.push('/home')
    }

    if (this.token) {
      this.getUsuarioSessao(this.token)
    }
  },
  methods: {
    getUsuarioSessao (token) {
      this.$api.auth.usuarioSessao(token)
        .then(response => {
          if (response.data) {
            this.$router.push('/home')
          } else {
            this.$router.push('/logoff')
          }
        })
        .catch(error => {
          console.log(error)
          this.$router.push('/logoff')
        })
    }
  }
}
</script>
