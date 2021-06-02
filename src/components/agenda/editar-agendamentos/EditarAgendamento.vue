<template>
  <div class="q-pa-md">
    <CardInformativo tipo="editarAgendamento" />
    <EditarAgendamentoFiltro @filtro="filtro" class="q-mt-sm" />
    <EditarAgendamentoGrid ref="editarAgendamentoGrid" />
  </div>
</template>

<script>
import CardInformativo from 'components/commons/CardInformativo'
import EditarAgendamentoFiltro from './EditarAgendamentoFiltro'
import EditarAgendamentoGrid from './EditarAgendamentoGrid'
export default {
  name: 'EditarAgendamento',
  components: { CardInformativo, EditarAgendamentoFiltro, EditarAgendamentoGrid },
  methods: {
    filtro (filtro) {
      this.$refs.editarAgendamentoGrid.pesquisar(filtro)
    }
  }
}
</script>
