<template>
  <div>
    <q-select
      label="Acessar por:"
      :value="value"
      :options="['CPF DO INTERESSADO', 'CNPJ DO INTERESSADO']"
      @input="atualiza"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'SelectTipoAcesso',
  props: ['value'],
  data () {
    return {
      listOptions: [],
      loading: false
    }
  },
  methods: {
    atualiza (value) {
      this.$emit('input', value)
    }
  }
}
</script>
