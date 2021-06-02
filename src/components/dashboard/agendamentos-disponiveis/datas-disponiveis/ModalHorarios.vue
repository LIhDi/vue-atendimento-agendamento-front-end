<template>
   <div>
    <q-btn
      :label="data.dataFormatada + ' (' + data.quantidadeHorarios + ')'"
      icon="event"
      @click="toggle()"
      text-color="grey-8" outline
      class="text-bold" size="12px"
    />
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card style="width: 1000px; max-width: 1000px;">
        <q-bar class="bg-white text-bold q-ma-sm">
          <span class="text-grey-9">Horários Disponíveis</span>
          <q-space />
          <q-btn dense flat icon="close" color="grey-6" v-close-popup />
        </q-bar>

        <div style="width: 1000px;">
          <CardNaoPossuiHorario v-if="horarios === null"/>
          <div v-if="horarios !== null && horarios.length >= 1" class="q-ma-md q-pa-md" style="border: 1px solid #e4eaec;">
            <div class="text-bold text-grey-8">
              Dia: {{horarios[0].dataFormatada}} ({{horarios[0].diaFormatado}})
            </div>
            <div class="row q-gutter-md q-mt-xs q-pa-xs">
              <div class="col-md-2 col-sm-3 col-xs-4" v-for="horario in horarios" :key="horario.horario">
                <ModalAgendamento :horario="horario" :filtro="filtro" />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CardNaoPossuiHorario from './CardNaoPossuiHorario'
import ModalAgendamento from './ModalAgendamento'
export default {
  name: 'ModalHorarios',
  components: { CardNaoPossuiHorario, ModalAgendamento },
  props: ['data', 'filtro'],
  data () {
    return {
      dialog: false,
      maximizedToggle: false,
      horarios: null,
      horariosDisponiveisMock: [
        {
          horario: 1623083456000,
          dataFormatada: '24/06/2021',
          diaFormatado: 'Segunda-feira',
          horaFormatada: '13:30',
          turno: null
        },
        {
          horario: 1623083456001,
          dataFormatada: '24/06/2021',
          diaFormatado: 'Segunda-feira',
          horaFormatada: '13:50',
          turno: null
        },
        {
          horario: 1623083456002,
          dataFormatada: '24/06/2021',
          diaFormatado: 'Segunda-feira',
          horaFormatada: '14:10',
          turno: null
        },
        {
          horario: 1623083456003,
          dataFormatada: '24/06/2021',
          diaFormatado: 'Segunda-feira',
          horaFormatada: '14:30',
          turno: null
        }
      ]
    }
  },
  methods: {
    toggle () {
      this.dialog = !this.dialog
      if (this.dialog) {
        this.pesquisarHorarios()
      }
    },
    recebeAgendamento (agendamento) {
      this.agendamento = agendamento
    },
    pesquisarHorarios () {
      this.horarios = this.horariosDisponiveisMock
    }
  }
}
</script>
