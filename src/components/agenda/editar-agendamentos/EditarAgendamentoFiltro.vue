<template>
  <div class="row q-gutter-sm q-pa-md">
    <div class="col-md-6 col-xs-12">
      <SelectUnidadesDeAtendimento v-model="filtro.unidadeAtendimento" />
    </div>
    <div class="col-md-6 col-xs-12">
      <InputData v-model="filtro.dataInicio" :label="'Data Início:'" />
    </div>
    <div class="col-md-6 col-xs-12">
      <InputData v-model="filtro.dataFim" :label="'Data Fim:'" />
    </div>
    <div class="col-md-6 col-xs-12">
      <BtnPesquisar
        class="q-ma-xs"
        @click="pesquisar()"
        :disabled="!(filtro.unidadeAtendimento && filtro.dataInicio && filtro.dataFim)"
      />
    </div>
  </div>
</template>

<script>
import SelectUnidadesDeAtendimento from 'components/commons/SelectUnidadesDeAtendimento'
import InputData from 'components/commons/InputData'
import BtnPesquisar from 'components/commons/BtnPesquisar'
export default {
  name: 'EditarAgendamentoFiltro',
  components: { SelectUnidadesDeAtendimento, InputData, BtnPesquisar },
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
        unidadeAtendimento: this.filtro.unidadeAtendimento.value
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
