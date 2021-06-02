<template>
  <div>
    <q-input
      :label="label"
      :value="value"
      @input="atualiza"
      maxlength="200"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'InputTexto',
  props: ['value', 'label'],
  methods: {
    atualiza (val) {
      this.$emit('input', val.toUpperCase())
    }
  }
}
</script>
