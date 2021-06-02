<template>
  <div>
    <div class="row q-gutter-sm q-pa-md">
      <div class="col-md-6 col-xs-12">
        <SelectUnidadesDeAtendimento v-model="filtro.unidadeDeAtendimento" />
      </div>
      <div class="col-md-6 col-xs-12">
        <SelectGuiche v-model="filtro.guiche" />
      </div>
    </div>
    <div class="row q-gutter-sm q-pl-md q-pr-md">
      <div class="col-md-6 col-xs-12">
        <SelectStatus v-model="filtro.status" />
      </div>
      <div class="col-md-6 col-xs-12 q-pa-xs">
        <BtnPesquisar  @click="atualizarFila()" />
      </div>
    </div>
  </div>
</template>
<script>
import SelectUnidadesDeAtendimento from 'components/commons/SelectUnidadesDeAtendimento'
import SelectGuiche from 'components/commons/SelectGuiche'
import SelectStatus from 'components/commons/SelectStatus'
import BtnPesquisar from 'components/commons/BtnPesquisar'
export default {
  name: 'GuicheFilaDoDiaFiltro',
  components: { SelectUnidadesDeAtendimento, SelectGuiche, SelectStatus, BtnPesquisar },
  created () {
    this.filtro = this.$store.getters['atendimento/getFiltroGuiche']
  },
  data () {
    return {
      filtro: {}
    }
  },
  methods: {
    atualizarFila () {
      this.$store.commit('atendimento/setFiltroGuiche', this.filtro)
      this.$emit('atualizarFila', this.filtro)
    }
  }
}
</script>
