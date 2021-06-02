<template>
  <div>
    <ModalConfirm
      v-if="agendamento && agendamento.status.id === 1"
      ref="modalConfirm"
      :toggleBtnProps="{ icon: 'fas fa-play', color: 'positive', title: 'Confirmar Presença' }"
      :texto="'Após sua confirmação o cliente será confirmado no local.'"
      @click="confirma"
    />
  </div>
</template>

<script>
import ModalConfirm from 'components/commons/ModalConfirm'
export default {
  name: 'RecepcaoModalConfirmarPresenca',
  components: { ModalConfirm },
  props: ['agendamento'],
  methods: {
    confirma () {
      this.$refs.modalConfirm.startLoading()
      this.$api.recepcao.confirmarPresenca({ id: this.agendamento.id })
        .then(response => {
          this.$sucesso('Presença confirmada!')
          this.$refs.modalConfirm.toggle()
          this.$emit('atualizarFila')
        })
        .finally(() => {
          this.$refs.modalConfirm.stopLoading()
        })
    }
  }
}
</script>
