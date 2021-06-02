<template>
  <div>
    <div class="row q-gutter-x-sm q-gutter-y-sm q-pa-sm">
      <div class="col-sm-3 col-xs-12" style="margin-top:40px">
        <SelectUnidadesDeAtendimento v-model="filtro.unidadeDeAtendimento" />
      </div>
      <div class="col-sm-3 col-xs-12 q-pa-xs" style="margin-top:40px">
        <q-btn
          label="Pesquisar Horários"
          icon="search"
          @click="pesquisarHorarios()"
          color="primary" size="11px"
          class="full-width"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import SelectUnidadesDeAtendimento from 'components/commons/SelectUnidadesDeAtendimento'
export default {
  name: 'AgendamentosDisponiveisFiltro',
  components: { SelectUnidadesDeAtendimento },
  data () {
    return {
      filtro: {},
      datasDisponiveisMock: [
        {
          data: 1624503600000,
          dataFormatada: '24/06/2021',
          quantidadeHorarios: 4
        },
        {
          data: 1624849200000,
          dataFormatada: '28/06/2021',
          quantidadeHorarios: 7
        },
        {
          data: 1625022000000,
          dataFormatada: '30/06/2021',
          quantidadeHorarios: 3
        }
      ]
    }
  },
  methods: {
    pesquisarHorarios () {
      this.$emit('atualizaHorarios', this.datasDisponiveisMock)
      this.$emit('atualizaFiltro', this.filtro)
    }
  }
}
</script>
