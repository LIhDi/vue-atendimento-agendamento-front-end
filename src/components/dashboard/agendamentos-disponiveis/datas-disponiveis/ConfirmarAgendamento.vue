<template>
  <div>
    <q-card>
      <q-bar class="bg-white text-grey-9 q-ma-sm q-pt-sm" style="font-size:15px;">
        CONFIRMAÇÃO AGENDAMENTO
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <q-separator />

      <q-card-section>
        <q-card class="q-mt-sm">
          <div class="q-mb-md">
            <SelectAssunto
              v-model="assunto"
              :idUnidadeAtendimento="filtro.unidadeDeAtendimento.value"
            />
          </div>
          <q-card-section class="bg-orange text-white text-bold">
            ATENÇÃO!
          </q-card-section>
          <q-separator />
          <div>
            <q-card-section class="q-mt-md text-grey-10 q-pr-xl">
              <div v-if="filtro.unidadeDeAtendimento">
                <q-icon name="far fa-hand-point-right" />
                <strong>&nbsp;Unidade:</strong>
                {{filtro.unidadeDeAtendimento.label}}<br/>
              </div>
              <div v-if="horario">
                <q-icon name="far fa-hand-point-right" />
                <strong>&nbsp;Data:</strong>
                {{horario.dataFormatada}} ({{horario.diaFormatado}})<br/>
              </div>
              <div v-if="horario">
                <q-icon name="far fa-hand-point-right" />
                <strong>&nbsp;Horário:</strong>
                {{horario.horaFormatada}}
              </div>
            </q-card-section>
          </div>
        </q-card>
      </q-card-section>

      <q-card-section class="q-gutter-md row justify-end">
        <q-btn
          label="Agendar Horário"
          icon="thumb_up"
          color="primary" size="11px"
          @click="agendar()"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        <BtnCancelar />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import SelectAssunto from 'components/commons/SelectAssunto'
import BtnCancelar from 'components/commons/BtnCancelar'
export default {
  name: 'ConfirmarAgendamento',
  props: ['horario', 'filtro'],
  components: { SelectAssunto, BtnCancelar },
  data () {
    return {
      assunto: null,
      agendamentoMock: {
        id: 947206,
        dataFormatada: '24/06/2021',
        horaFormatada: '13:30',
        localAtendimento: 'RIO DE JANEIRO',
        diaFormatado: 'Segunda-Feira',
        cpfOuCnpj: '111.222.333-44',
        nome: 'ALINE CRISTINA DA SILVA DIOGO',
        email: 'aline.diogo@gmail.com',
        senha: 'AE895',
        telefone: '21988762664'
      }
    }
  },
  methods: {
    agendar () {
      this.$emit('recebeAgendamento', this.agendamentoMock)
    }
  }
}
</script>
