<template>
  <div>
    <CardNaoPossuiHorario v-if="datas === null" />
    <div v-if="datas !== null && datas.length >= 1" class="q-ma-md q-pa-md" style="border: 1px solid #e4eaec;">
      <div class="row q-gutter-md q-mt-xs q-pa-xs">
        <div class="col-md-2 col-sm-3 col-xs-4" v-for="data in datas" :key="data.horario">
          <ModalHorarios :data="data" :filtro="filtro" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardNaoPossuiHorario from './CardNaoPossuiHorario'
import ModalHorarios from './ModalHorarios'
export default {
  name: 'DatasDisponiveis',
  components: { CardNaoPossuiHorario, ModalHorarios },
  data () {
    return {
      datas: [],
      filtro: null
    }
  },
  methods: {
    atualizaHorarios (datas) {
      this.datas = datas
    },
    atualizaFiltro (filtro) {
      this.filtro = filtro
    }
  }
}
</script>
