<template>
  <div>
    <q-input
      label="Nome:"
      :value="value"
      @input="atualiza"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'InputNome',
  props: ['value'],
  methods: {
    atualiza (val) {
      this.$emit('input', val.toUpperCase())
    }
  }
}
</script>
