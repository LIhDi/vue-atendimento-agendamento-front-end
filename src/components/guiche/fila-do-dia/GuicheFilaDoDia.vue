<template>
  <div>
    <FilaDoDiaFiltro @atualizarFila="atualizarFila" />
    <FilaDoDiaGrid ref="guicheFilaDoDiaGrid" />
  </div>
</template>

<script>
import FilaDoDiaFiltro from './GuicheFilaDoDiaFiltro'
import FilaDoDiaGrid from './GuicheFilaDoDiaGrid'
export default {
  name: 'GuicheFilaDoDia',
  components: { FilaDoDiaFiltro, FilaDoDiaGrid },
  methods: {
    atualizarFila (filtro) {
      this.$refs.guicheFilaDoDiaGrid.atualizarFila(filtro)
    }
  }
}
</script>
