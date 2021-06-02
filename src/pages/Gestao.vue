<template>
  <q-page class="q-pa-md" style="background-color: #f5f7fa;">
    <div>
      <q-tabs
        v-model="tab"
        align="left"
        inline-label
        narrow-indicator
        no-caps
        class="text-grey-9 bg-grey-3 text-bold"
        active-bg-color="white"
        indicator-color="primary"
        style="font-family: system-ui;"
      >
        <q-tab icon="filter_alt" name="relatorio" label="Relatório" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="dashboard-tab-panel"
        >
          <q-tab-panel name="relatorio">
            <Relatorio />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import Relatorio from 'components/gestao/relatorio/Relatorio'
export default {
  name: 'Gestao',
  components: { Relatorio },
  data () {
    return {
      tab: 'relatorio'
    }
  }
}
</script>
<style scoped>
.dashboard-tab-panel .q-tab-panel {
  padding: 0;
}
</style>
