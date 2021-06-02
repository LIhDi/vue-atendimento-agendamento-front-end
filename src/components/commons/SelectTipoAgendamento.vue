<template>
  <div>
    <q-select
      label="Tipo Agendamento:"
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
// import { getTipoAgendamento } from '../../api/DomainApi'
export default {
  name: 'SelectTipoAgendamento',
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
      this.loading = true
      this.$api.domain.getTipoAgendamento()
        .then(response => {
          response.data.forEach(el => {
            this.listOptions.push({ value: el.code, label: el.description })
          })
        })
        .finally(() => {
          this.loading = false
        })
      if (this.todos) {
        this.listOptions.push({ value: 99, label: 'TODOS' })
      }
    },
    atualiza (value) {
      this.$emit('input', value)
    }
  }
}
</script>
