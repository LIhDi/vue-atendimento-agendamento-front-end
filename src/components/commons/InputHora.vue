<template>
  <div>
    <q-input
      :label="label"
      :value="value"
      mask="time"
      :rules="['time']"
      outlined dense bg-color="white"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy v-model="showPopup" transition-show="scale" transition-hide="scale">
            <q-time
              :value="value"
              @input="atualiza"
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
  name: 'InputHora',
  props: ['value', 'label'],
  data () {
    return {
      showPopup: false
    }
  },
  methods: {
    atualiza (value) {
      this.$emit('input', value)
      this.showPopup = !this.showPopup
    }
  }
}
</script>
