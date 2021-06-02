<template>
  <q-page>
    <CardInformativo tipo="agendamentosDisponiveis" class="q-pa-sm" />
    <CardInformativo tipo="agendamentosDisponiveisAlerta" :infoColor="'text-red'" class="q-pa-sm" />
    <FiltroGeral @atualizaHorarios="atualizaHorarios" @atualizaFiltro="atualizaFiltro"/>
    <DatasDisponiveis ref="agDispHorarios" />
  </q-page>
</template>
<script>
import CardInformativo from 'components/commons/CardInformativo'
import FiltroGeral from './filtro/FiltroGeral'
import DatasDisponiveis from './datas-disponiveis/DatasDisponiveis'
export default {
  name: 'AgendamentosDisponiveis',
  components: { CardInformativo, FiltroGeral, DatasDisponiveis },
  methods: {
    atualizaHorarios (datas) {
      this.$refs.agDispHorarios.atualizaHorarios(datas)
    },
    atualizaFiltro (filtro) {
      this.$refs.agDispHorarios.atualizaFiltro(filtro)
    }
  }
}
</script>
