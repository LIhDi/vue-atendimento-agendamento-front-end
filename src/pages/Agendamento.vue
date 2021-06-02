<template>
  <div class="index-page  bg-grey-4 window-height window-width column items-center no-wrap">
    <div class="card bg-white column no-wrap group" style="border-radius: 6px; -webkit-box-sizing: border-box; margin-top: 200px;">
      <div class="q-mt-md" style="">
        <div class="col-auto">
          <AgendamentoAcesso />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AgendamentoAcesso from 'components/acesso/AgendamentoAcesso'
export default {
  name: 'Agendamento',
  components: { AgendamentoAcesso },
  props: {
    tipo: {
      default: 'geral'
    }
  },
  created () {
    this.$store.commit('agendamento/setTipoAgendamentoPeloNome', this.tipo)
  }
}
</script>
