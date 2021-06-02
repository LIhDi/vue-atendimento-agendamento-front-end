<template>
  <div>
    <div class="row q-gutter-sm q-pa-md">
      <div class="col-md-6 col-xs-12">
        <SelectStatus v-model="filtro.status" />
      </div>
      <div class="col-md-6 col-xs-12">
        <SelectUnidadesDeAtendimento v-model="filtro.unidadeAtendimento" />
      </div>
    </div>
    <div class="row q-gutter-sm q-pl-md q-pr-md">
      <div class="col-md-6 col-xs-12">
        <q-select
          label="Buscar por:"
          v-model="filtro.tipoBusca"
          :options="listTipoBusca"
          outlined dense required
        />
      </div>
      <div class="col-md-6 col-xs-12" v-if="filtro.tipoBusca && filtro.tipoBusca !== 'FILA DO DIA'">
        <InputTexto :label="filtro.tipoBusca" v-model="filtro.texto" />
      </div>
      <div class="col-md-6 col-xs-12 q-pa-xs">
        <BtnPesquisar v-if="filtro.tipoBusca === 'FILA DO DIA' || filtro.texto" @click="atualizarFila()" />
      </div>
    </div>
  </div>
</template>

<script>
import SelectStatus from 'components/commons/SelectStatus'
import SelectUnidadesDeAtendimento from 'components/commons/SelectUnidadesDeAtendimento'
import InputTexto from 'components/commons/InputTexto'
import BtnPesquisar from 'components/commons/BtnPesquisar'
export default {
  name: 'RecepcaoFilaDoDiaFiltro',
  components: { SelectStatus, SelectUnidadesDeAtendimento, InputTexto, BtnPesquisar },
  created () {
    this.filtro = this.$store.getters['atendimento/getFiltroRecepcao']
  },
  data () {
    return {
      listTipoBusca: ['FILA DO DIA', 'NOME', 'CPF/CNPJ', 'SENHA'],
      filtro: {}
    }
  },
  methods: {
    atualizarFila () {
      this.$store.commit('atendimento/setFiltroRecepcao', this.filtro)
      this.$emit('atualizarFila', this.filtro)
    }
  }
}
</script>
