<template>
  <q-page class="q-pa-md" style="background-color: #f5f7fa;">
    <div>
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
        <q-tab icon="far fa-calendar-alt" name="criarHorarios" label="Criar Horários" />
        <q-tab icon="far fa-calendar-alt" name="editarAgendamento" label="Editar Horários" />

      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="slide-right"
          transition-next="slide-left"
          class="dashboard-tab-panel"
        >
          <q-tab-panel name="criarHorarios">
            <CriarHorarios />
          </q-tab-panel>

          <q-tab-panel name="editarAgendamento">
            <EditarAgendamento />
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import CriarHorarios from 'components/agenda/criar-horarios/CriarHorarios'
import EditarAgendamento from 'components/agenda/editar-agendamentos/EditarAgendamento'
export default {
  name: 'Agenda',
  components: { CriarHorarios, EditarAgendamento },
  data () {
    return {
      tab: 'criarHorarios'
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
