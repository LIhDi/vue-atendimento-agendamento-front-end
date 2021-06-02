<template>
  <div class="q-pa-md">
    <q-table
      :data="atendimentos"
      :columns="columns"
      :loading="loading"
      :pagination.sync="pagination"
      @request="request"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
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
          <q-icon v-if="props.row.status.id === 3" name="far fa-thumbs-down" color="red" title="Não Compareceu" />
          <q-icon v-if="props.row.status.id === 7" name="fas fa-circle" color="orange" title="Em Atendimento" />
          <q-icon v-if="props.row.status.id === 8" name="fas fa-circle" color="green" title="No Local" />
        </q-td>
        <q-td key="chamar" :props="props">
          <BtnChamarCliente v-if="props.row.status.id !== 0" :agendamento="props.row" @atualizarFila="getFilaDoDia" />
        </q-td>
        <q-td key="horaFormatada" :props="props">
          {{ props.row.horaFormatada }}
        </q-td>
        <q-td key="horaChegada" :props="props">
          {{ props.row.horaChegada }}
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
        <q-td key="acao" :props="props">
          <div class="row justify-center">
            <GuicheModalMarcarDesistencia
              v-if="props.row.status.id !== 3 && props.row.status.id !== 0"
              :agendamento="props.row"
              @atualizarFila="getFilaDoDia"
            />
            <GuicheModalCancelarAtendimento :agendamento="props.row" @atualizarFila="getFilaDoDia" />
          </div>
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import BtnChamarCliente from '../BtnChamarCliente'
import GuicheModalMarcarDesistencia from '../GuicheModalMarcarDesistencia'
import GuicheModalCancelarAtendimento from '../GuicheModalCancelarAtendimento'
export default {
  name: 'GuicheFilaDoDiaGrid',
  components: { BtnChamarCliente, GuicheModalMarcarDesistencia, GuicheModalCancelarAtendimento },
  data () {
    return {
      columns: [
        { name: 'status', align: 'center', label: 'Status', field: 'status' },
        { name: 'chamar', align: 'center', label: 'Chamar', field: 'chamar' },
        { name: 'horaFormatada', align: 'center', label: 'Agendamento', field: 'horaFormatada' },
        { name: 'horaChegada', align: 'center', label: 'Chegada', field: 'horaChegada' },
        { name: 'nome', align: 'center', label: 'Nome', field: 'nome' },
        { name: 'cpfOuCnpj', align: 'center', label: 'CPF/CNPJ', field: 'cpfOuCnpj' },
        { name: 'senha', align: 'center', label: 'Senha', field: 'senha' },
        { name: 'acao', align: 'center', label: 'Ação', field: 'acao' }
      ],
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
      pagination: {
        page: 1,
        rowsPerPage: 8,
        rowsNumber: 8 // specifying this determines pagination is server-side
      },
      loading: false,
      atendimentos: [],
      payload: null
    }
  },
  methods: {
    atualizarFila (filtro) {
      this.pagination.page = 1
      this.payload = {
        page: this.pagination.page,
        rows: this.pagination.rowsPerPage,
        status: filtro.status.value,
        unidadeAtendimento: filtro.unidadeDeAtendimento.value
      }
      this.getFilaDoDia()
    },
    getFilaDoDia () {
      this.pagination.rowsNumber = this.pesquisaAtendimentosMock.length
      this.atendimentos = this.pesquisaAtendimentosMock
    },
    request (props) {
      this.payload.rows = props.pagination.rowsPerPage
      this.payload.page = props.pagination.page
      this.pagination = props.pagination
      this.getFilaDoDia()
    }
  }
}
</script>
