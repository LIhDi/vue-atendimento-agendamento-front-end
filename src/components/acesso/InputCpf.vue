<template>
  <div>
    <q-input
      label="CPF:"
      :value="value"
      @input="atualiza"
      mask="###.###.###-##"
      inputmode="numeric"
      unmasked-value
      placeholder="___.___.___-__"
      :disable="semRegistro"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'InputCpf',
  props: ['value', 'semRegistro'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    }
  }
}
</script>
