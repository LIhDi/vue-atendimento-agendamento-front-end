<template>
  <div>
    <ModalConfirm
      ref="modalConfirm"
      :toggleBtnProps="{ label: 'Cancelar', icon: 'fas fa-times', color: 'red-5', title: 'Cancelar Agendamento' }"
      :texto="'Após sua confirmação, seu horário de agendamento será cancelado.'"
      @click="confirma"
    />
  </div>
</template>
<script>
import ModalConfirm from 'components/commons/ModalConfirm'
export default {
  name: 'ModalCancelarAgendamento',
  components: { ModalConfirm },
  props: ['agendamento'],
  methods: {
    confirma () {
      this.$emit('atualizarAgendamentos', this.agendamento)
      this.$refs.modalConfirm.toggle()
    }
  }
}
</script>
