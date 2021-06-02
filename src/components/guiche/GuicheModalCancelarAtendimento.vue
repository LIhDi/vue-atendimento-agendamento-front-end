<template>
  <div>
    <ModalConfirm
      ref="modalConfirm"
      :toggleBtnProps="{ icon: 'fas fa-times', color: 'red', title: 'Cancelar Atendimento' }"
      :texto="'Após sua confirmação este atendimento será cancelado.'"
      @click="confirma"
    />
  </div>
</template>

<script>
import ModalConfirm from 'components/commons/ModalConfirm'
export default {
  name: 'GuicheModalCancelarAtendimento',
  components: { ModalConfirm },
  props: ['agendamento'],
  methods: {
    confirma () {
      this.$refs.modalConfirm.startLoading()
      this.$api.guiche.cancelarAtendimento({ id: this.agendamento.id, guiche: this.$store.getters['atendimento/getGuiche'].value })
        .then(response => {
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
