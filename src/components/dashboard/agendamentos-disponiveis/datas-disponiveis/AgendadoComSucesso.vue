<template>
  <div>
    <q-card>
      <q-bar class="bg-white text-grey-9 text-bold q-ma-sm q-pt-sm">
        Agendamento realizado com sucesso
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <q-separator />

      <q-card-section>
        <div class="text-red">
          ** Você pode imprimir sua senha no menu "Meus Agendamentos" **
        </div>
        ** Confira seus dados abaixo e imprima ou salve sua senha. **
        <br /><br />
        <div>
          <q-icon name="far fa-hand-point-right" />
          SEUS DADOS
        </div>
        <div>Nome: {{agendamento.nome}}</div>
        <div>CPF/CNPJ: {{agendamento.cpfOuCnpj}}</div>
        <div>E-mail: {{agendamento.email}}</div>
        <br />
        <div>
          <q-icon name="far fa-hand-point-right" />
          LOCAL
        </div>
        <div>Unidade: {{agendamento.localAtendimento}}</div>
        <div>Data: {{agendamento.dataFormatada}} - {{agendamento.diaFormatado}}</div>
        <div>Horário: {{agendamento.horaFormatada}}</div>
        <br/>
        <div class="q-pa-lg bg-grey-4 text-center">
          <span>SENHA</span> <br /><br />
          <span class="text-bold text-h4">{{agendamento.senha}}</span>
        </div>
        <br/>
        <div class="text-red">
          ** Chegue ao local com antecedência **<br />
          ** Sua senha é pessoal e intransferível, a apresentação é obrigatoria e a impressão opcional **<br />
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md row justify-end">
        <q-btn
          label="Fechar"
          bg-color="grey-5"
          text-color="grey-8"
          v-close-popup
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'DadosDoAgendamento',
  props: ['agendamento']
}
</script>
