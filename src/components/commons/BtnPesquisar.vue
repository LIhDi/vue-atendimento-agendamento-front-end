<template>
  <div>
    <q-btn
      label="Pesquisar"
      @click="pesquisar()"
      icon="search"
      outlined color="secondary" size="11px" class="full-width"
    />
  </div>
</template>
<script>
export default {
  name: 'BtnPesquisar',
  methods: {
    pesquisar () {
      this.$emit('click')
    }
  }
}
</script>
