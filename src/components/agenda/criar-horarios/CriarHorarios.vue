<template>
  <div class="q-pa-md">
    <CardInformativo tipo="criarHorarios" />
    <CriarHorariosFiltro @confirmarHorarios="confirmarHorarios" class="q-mt-sm" />
    <CriarHorariosGrid ref="criarHorariosGrid" />
  </div>
</template>

<script>
import CardInformativo from 'components/commons/CardInformativo'
import CriarHorariosFiltro from './CriarHorariosFiltro'
import CriarHorariosGrid from './CriarHorariosGrid'
export default {
  name: 'CriarHorarios',
  components: { CardInformativo, CriarHorariosFiltro, CriarHorariosGrid },
  methods: {
    confirmarHorarios (listHorarios) {
      this.$refs.criarHorariosGrid.confirmarHorarios(listHorarios)
    }
  }
}
</script>
