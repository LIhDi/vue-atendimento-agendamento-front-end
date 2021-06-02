<template>
  <div>
    <q-select
      label="Selecione o seu principal curso de formação:"
      :value="value"
      :options="listOptionsFiltered"
      :loading="loading"
      @input="atualiza"
      @filter="filtro"
      use-input
      input-debounce="0"
      outlined dense
      required
      :readonly="readonly"
    />
  </div>
</template>
<script>
export default {
  name: 'SelectCurso',
  props: ['value', 'readonly', 'todos'],
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
      await this.$api.domain.getCursos()
        .then(response => {
          response.data.data.forEach(el => {
            this.listOptions.push({ value: el.id, label: el.descricao })
          })
        })
        .finally(() => {
          this.loading = false
        })
      this.listOptionsFiltered = this.listOptions
      this.$emit('opcoesUnidades', this.listOptions)
    },
    atualiza (value) {
      this.$emit('input', value)
    },
    filtro (val, update, abort) {
      update(() => {
        this.listOptionsFiltered = this.listOptions.filter(v => v.label.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }
}
</script>
