<template>
  <div>
    <q-select
      label="Status:"
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
export default {
  name: 'SelectStatus',
  props: ['value', 'todos'],
  created () {
    this.getListOptions()
  },
  data () {
    return {
      listOptions: [],
      loading: false
    }
  },
  methods: {
    async getListOptions () {
      this.listOptions.push({ label: 'TODOS OS STATUS', value: 99 }, { label: 'AGENDADO', value: 2 }, { label: 'EM ESPERA', value: 3 })
    },
    atualiza (value) {
      this.$emit('input', value)
    }
  }
}
</script>
