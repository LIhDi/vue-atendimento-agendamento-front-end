<template>
   <div>
    <q-btn
      :label="horario.horaFormatada"
      icon="far fa-clock"
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
      <div style="width: 1000px;">
        <ConfirmarAgendamento v-if="!agendamento" :horario="horario" :filtro="filtro" @recebeAgendamento="recebeAgendamento" @toggle="toggle" />
        <AgendadoComSucesso v-if="agendamento" :agendamento="agendamento" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import ConfirmarAgendamento from './ConfirmarAgendamento'
import AgendadoComSucesso from './AgendadoComSucesso'
export default {
  name: 'ModalAgendamento',
  components: { ConfirmarAgendamento, AgendadoComSucesso },
  props: ['horario', 'filtro'],
  data () {
    return {
      dialog: false,
      maximizedToggle: false,
      agendamento: null
    }
  },
  methods: {
    toggle () {
      this.dialog = !this.dialog
    },
    recebeAgendamento (agendamento) {
      this.agendamento = agendamento
    }
  }
}
</script>
