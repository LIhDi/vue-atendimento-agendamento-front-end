<template>
  <div>
    <q-btn
      label="Imprimir"
      icon="print"
      @click="toggle(); imprimirAgendamento()"
      color="secondary" size="10px" class="text-bold"
    />
    <q-dialog
      v-model="dialog"
      full-width
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card style="width: 800px;">
         <q-bar class="bg-white text-grey-9 text-bold q-ma-sm">
          Impressão Agendamento
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-separator />

        <div id="printable" class="q-mx-auto" style="font-weight: 700;">
          <div style="margin-top: 24px;">
            <img style="display: block; margin: 0 auto;" src="https://portalservicos.crea-rj.org.br/images/brazil.jpg" alt="App Logo" width="128" height="128">
          </div>
          <h6 style="text-align: center;">SERVIÇO PÚBLICO </h6>
          <h6 style="text-align: center;">SERVIÇO PÚBLICO DO ESTADO DO RIO DE JANIERO</h6>
          <div class="row">
            <div class="q-mx-auto">
              Confira seus dados abaixo e imprima ou salve sua senha.
              <div style="margin-top: 24px; font-family: 'Font Awesome 5 Free';">
                <div>
                  SEUS DADOS <br />
                  Nome: {{agendamento.nome}}<br />
                  CPF/CNPJ: {{agendamento.cpfOuCnpj}} <br />
                  <div>E-mail: {{agendamento.email}}</div>
                  <div v-if="agendamento.telefone">Telefone: {{agendamento.telefone}}  <br />
                  </div>
                </div>
                <div style="margin-top: 16px;">
                  LOCAL<br />
                  Unidade: {{agendamento.localAtendimento}}  <br />
                  Data: {{agendamento.dataFormatada}} - {{agendamento.diaFormatado}}  <br />
                  Horário: {{agendamento.horaFormatada}}  <br />
                </div>
                <div style="margin-top: 16px;">
                  ASSUNTO<br />
                  Descrição: {{agendamento.assunto ? agendamento.assunto.descricao : ''}}  <br />
                </div>
              </div>
              <div style="margin-top: 16px; background-color: #eeeeee; border: 1px solid #d1cbcb; text-align: center;">
                <h4>SENHA</h4>
                <h2>{{agendamento.senha}}</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center col-12 q-mb-lg q-mt-lg q-gutter-md">
          <q-btn
            label="Imprimir"
            icon="fas fa-print"
            @click="imprimirAgendamento"
            color="grey-9" outline size="11px"
          />
          <q-btn
            label="Fechar"
            color="grey-9" outline size="11px"
            v-close-popup
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script src="https://www.google.com/cloudprint/client/cpgadget.js" />
<script>
export default {
  name: 'ModalImpressaoAgendamento',
  props: ['agendamento'],
  data () {
    return {
      dialog: false,
      maximizedToggle: false
    }
  },
  methods: {
    toggle () {
      this.dialog = !this.dialog
    },
    imprimirAgendamento () {
      setTimeout(function () {
        const printContents = document.getElementById('printable').innerHTML
        const mywindow = window.open('', '_blank')
        mywindow.document.write('<html><head><title>Impressao Agendamento</title></head><body>')
        mywindow.document.write(printContents)
        mywindow.document.write('</body></html>')
        // print = null
        setTimeout(function () {
          const userAgent = navigator.userAgent.toLowerCase()
          const isAndroid = userAgent.indexOf('android') > -1 //&& ua.indexOf("mobile");
          if (isAndroid) {
            // https://developers.google.com/cloud-print/docs/gadget
            const gadget = new cloudprint.Gadget()
            gadget.setPrintDocument('url', 'Impressao Agendamento', window.location.href, 'utf-8')
            gadget.openPrintDialog()
          } else {
            mywindow.print()
            mywindow.close()
          }
        }, 500)
      }, 500)
    }
  }
}
</script>
