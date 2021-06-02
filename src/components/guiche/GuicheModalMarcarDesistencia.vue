<template>
  <div>
    <ModalConfirm
      ref="modalConfirm"
      :toggleBtnProps="{ icon: 'far fa-thumbs-down', color: 'red', title: 'Marcar Desistência' }"
      :texto="'Após sua confirmação este atendimento será marcado como desistência.'"
      @click="confirma"
    />
  </div>
</template>

<script>
import ModalConfirm from 'components/commons/ModalConfirm'
export default {
  name: 'GuicheModalMarcarDesistencia',
  components: { ModalConfirm },
  props: ['agendamento'],
  methods: {
    confirma () {
      this.$refs.modalConfirm.startLoading()
      this.$api.guiche.marcarDesistencia({ id: this.agendamento.id })
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
