<template>
  <div>
    <ModalConfirm
      ref="modalConfirm"
      :toggleBtnProps="{ icon: 'fas fa-times', color: 'red', title: 'Cancelar Agendamento' }"
      :texto="'Após sua confirmação este agendamento será cancelado.'"
      @click="confirma"
    />
  </div>
</template>

<script>
import ModalConfirm from 'components/commons/ModalConfirm'
export default {
  name: 'EditarAgendamentoCancelarAgendamento',
  components: { ModalConfirm },
  props: ['horarios'],
  methods: {
    confirma () {
      this.$refs.modalConfirm.startLoading()
      this.$api.agenda.deletarAgendamentos(this.horarios)
        .then(response => {
          this.$sucesso('Horário cancelado!')
          this.$refs.modalConfirm.toggle()
          this.$emit('atualizarGrid')
        })
        .finally(() => {
          this.$refs.modalConfirm.stopLoading()
        })
    }
  }
}
</script>
