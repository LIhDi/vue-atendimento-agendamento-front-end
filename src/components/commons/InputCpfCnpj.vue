<template>
  <div>
    <q-input
      label="CPF/CNPJ:"
      :value="value"
      @input="atualiza"
      :mask="'##############'"
      inputmode="numeric"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'InputCpfCnpj',
  props: ['value'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    }
  }
}
</script>
