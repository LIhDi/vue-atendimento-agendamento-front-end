<template>
  <div>
    <div style="margin-bottom: -30px;">
      <q-btn
        label="Apagar Todos"
        icon="far fa-trash-alt"
        @click="toggle(filtro)"
        :disabled="!(filtro && filtro.dataInicio && filtro.dataFim)"
        color="negative" size="11px"
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
        <q-bar class="bg-white text-bold q-ma-sm">
          <span class="text-red-9">Exclusão de Agendamentos</span>
          <q-space />
          <q-btn dense flat icon="close" color="grey-6" v-close-popup />
        </q-bar>
        <div class="q-pa-md">
          Após sua confirmação todos os horários não agendados no intervalo indicado serão excluídos.<br />
        </div>
        <q-separator />
        <q-card-section class="q-gutter-md row justify-end">
          <BtnConfirmar @click="confirm()" ref="btnConfirmar" />
          <BtnCancelar />
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </div>
</template>

<script>
import BtnConfirmar from 'components/commons/BtnConfirmar'
import BtnCancelar from 'components/commons/BtnCancelar'
export default {
  name: 'EditarAgendamentoModalApagarTodos',
  components: { BtnConfirmar, BtnCancelar },
  props: ['filtro'],
  data () {
    return {
      dialog: false,
      maximizedToggle: false,
      payload: null
    }
  },
  methods: {
    toggle (filtro) {
      this.payload = filtro
      this.dialog = !this.dialog
    },
    confirm () {
      delete this.payload.page
      delete this.payload.rows
      this.$refs.btnConfirmar.loading = true
      this.$api.agenda.apagarTodosAgendados(this.payload)
        .then(response => {
          this.$sucesso('Horários apagados com sucesso.')
          this.dialog = !this.dialog
          this.$emit('atualizarGrid')
        })
        .finally(() => {
          if (this.$refs.btnConfirmar) {
            this.$refs.btnConfirmar.loading = false
          }
        })
    }
  }
}
</script>
