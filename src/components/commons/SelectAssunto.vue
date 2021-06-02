<template>
  <div>
    <q-select
      label="Assunto:"
      :value="value"
      :options="listOptionsFiltered"
      :loading="loading"
      @input="atualiza"
      @filter="filtro"
      use-input
      input-debounce="0"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'SelectAssuntos',
  props: ['value'],
  created () {
    this.getListOptions()
  },
  data () {
    return {
      listOptionsFiltered: [],
      listOptions: [],
      loading: false
    }
  },
  methods: {
    async getListOptions () {
      this.loading = true
      this.listOptions = []
      await this.$api.domain.getAssuntosAgendamento()
        .then(response => {
          response.data.forEach(el => {
            this.listOptions.push({ value: el.code, label: el.name })
          })
        })
        .finally(() => {
          this.loading = false
        })
      this.listOptionsFiltered = this.listOptions
    },
    atualiza (val) {
      this.$emit('input', val)
    },
    filtro (val, update, abort) {
      update(() => {
        this.listOptionsFiltered = this.listOptions.filter(v => v.label.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }
}
</script>
