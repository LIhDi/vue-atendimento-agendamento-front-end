<template>
  <q-page>
    <CardNaoPossuiAgendamento v-if="agendamentos.length === 0"/>
    <div v-if="agendamentos">
      <div v-for="a in agendamentos" :key="a.id">
        <div class="row q-pa-md justify-between q-ma-md text-grey-9 text-bold text-body2" style="border: 1px solid grey;">
          <div>
            <q-icon name="today" size="20px" color="grey-9" />
            {{a.diaFormatado}} - {{a.dataFormatada}} - Horário: {{a.horaFormatada}} -
            Turno: {{a.turno === 'M' ? 'Manhã' : 'Tarde'}} -
            {{a.assunto.descricao}} - Local: {{a.localAtendimento}}
          </div>
          <div class="row q-gutter-md">
            <ModalCancelarAgendamento :agendamento="a" @atualizarAgendamentos="getMeusAgendamentos" />
            <ModalImpressaoAgendamento :agendamento="a" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CardNaoPossuiAgendamento from './CardNaoPossuiAgendamento'
import ModalImpressaoAgendamento from './ModalImpressaoAgendamento'
import ModalCancelarAgendamento from './ModalCancelarAgendamento'
export default {
  name: 'MeusAgendamentos',
  components: { CardNaoPossuiAgendamento, ModalImpressaoAgendamento, ModalCancelarAgendamento },
  created () {
    this.getMeusAgendamentos()
  },
  data () {
    return {
      agendamentos: [],
      filteredArray: [],
      meusAgendamentosMock: [
        {
          id: 947206,
          dataFormatada: '03/05/2021',
          horaFormatada: '16:30',
          diaFormatado: 'Sexta-Feira',
          localAtendimento: 'RIO DE JANEIRO',
          cpfOuCnpj: '111.222.333-44',
          nome: 'ALINE CRISTINA DA SILVA DIOGO',
          email: 'aline.diogo@gmail.com',
          senha: 'AE895',
          telefone: '21988762664',
          assunto: {
            descricao: 'AUTENTIFICÃO DE DOCUMENTOS'
          }
        },
        {
          id: 947207,
          dataFormatada: '24/06/2021',
          horaFormatada: '13:30',
          diaFormatado: 'Segunda-Feira',
          localAtendimento: 'RIO DE JANEIRO',
          cpfOuCnpj: '111.222.333-44',
          nome: 'ALINE CRISTINA DA SILVA DIOGO',
          email: 'aline.diogo@gmail.com',
          senha: 'AE895',
          telefone: '21988762664',
          assunto: {
            descricao: 'AUTENTIFICÃO DE DOCUMENTOS'
          }
        }
      ]
    }
  },
  methods: {
    getMeusAgendamentos (val) {
      if (val) {
        this.filteredArray = this.agendamentos.filter((item) => {
          return item.id !== val.id
        })
        this.agendamentos = this.filteredArray
      } else {
        this.agendamentos = this.meusAgendamentosMock
      }
    }
  }
}
</script>
