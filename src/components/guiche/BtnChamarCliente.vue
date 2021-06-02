<template>
  <div>
    <q-btn
      icon="fas fa-volume-up"
      color="orange"
      flat round size="8px"
      @click="chamar(agendamento)"
      :loading="loading"
      title="Chamar Cliente"
    >
      <template v-slot:loading>
        <q-spinner-ios size="30" />
      </template>
    </q-btn>
  </div>
</template>
<script>
import { throttle } from 'quasar'
export default {
  name: 'BtnChamarCliente',
  props: ['agendamento', 'rechamada'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    chamar (agendamento) {
      agendamento.guiche = this.$store.getters['atendimento/getGuiche'].value
      if (this.rechamada) {
        this.rechamarCliente(agendamento)
      } else {
        this.chamarCliente(agendamento)
      }
    },
    chamarCliente (agendamento) {
      this.loading = true
      this.$api.guiche.chamarCliente(agendamento)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.$emit('atualizarFila')
            this.$sucesso('Cliente chamado.')
          } else if (response.data.type === 'INFORMATION') {
            if (response.data.messages[0] === 'atendimento.clienteChamado') {
              this.$info(response.data.messages[0])
            } else {
              this.$info(response.data.messages[0])
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    rechamarCliente: throttle(function (agendamento) {
      this.loading = true
      this.$api.guiche.rechamarCliente(agendamento)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.$sucesso('Cliente chamado novamente.')
          }
        })
        .finally(() => {
          this.loading = false
        })
    }, 4000)
  }
}
</script>
