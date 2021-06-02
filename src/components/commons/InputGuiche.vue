<template>
  <div>
    <q-input
      label="Guichês"
      :value="value"
      @input="atualiza"
      type="number" min="1" max="100"
      inputmode="numeric"
      bg-color="white" outlined dense
    />
  </div>
</template>
<script>
export default {
  name: 'InputGuiche',
  props: ['value'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    }
  }
}
</script>
