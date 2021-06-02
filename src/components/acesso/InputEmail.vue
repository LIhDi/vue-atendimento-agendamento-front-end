<template>
  <div>
    <q-input
      type="email"
      label="E-mail:"
      :value="value"
      @input="atualiza"
      :rules="[isValidEmail]"
      v-on:keyup.enter="enter()"
      placeholder="email@exemplo.com"
      outlined dense
      required
    />
  </div>
</template>
<script>
export default {
  name: 'InputEmail',
  props: ['value', 'semRegistro'],
  methods: {
    atualiza (val) {
      this.$emit('input', val)
    },
    isValidEmail (val) {
      if (val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val)
      } else {
        return true
      }
    },
    enter () {
      this.$emit('enter')
    }
  }
}
</script>
