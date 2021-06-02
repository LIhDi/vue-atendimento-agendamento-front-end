<template>
  <div class="col-12">
    <q-btn
      label="Acessar"
      icon="fas fa-sign-in-alt"
      color="primary" size="12px" class="full-width" rounded glossy
      @click="click()"
      :loading="loading"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
  </div>
</template>
<script>
export default {
  name: 'BtnAcessar',
  props: ['disable', 'filtro'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    click (val) {
      this.$emit('click')
    },
    loadingOn () {
      this.loading = true
    },
    loadingOff () {
      this.loading = false
    }
  }
}
</script>
