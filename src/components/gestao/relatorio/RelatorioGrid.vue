<template>
  <div>
    <q-table
      :data="listHorarios"
      :columns="columns"
      :pagination.sync="pagination"
      @request="request"
      :pagination-label="(inicio, fim, total) => {return inicio + '-' + fim + ' de ' + total}"
      no-data-label="Nenhum horário para exibir"
      no-results-label="Nenhum horário para exibir"
      rows-per-page-label="Horários por página:"
      row-key="id"
      class="no-border-grid text-grey-10 filtro-table"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-sm">
          <div>
            <q-btn
              v-if="listHorarios"
              label="Exportar Lista de Presença"
              icon="fas fa-file-csv"
              @click="exportarListaPresenca()"
              color="red-9" size="11px"
            >
              <q-tooltip content-class="bg-primary">Exporta apenas os dados exibidos em tela, com menos colunas</q-tooltip>
            </q-btn>
          </div>
          <div>
            <q-btn
              v-if="listHorarios"
              label="Exportar CSV"
              icon="fas fa-file-csv"
              @click="exportar()"
              color="green-6" size="11px"
            >
              <q-tooltip content-class="bg-primary">Exporta apenas os dados exibidos em tela</q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile } from 'quasar'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== undefined
    ? formatFn(val)
    : val

  formatted = formatted === undefined || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
  name: 'RelatorioGrid',
  data () {
    return {
      columns: [
        { name: 'dataAgendamento', align: 'center', label: 'Data', field: 'dataFormatada', sortable: true },
        { name: 'horario', align: 'center', label: 'Horário', field: 'horaFormatada' },
        { name: 'cpfOuCnpj', align: 'center', label: 'CPF/CNPJ', field: 'cpfOuCnpj' },
        { name: 'nome', align: 'center', label: 'Nome', field: 'nome' },
        { name: 'assunto', align: 'center', label: 'Assunto', field: row => row.assunto.descricao },
        { name: 'atendente', align: 'center', label: 'Atendente', field: row => row.funcionario.nome },
        { name: 'email', align: 'center', label: 'Email', field: 'email' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 8,
        rowsNumber: 8 // specifying this determines pagination is server-side
      },
      pesquisaRelatorioMock: [
        {
          id: 936492,
          dataAgendamento: 1620047458000,
          dataFormatada: '03/06/2021',
          horaFormatada: '10:10',
          nome: 'João Carlos',
          email: 'joao.carlos@gmail.com',
          cpfOuCnpj: '12345677700',
          status: {
            id: 1
          },
          assunto: {
            descricao: 'SEGUNDA VIA DOCUMENTO DE IDENTIFICAÇÃO NACIONAL'
          },
          funcionario: {
            nome: 'VANESSA GOMES'
          },
          senha: 'AN019'
        }
      ],
      listHorarios: null,
      filtro: null
    }
  },
  methods: {
    pesquisar (filtro) {
      this.pagination.page = 1
      this.filtro = filtro
      this.filtro.page = this.pagination.page
      this.filtro.rows = this.pagination.rowsPerPage
      this.getHorarios()
    },
    getHorarios () {
      this.pagination.rowsNumber = this.pesquisaRelatorioMock.length
      this.listHorarios = this.pesquisaRelatorioMock
    },
    exportar () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.listHorarios.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === undefined ? col.name : col.field],
          col.format
        )).join(';'))
      ).join('\r\n')

      const status = exportFile(
        'relatorioAgendamento.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$alerta('Navegador não permitiu o download do arquivo...')
      }
    },
    exportarListaPresenca () {
      const colunasListaPresenca = this.columns.filter(col => col.name === 'dataAgendamento' || col.name === 'horario' || col.name === 'cpfOuCnpj' || col.name === 'nome')
      const listaHorariosFiltrada = []

      this.listHorarios.map(horario => {
        listaHorariosFiltrada.push({ dataFormatada: horario.dataFormatada, horaFormatada: horario.horaFormatada, cpfOuCnpj: horario.cpfOuCnpj, nome: horario.nome })
      })

      // naive encoding to csv format
      const content = [colunasListaPresenca.map(col => wrapCsvValue(col.label))].concat(
        listaHorariosFiltrada.map(row => colunasListaPresenca.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === undefined ? col.name : col.field],
          col.format
        )).join(';'))
      ).join('\r\n')

      const status = exportFile(
        'listaDePresenca.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$alerta('Navegador não permitiu o download do arquivo...')
      }
    },
    request (props) {
      this.filtro.rows = props.pagination.rowsPerPage
      this.filtro.page = props.pagination.page
      this.pagination = props.pagination
      this.getHorarios()
    }
  }
}
</script>
<style>
.filtro-table td {
  font-size: 10px;
}
tr:nth-child(even) {
  background-color: #f7ffff;
}
</style>
