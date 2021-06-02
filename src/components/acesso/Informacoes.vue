<template>
    <div>
      <q-card-section class="bg-primary text-white text-bold" style="text-align: center; font-size: 20px">
        AGENDAMENTO
      </q-card-section>
    <q-separator />
    <q-card-section class="col-md-12 col-xs-12">
      <div class="col-md-6 col-xs-12">
        <span class="text-grey text-bold">ACESSO PARA A ÁREA PÚBLICA DOS AGENDAMENTOS</span>
      </div>
    </q-card-section>
  </div>
</template>
<script>
export default {
  name: 'Informacoes',
  methods: {
    acessoTipo (tipo) {
      this.$store.commit('agendamento/setTipoAgendamento', tipo)
    }
  }
}
</script>
