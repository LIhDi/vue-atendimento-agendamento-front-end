<template>
  <div>
    <q-input
      :label="label"
      :value="value"
      mask="##/##/####"
      :rules="regexData"
      outlined dense
      required
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy v-model="showPopup" transition-show="scale" transition-hide="scale">
            <q-date
              :value="value"
              :options="diasSelecionaveis"
              @input="atualiza"
              mask="DD/MM/YYYY"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Fechar" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
import feriados from 'assets/feriados'
export default {
  name: 'InputData',
  props: ['value', 'label', 'somenteDataFutura'],
  data () {
    return {
      showPopup: false,
      regexData: [v => /^[0-3]\d\/[0-1]\d\/?[\d]+$/.test(v)],
      listFeriados: feriados.map(el => el.data)
    }
  },
  methods: {
    atualiza (value) {
      this.$emit('input', value)
      this.showPopup = !this.showPopup
    },
    diasSelecionaveis (date) {
      const DOMINGO = 0
      const SABADO = 6
      const data = new Date(date)
      if (this.somenteDataFutura) {
        return date.replace(/\//g, '-') >= (new Date().toISOString().split('T')[0]) &&
             data.getDay() !== DOMINGO &&
             data.getDay() !== SABADO &&
             !this.ehFeriado(data)
      } else {
        return data.getDay() !== DOMINGO &&
               data.getDay() !== SABADO &&
               !this.ehFeriado(data)
      }
    },
    ehFeriado (data) {
      const dataFormatada = data.getDate() + '/' + (data.getMonth() + 1)
      return this.listFeriados.includes(dataFormatada)
    }
  }
}
</script>
