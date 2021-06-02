<template>
  <div>
    <q-table
      :data="agendamentos"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      @request="request"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      no-data-label="Nenhum agendamento para exibir"
      no-results-label="Nenhum agendamento para exibir"
      rows-per-page-label="Agendamentos por página:"
      row-key="id"
      class="no-border-grid text-grey-10"
    >
      <template v-slot:top-right>
        <EditarAgendamentoModalApagarTodos :filtro="payload" @atualizarGrid="getAgendamentosParaEdicao" />
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="dataFormatada" :props="props">
          {{ props.row.dataFormatada }}
        </q-td>
        <q-td key="horaFormatada" :props="props">
          {{ props.row.horaFormatada }}
        </q-td>
        <q-td key="nome" :props="props">
          {{ props.row.nome }}
        </q-td>
        <q-td key="cpfOuCnpj" :props="props">
          {{ props.row.cpfOuCnpj }}
        </q-td>
        <q-td key="email" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="acao" :props="props">
          <div class="row justify-center">
            <div>
              <q-btn
                icon="add" color="green-9"
                flat round size="10px"
                title="Duplicar Horário"
                @click="duplicarHorario(props.row)"
              />
            </div>
            <EditarAgendamentoModalCancelarAgendamento class="q-mt-xs" :horarios="[props.row]" @atualizarGrid="getAgendamentosParaEdicao" />
          </div>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import EditarAgendamentoModalCancelarAgendamento from './EditarAgendamentoModalCancelarAgendamento'
import EditarAgendamentoModalApagarTodos from './EditarAgendamentoModalApagarTodos'
export default {
  name: 'EditarAgendamentoGrid',
  components: { EditarAgendamentoModalCancelarAgendamento, EditarAgendamentoModalApagarTodos },
  data () {
    return {
      columns: [
        { name: 'dataFormatada', align: 'center', label: 'Data', field: 'data' },
        { name: 'horaFormatada', align: 'center', label: 'Horário', field: 'horaFormatada' },
        { name: 'nome', align: 'center', label: 'Nome', field: 'nome' },
        { name: 'cpfOuCnpj', align: 'center', label: 'CPF/CNPJ', field: 'cpfOuCnpj' },
        { name: 'email', align: 'center', label: 'Email', field: 'email' },
        { name: 'acao', align: 'center', label: 'Ação', field: 'acao' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 8,
        rowsNumber: 8 // specifying this determines pagination is server-side
      },
      agendamentos: [],
      loading: false,
      payload: null,
      pesquisaAgendamentosMock: [
        {
          id: 936492,
          dataAgendamento: 1620047458000,
          dataFormatada: '03/06/2021',
          horaFormatada: '10:10',
          nome: 'João Carlos',
          cpfOuCnpj: '12345677700',
          email: 'joao.carlos@gmail.com'
        },
        {
          id: 936492,
          dataAgendamento: 1620047458000,
          dataFormatada: '10/06/2021',
          horaFormatada: '10:30'
        }
      ]
    }
  },
  methods: {
    pesquisar (filtro) {
      this.pagination.page = 1
      this.payload = filtro
      this.payload.page = this.pagination.page
      this.payload.rows = this.pagination.rowsPerPage
      this.getAgendamentosParaEdicao()
    },
    getAgendamentosParaEdicao () {
      if (this.payload.page === 1) {
        this.pagination.rowsNumber = this.pesquisaAgendamentosMock.length
      }
      this.agendamentos = this.pesquisaAgendamentosMock
    },
    duplicarHorario (agendamento) {
      agendamento.id = agendamento.id + 1
      this.agendamentos.push(agendamento)
      this.$sucesso('Horário duplicado!')
      this.getAgendamentosParaEdicao()
    },
    request (props) {
      this.payload.rows = props.pagination.rowsPerPage
      this.payload.page = props.pagination.page
      this.pagination = props.pagination
      this.getAgendamentosParaEdicao()
    }
  }
}
</script>
