<template>
  <div>
    <q-select
      label="Guiche:"
      :value="value"
      :options="listOptions"
      :loading="loading"
      @input="atualiza"
      outlined dense
      required
    />
  </div>
</template>
<script>
import listGuiche from 'assets/listGuiche'
export default {
  name: 'SelectGuiche',
  props: ['value'],
  data () {
    return {
      listOptions: listGuiche,
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
