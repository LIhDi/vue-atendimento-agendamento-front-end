<template>
  <div>
    <q-input
      label="Celular:"
      :value="value"
      @input="atualiza"
      mask="(##)#####-####"
      inputmode="numeric"
      unmasked-value
      placeholder="(__)_____-____"
      v-on:keyup.enter="semRegistro ? '' : acessar()"
      :disable="semRegistro"
      outlined dense
      required
    />
  </div>
</template>
<script>
const TODOS_NUMEROS_IGUAIS = /\b(\d)\1+\b/
export default {
  name: 'InputCnpj',
  props: ['value', 'semRegistro'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    },
    acessar () {
      this.$emit('acessar')
    },
    validaNumeroCelular (numero) {
      return !TODOS_NUMEROS_IGUAIS.test(numero.slice(2))
    }
  }
}
</script>
