<template>
  <div>
    <FilaDoDiaFiltro @atualizarFila="atualizarFila" />
    <FilaDoDiaGrid ref="recepcaoFilaDoDiaGrid" />
  </div>
</template>

<script>
import FilaDoDiaFiltro from './RecepcaoFilaDoDiaFiltro'
import FilaDoDiaGrid from './RecepcaoFilaDoDiaGrid'
export default {
  name: 'RecepcaoFilaDoDia',
  components: { FilaDoDiaFiltro, FilaDoDiaGrid },
  methods: {
    atualizarFila (filtro) {
      this.$refs.recepcaoFilaDoDiaGrid.atualizarFila(filtro)
    }
  }
}
</script>
