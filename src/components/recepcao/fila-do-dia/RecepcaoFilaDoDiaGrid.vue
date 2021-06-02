<template>
  <div class="q-pa-md">
    <q-table
      :data="atendimentos"
      :columns="columns"
      :loading="loading"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      :pagination.sync="pagination"
      @request="request"
      no-data-label="Nenhum agendamento para exibir"
      no-results-label="Nenhum agendamento para exibir"
      rows-per-page-label="Agendamentos por página:"
      row-key="id"
      class="no-border-grid text-grey-10"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="status" :props="props">
          <q-icon v-if="props.row.status.id === 0" name="fas fa-sign-in-alt" color="blue" title="Horário Disponível" />
          <q-icon v-if="props.row.status.id === 1" name="far fa-circle" color="green" title="Horário Agendado" />
          <q-icon v-if="props.row.status.id === 2" name="check_circle_outline" color="green-6" title="Finalizado com sucesso" />
          <q-icon v-if="props.row.status.id === 5" name="far fa-times-circle" color="grey-6" title="Cancelado pelo Usuário" />
          <q-icon v-if="props.row.status.id === 6" name="far fa-times-circle" color="red" title="Cancelado pelo Sistema" />
          <q-icon v-if="props.row.status.id === 3" name="far fa-thumbs-down" color="red" title="Não Compareceu" />
          <q-icon v-if="props.row.status.id === 7" name="fas fa-circle" color="orange" title="Em Atendimento" />
          <q-icon v-if="props.row.status.id === 8" name="fas fa-circle" color="positive" title="No Local" />
        </q-td>
        <q-td key="confirmar" :props="props">
          <RecepcaoModalConfirmarPresenca :agendamento="props.row" @atualizarFila="pesquisar" />
        </q-td>
        <q-td key="data" :props="props">
          {{ props.row.dataFormatada }}
        </q-td>
        <q-td key="horario" :props="props">
          {{ props.row.horaFormatada }}
        </q-td>
        <q-td key="nome" :props="props">
          {{ props.row.nome }}
        </q-td>
        <q-td key="cpfOuCnpj" :props="props">
          {{ props.row.cpfOuCnpj }}
        </q-td>
        <q-td key="senha" :props="props">
          {{ props.row.senha }}
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import RecepcaoModalConfirmarPresenca from './RecepcaoModalConfirmarPresenca'
export default {
  name: 'RecepcaoFilaDoDiaGrid',
  components: { RecepcaoModalConfirmarPresenca },
  data () {
    return {
      columns: [
        { name: 'status', align: 'center', label: 'Status', field: 'status' },
        { name: 'confirmar', align: 'center', label: 'Confirmar Presença', field: 'confirmar' },
        { name: 'data', align: 'center', label: 'Data', field: 'data' },
        { name: 'horario', align: 'center', label: 'Horário', field: 'horario' },
        { name: 'nome', align: 'center', label: 'Nome', field: 'nome' },
        { name: 'cpfOuCnpj', align: 'center', label: 'CPF/CNPJ', field: 'cpfOuCnpj' },
        { name: 'senha', align: 'center', label: 'Senha', field: 'senha' }
      ],
      atendimentos: [],
      pesquisaAtendimentosMock: [
        {
          id: 936492,
          dataAgendamento: 1620047458000,
          dataFormatada: '03/06/2021',
          horaFormatada: '10:10',
          nome: 'João Carlos',
          cpfOuCnpj: '12345677700',
          status: {
            id: 1
          },
          senha: 'AN019'
        },
        {
          id: 936493,
          dataAgendamento: 1620047458000,
          dataFormatada: '03/06/2021',
          horaFormatada: '10:30',
          nome: 'Ana Maria',
          cpfOuCnpj: '11122233344',
          status: {
            id: 1
          },
          senha: 'AN020'
        }
      ],
      payload: null,
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 8,
        rowsNumber: 8
      }
    }
  },
  methods: {
    atualizarFila (filtro) {
      this.pagination.page = 1
      this.payload = {
        page: this.pagination.page,
        rows: this.pagination.rowsPerPage,
        status: '' + filtro.status.value,
        idDepartamento: filtro.unidadeAtendimento.value
      }
      if (filtro.tipoBusca === 'NOME') this.payload.nomePessoa = filtro.texto
      if (filtro.tipoBusca === 'CPF/CNPJ') this.payload.cpfOuCnpj = filtro.texto
      if (filtro.tipoBusca === 'SENHA') this.payload.senha = filtro.texto
      this.pesquisar()
    },
    request (props) {
      this.payload.rows = props.pagination.rowsPerPage
      this.payload.page = props.pagination.page
      this.pagination = props.pagination
      this.pesquisar()
    },
    pesquisar () {
      this.pagination.rowsNumber = this.pesquisaAtendimentosMock.length
      this.atendimentos = this.pesquisaAtendimentosMock
    }
  }
}
</script>
<style>
tr:nth-child(even) {
  background-color: #f7ffff;
}
</style>
