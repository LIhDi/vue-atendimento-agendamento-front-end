<template>
  <div>
    <div v-if="listHorarios.length > 0">
      <q-table
        :data="listHorarios"
        :columns="columns"
        :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
        no-data-label="Nenhum intervalo para exibir"
        no-results-label="Nenhum intervalo para exibir"
        rows-per-page-label="Intervalos por página:"
        :rows-per-page-options="[0]"
        row-key="index"
        class="no-border-grid text-grey-10"
      >
        <template v-slot:top-left>
          <q-chip square class="bg-blue-10 text-white text-bold">
            {{unidadeDeAtendimento.label}}
          </q-chip>
        </template>
        <template v-slot:top-right>
          <q-btn
            label="Limpar"
            icon="fas fa-eraser"
            @click="listHorarios = []"
            text-color="grey-9"
            class="text-bold"
            size="10px"
          />
        </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="dia" :props="props">
            {{ props.row.dia }}
          </q-td>
          <q-td key="horaInicioManha" :props="props">
            {{ props.row.horaManhaInicio }}
          </q-td>
          <q-td key="horaFimManha" :props="props">
            {{ props.row.horaManhaFim }}
          </q-td>
          <q-td key="guichesManha" :props="props">
            {{ props.row.guichesManha }}
          </q-td>
          <q-td key="intervaloManha" :props="props">
            {{ props.row.intervaloManha }}
          </q-td>
          <q-td key="horaInicioTarde" :props="props">
            {{ props.row.horaTardeInicio }}
          </q-td>
          <q-td key="horaFimTarde" :props="props">
            {{ props.row.horaTardeFim }}
          </q-td>
          <q-td key="guichesTarde" :props="props">
            {{ props.row.guichesTarde }}
          </q-td>
          <q-td key="intervaloTarde" :props="props">
            {{ props.row.intervaloTarde }}
          </q-td>
          <q-td key="cancelar" :props="props">
            <q-btn
              icon="fas fa-minus"
              label="Retirar"
              text-color="red-9"
              flat dense size="10px"
              @click="retirar(props.row.index)"
            />
          </q-td>
        </q-tr>
      </q-table>
      <div class="row justify-end q-mt-md">
        <div>
          <BtnConfirmar @click="confirmar()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date, QSpinnerGears } from 'quasar'
import BtnConfirmar from 'components/commons/BtnConfirmar'
export default {
  name: 'CriarHorariosGrid',
  components: { BtnConfirmar },
  data () {
    return {
      columns: [
        { name: 'dia', align: 'center', label: 'Data', field: 'dia', headerClasses: 'bg-grey-3' },
        { name: 'horaInicioManha', align: 'center', label: 'Início Manhã', field: 'horaInicioManha', headerClasses: 'bg-yellow-3' },
        { name: 'horaFimManha', align: 'center', label: 'Fim Manhã', field: 'horaFimManha', headerClasses: 'bg-yellow-3' },
        { name: 'guichesManha', align: 'center', label: 'Guichês', field: 'guichesManha', headerClasses: 'bg-yellow-3' },
        { name: 'intervaloManha', align: 'center', label: 'Intervalo', field: 'intervaloManha', headerClasses: 'bg-yellow-3' },
        { name: 'horaInicioTarde', align: 'center', label: 'Início Tarde', field: 'horaInicioTarde', headerClasses: 'bg-cyan-1' },
        { name: 'horaFimTarde', align: 'center', label: 'Fim Tarde', field: 'horaFimTarde', headerClasses: 'bg-cyan-1' },
        { name: 'guichesTarde', align: 'center', label: 'Guichês', field: 'guichesTarde', headerClasses: 'bg-cyan-1' },
        { name: 'intervaloTarde', align: 'center', label: 'Intervalo', field: 'intervaloTarde', headerClasses: 'bg-cyan-1' },
        { name: 'cancelar', align: 'center', label: 'Cancelar', field: 'cancelar', headerClasses: 'bg-grey-3' }
      ],
      listHorarios: [],
      unidadeDeAtendimento: null
    }
  },
  methods: {
    confirmarHorarios (listHorarios) {
      this.unidadeDeAtendimento = listHorarios[0].unidadeDeAtendimento
      this.listHorarios = this.incluiPropriedadeIndiceNoArray(listHorarios)
    },
    retirar (index) {
      this.listHorarios.splice(index, 1)
      this.listHorarios = this.incluiPropriedadeIndiceNoArray(this.listHorarios)
    },
    confirmar () {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        delay: 400
      })
      const horarios = this.montaHorarios()
      this.$api.agenda.criaHorarios(horarios)
        .then(response => {
          if (response.data.type === 'SUCCESS') {
            this.listHorarios = []
            this.$sucesso('Horários criados com sucesso!')
          }
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    incluiPropriedadeIndiceNoArray (array) {
      return array.map((val, idx) => ({ ...val, index: idx }))
    },
    montaHorarios () {
      const horarios = []
      this.listHorarios.forEach(horario => {
        if (horario.checkedManha) {
          let manha = this.formataDataHora(horario.dia, horario.horaManhaInicio)
          const fimManha = this.formataDataHora(horario.dia, horario.horaManhaFim)
          while (manha < fimManha) {
            for (let i = 0; i < horario.guichesManha; i++) {
              horarios.push({
                dataAgendamento: manha,
                idUnidadeAtendimento: horario.unidadeDeAtendimento.value,
                tipoAgendamento: horario.tipoAgendamento,
                turno: 'M'
              })
            }
            manha = date.addToDate(manha, { minutes: horario.intervaloManha })
          }
        }
        if (horario.checkedTarde) {
          let tarde = this.formataDataHora(horario.dia, horario.horaTardeInicio)
          const fimTarde = this.formataDataHora(horario.dia, horario.horaTardeFim)
          while (tarde < fimTarde) {
            for (let i = 0; i < horario.guichesTarde; i++) {
              horarios.push({
                dataAgendamento: tarde,
                idUnidadeAtendimento: horario.unidadeDeAtendimento.value,
                tipoAgendamento: horario.tipoAgendamento,
                turno: 'T'
              })
            }
            tarde = date.addToDate(tarde, { minutes: horario.intervaloTarde })
          }
        }
      })
      return horarios
    },
    formataDataHora (data, hora) {
      return date.buildDate({
        date: data.substring(0, 2),
        month: data.substring(3, 5),
        year: data.substring(6, 10),
        hours: hora.substring(0, 2),
        minutes: hora.substring(3, 5)
      })
    }
  }
}
</script>
