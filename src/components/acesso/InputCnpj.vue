<template>
  <div>
    <q-input
      label="CNPJ:"
      :value="value"
      @input="atualiza"
      mask="##.###.###/####-##"
      inputmode="numeric"
      unmasked-value
      placeholder="__.___.___/____-__"
      :disable="semRegistro"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'InputCnpj',
  props: ['value', 'semRegistro'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    }
  }
}
</script>
