<template>
  <q-item
    clickable
    :to="'/' + menu.sref"
    active-class="menu-ativo"
  >
    <q-item-section
      v-if="menu.icon"
      avatar
    >
      <q-icon :name="menu.icon" class="text-grey-9 q-ml-md" size="16px" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ menu.text }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: ['menu']
}
</script>
<style scoped>
.menu-ativo {
  background-color: rgba(74, 234, 255, .05);
  border-left: 3px solid #16346a;
}
</style>
