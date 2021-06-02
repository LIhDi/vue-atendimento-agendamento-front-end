<template>
  <div>
    <q-select
      label="Unidade de Atendimento:"
      :value="value"
      :options="listOptionsFiltered"
      :loading="loading"
      @input="atualiza"
      @filter="filtro"
      use-input
      input-debounce="0"
      :multiple="multiple"
      :use-chips="multiple"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'SelectUnidadesDeAtendimento',
  props: ['value', 'multiple'],
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
      await this.$api.domain.getUnidadesDeAtendimento()
        .then(response => {
          response.data.forEach(el => {
            if (el.name) {
              this.listOptions.push({ value: el.code, label: el.name })
            }
          })
        })
        .finally(() => {
          this.loading = false
        })
      this.listOptionsFiltered = this.listOptions
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
