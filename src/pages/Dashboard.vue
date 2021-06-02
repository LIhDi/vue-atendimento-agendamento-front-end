<template>
<q-layout>
<q-page-container>
  <q-page style="background-color: #f5f7fa;">
    <div class="q-ma-sm" style="margin: 20px">
      <q-tabs
        v-model="tab"
        align="left"
        inline-label
        narrow-indicator
        no-caps
        class="text-grey-9 bg-grey-3"
        active-bg-color="white"
        indicator-color="primary"
      >
        <q-tab icon="far fa-calendar-alt" name="agendamentosDisponiveis" label="Agendamentos Disponíveis" class="q-pl-lg q-pr-lg" />
        <q-tab icon="schedule" name="meusAgendamentos" label="Meus Agendamentos" class="q-pl-lg q-pr-lg" style="font-weight: 700;" />
      </q-tabs>

      <div>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="slide-right"
          transition-next="slide-left"
          class="dashboard-tab-panel"
        >
          <q-tab-panel name="agendamentosDisponiveis">
            <AgendamentosDisponiveis />
          </q-tab-panel>

          <q-tab-panel name="meusAgendamentos">
            <MeusAgendamentos />
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>
  </q-page>
  </q-page-container>
  </q-layout>
</template>

<script>
import AgendamentosDisponiveis from 'components/dashboard/agendamentos-disponiveis/AgendamentosDisponiveis'
import MeusAgendamentos from 'components/dashboard/meus-agendamentos/MeusAgendamentos'
export default {
  name: 'Dashboard',
  components: { AgendamentosDisponiveis, MeusAgendamentos },
  data () {
    return {
      tab: 'agendamentosDisponiveis'
    }
  }
}
</script>
<style>
.dashboard-tab-panel .q-tab-panel {
  padding: 0;
}
.q-tab__label {
  font-weight: 700;
}
.q-tab__icon {
  font-size: 14px;
}
</style>
