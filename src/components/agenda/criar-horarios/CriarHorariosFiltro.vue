<template>
  <div class="row q-gutter-sm q-pa-md">
    <div class="col-md-6 col-xs-12">
      <SelectUnidadesDeAtendimento v-model="filtro.unidadeAtendimento" />
    </div>
    <div class="col-md-6 col-xs-12">
      <InputData v-model="filtro.dataInicio" :label="'Data Início:'" :somenteDataFutura="true" />
    </div>
    <div class="col-md-6 col-xs-12">
      <InputData v-model="filtro.dataFim" :label="'Data Fim:'" :somenteDataFutura="true" />
    </div>
    <div class="col-md-6 col-xs-12">
      <CriarHorariosModal :filtro="filtro" @confirmarConfiguracao="confirmarConfiguracao" />
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import feriados from 'assets/feriados'
import CriarHorariosModal from './CriarHorariosModal'
import SelectUnidadesDeAtendimento from 'components/commons/SelectUnidadesDeAtendimento'
import InputData from 'components/commons/InputData'
export default {
  name: 'CriarHorariosFiltro',
  components: { CriarHorariosModal, SelectUnidadesDeAtendimento, InputData },
  data () {
    return {
      listFeriados: feriados.map(el => el.data),
      filtro: {},
      novaData: null,
      listaHorarios: []
    }
  },
  methods: {
    pesquisar () {
      const payload = {
        dataInicio: this.formataDataParaPesquisa(this.filtro.dataInicio),
        dataFim: this.formataDataParaPesquisa(this.filtro.dataFim),
        unidadeAtendimento: this.filtro.unidadeAtendimento.value,
        tipo: '' + this.filtro.tipoAgendamento.value
      }
      this.$emit('filtro', payload)
    },
    formataDataParaPesquisa (data) {
      let dataFormatada = data.slice(6) + '-'
      dataFormatada += data.slice(3, 5) + '-'
      dataFormatada += data.slice(0, 2) + 'T14:00:00.000Z'
      return dataFormatada
    },
    confirmarConfiguracao (configuracao) {
      this.listaHorarios = []
      this.novaData = date.extractDate(this.filtro.dataInicio, 'DD/MM/YYYY')
      const dataFim = date.extractDate(this.filtro.dataFim, 'DD/MM/YYYY')
      for (let index = 1; this.novaData <= dataFim; index++) {
        if (this.validaHorario()) {
          this.incluiNaListaDeHorarios(configuracao)
        }
        this.novaData = this.incrementaUmDia()
      }
      this.$emit('confirmarHorarios', this.listaHorarios)
    },
    validaHorario () {
      return this.naoEhFinalDeSemana() && this.horaNaoFoiAdicionada() && this.haMenosQue16DiasConfigurados() && this.naoEhFeriado()
    },
    incluiNaListaDeHorarios (configuracao) {
      configuracao.dia = this.formataData(this.novaData)
      configuracao.unidadeDeAtendimento = this.filtro.unidadeAtendimento
      this.listaHorarios.push(JSON.parse(JSON.stringify(configuracao)))
    },
    incrementaUmDia () {
      return date.addToDate(this.novaData, { days: 1 })
    },
    naoEhFinalDeSemana () {
      const DOMINGO = 0
      const SABADO = 6
      return this.novaData.getDay() !== DOMINGO && this.novaData.getDay() !== SABADO
    },
    haMenosQue16DiasConfigurados () {
      if (this.listaHorarios.length < 16) {
        return true
      } else {
        this.$alerta('Deve-se configurar até 15 dias por vez!')
        return false
      }
    },
    naoEhFeriado () {
      const dataFormatada = this.novaData.getDate() + '/' + (this.novaData.getMonth() + 1)
      return !this.listFeriados.includes(dataFormatada)
    },
    horaNaoFoiAdicionada () {
      this.listaHorarios.forEach(horario => {
        if (horario.dia === this.formataData(this.novaData)) {
          this.$alerta('Erro! A data ' + this.formataData(this.novaData) + ' já foi adicionada')
          return false
        }
      })
      return true
    },
    formataData (data) {
      return ('0' + data.getDate()).substr(-2) + '/' + ('0' + (data.getMonth() + 1)).substr(-2) + '/' + data.getFullYear()
    }
  }
}
</script>
