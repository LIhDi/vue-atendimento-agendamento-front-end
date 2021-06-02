<template>
  <div>
    <q-input
      label="Data e Hora"
      :value="value"
      @input="atualiza"
      outlined dense
      required
      ref="inputData"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy v-model="showPopupData" transition-show="scale" transition-hide="scale">
            <q-date
              name="data"
              :value="value"
              :options="diasNaoSelecionaveis"
              @input="atualiza"
              mask="DD/MM/YYYY HH:mm"
              today-btn
              ref="data"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Fechar" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy v-model="showPopupHora" transition-show="scale" transition-hide="scale">
            <q-time
              name="time"
              :value="value"
              @input="atualiza"
              mask="DD/MM/YYYY HH:mm"
              format24h
              now-btn
              ref="inputTime"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Fechar" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  name: 'InputDataHora',
  props: ['value'],
  data () {
    return {
      showPopupData: false,
      showPopupHora: false
    }
  },
  methods: {
    atualiza (val) {
      this.$emit('input', val)
      this.showPopupData = false
      this.showPopupHora = false
    },
    diasNaoSelecionaveis (date) {
      return new Date(date).getDay() !== 0 && new Date(date).getDay() !== 6
    }
  }
}
</script>
