<template>
  <div>
    <q-input
      label="Período"
      :value="value"
      @input="atualiza"
      type="number" min="1" max="480"
      inputmode="numeric"
      bg-color="white" outlined dense
    />
  </div>
</template>
<script>
export default {
  name: 'InputIntervalo',
  props: ['value'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    }
  }
}
</script>
