<template>
  <div>
    <div style="margin-bottom: -30px;">
      <q-btn
        label="Guichês e Intervalos"
        @click="toggle(filtro)"
        :disabled="!filtro.dataFim || !filtro.dataInicio || !filtro.unidadeAtendimento || !filtro.dataFim || !filtro.dataInicio"
        icon="fas fa-desktop"
        outlined color="secondary" size="11px"
        class="q-ma-xs full-width"
      />
    </div>
    <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card>
        <q-bar class="bg-white text-grey-9 q-ma-sm">
          <span>Configuração de Turno e Guichês</span>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-separator />
        <div class="q-pa-md">
          <div class="bg-cyan-1 q-pa-md">
            <q-checkbox label="Manhã" v-model="configuracao.checkedManha" size="sm" />
            <div v-if="configuracao.checkedManha" class="row q-gutter-sm">
              <div class="col-md-3 col-xs-12">
                <InputIntervalo v-model="configuracao.intervaloManha" />
              </div>
              <div class="col-md-2 col-xs-12">
                <InputGuiche v-model="configuracao.guichesManha" />
              </div>
              <div class="col-md-3 col-xs-12">
                <InputHora label="Início Manhã" v-model="configuracao.horaManhaInicio" />
              </div>
              <div class="col-md-3 col-xs-12">
                <InputHora label="Fim Manhã" v-model="configuracao.horaManhaFim" />
              </div>
            </div>
          </div>
          <div class="bg-yellow-3 q-pa-md">
            <q-checkbox label="Tarde" v-model="configuracao.checkedTarde" size="sm" />
            <div v-if="configuracao.checkedTarde" class="row q-gutter-sm">
              <div class="col-md-3 col-xs-12">
                <InputIntervalo v-model="configuracao.intervaloTarde" />
              </div>
              <div class="col-md-2 col-xs-12">
                <InputGuiche v-model="configuracao.guichesTarde" />
              </div>
              <div class="col-md-3 col-xs-12">
                <InputHora label="Início Tarde" v-model="configuracao.horaTardeInicio" />
              </div>
              <div class="col-md-3 col-xs-12">
                <InputHora label="Fim Tarde" v-model="configuracao.horaTardeFim" />
              </div>
            </div>
          </div>
        </div>
        <q-separator />
        <q-card-section class="q-gutter-md row justify-end">
          <BtnConfirmar
            @click="confirmarConfiguracao(configuracao)"
            :disabled="!this.configuracao.checkedManha && !this.configuracao.checkedTarde"
          />
          <BtnCancelar />
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>

<script>
import InputIntervalo from 'components/commons/InputIntervalo'
import InputGuiche from 'components/commons/InputGuiche'
import InputHora from 'components/commons/InputHora'
import BtnConfirmar from 'components/commons/BtnConfirmar'
import BtnCancelar from 'components/commons/BtnCancelar'
export default {
  name: 'CriarHorariosModal',
  components: { InputIntervalo, InputGuiche, InputHora, BtnConfirmar, BtnCancelar },
  props: ['filtro'],
  data () {
    return {
      dialog: false,
      maximizedToggle: false,
      payload: null,
      configuracao: {
        intervaloManha: 20,
        intervaloTarde: 20,
        guichesManha: 1,
        guichesTarde: 1,
        checkedManha: true,
        checkedTarde: true,
        horaManhaInicio: '08:30',
        horaManhaFim: '12:00',
        horaTardeInicio: '13:30',
        horaTardeFim: '17:30'
      }
    }
  },
  methods: {
    toggle (filtro) {
      this.payload = filtro
      this.dialog = !this.dialog
    },
    confirmarConfiguracao (config) {
      const configuracao = JSON.parse(JSON.stringify(config))
      if (!configuracao.checkedManha) {
        delete configuracao.intervaloManha
        delete configuracao.guichesManha
        delete configuracao.horaManhaInicio
        delete configuracao.horaManhaFim
      }
      if (!configuracao.checkedTarde) {
        delete configuracao.intervaloTarde
        delete configuracao.guichesTarde
        delete configuracao.horaTardeInicio
        delete configuracao.horaTardeFim
      }
      this.$emit('confirmarConfiguracao', configuracao)
      this.dialog = !this.dialog
    }
  }
}
</script>
