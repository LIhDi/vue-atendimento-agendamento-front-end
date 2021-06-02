<template>
  <div>
    <div div class="row q-gutter-sm q-pa-md">
      <div class="col-md-6 col-xs-12">
        <SelectStatus  v-model="filtro.status" :todos="true" />
      </div>
      <div class="col-md-6 col-xs-12">
        <SelectUnidadesDeAtendimento v-show="filtro.status" v-model="filtro.unidadeAtendimento" :multiple="true" />
      </div>
      <div class="col-md-6 col-xs-12">
        <InputData  v-model="filtro.dataInicio" :label="'Data Inicio:'" />
      </div>
      <div class="col-md-6 col-xs-12">
        <InputData  v-model="filtro.dataFim" :label="'Data Fim:'" />
      </div>
      <div class="col-md-6 col-xs-12">
        <BtnPesquisar v-show="filtro.dataFim" @click="pesquisar()" class="q-ma-xs" />
      </div>
    </div>
  </div>
</template>

<script>
import SelectUnidadesDeAtendimento from 'components/commons/SelectUnidadesDeAtendimento'
import SelectStatus from 'components/commons/SelectStatus'
import InputData from 'components/commons/InputData'
import BtnPesquisar from 'components/commons/BtnPesquisar'
export default {
  name: 'RelatorioFiltro',
  components: { SelectUnidadesDeAtendimento, SelectStatus, InputData, BtnPesquisar },
  data () {
    return {
      filtro: {}
    }
  },
  methods: {
    pesquisar () {
      const payload = {
        dataInicio: this.formataDataParaPesquisa(this.filtro.dataInicio),
        dataFim: this.formataDataParaPesquisa(this.filtro.dataFim),
        status: this.filtro.status.value,
        idsUnidades: this.filtro.unidadeAtendimento.map(u => u.value)
      }
      this.$emit('filtro', payload)
    },
    formataDataParaPesquisa (data) {
      let dataFormatada = data.slice(6) + '-'
      dataFormatada += data.slice(3, 5) + '-'
      dataFormatada += data.slice(0, 2) + 'T14:00:00.000Z'
      return dataFormatada
    }
  }
}
</script>
