<template>
  <div>
    <RelatorioFiltro @filtro="pesquisar" />
    <RelatorioGrid ref="relatorioGrid" />
  </div>
</template>

<script>
import RelatorioFiltro from './RelatorioFiltro'
import RelatorioGrid from './RelatorioGrid'
export default {
  name: 'Relatorio',
  components: { RelatorioFiltro, RelatorioGrid },
  methods: {
    pesquisar (filtro) {
      this.$refs.relatorioGrid.pesquisar(filtro)
    }
  }
}
</script>
