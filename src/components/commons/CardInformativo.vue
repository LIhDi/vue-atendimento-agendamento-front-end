<template>
  <div>
    <q-card
      class="card-informativo"
    >
      <q-card-section>
        <div class="text-h6 card-informativo-title text-grey-8">{{textoCards[tipo].title}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          :class="'card-informativo-text ' + infoColor"
          v-for="info in textoCards[tipo].infos" :key="info"
        >
          - {{info}}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import textoCards from '../../assets/textoCards'
export default {
  name: 'CardInformativo',
  props: {
    tipo: {
      type: String,
      required: true
    },
    infoColor: {
      type: String,
      default: 'text-grey-8'
    }
  },
  data () {
    return {
      textoCards: textoCards
    }
  }
}
</script>

<style scoped>
.card-informativo {
  background-color: #e4eaec;
}

.card-informativo-title {
  font-weight: 700;
  font-size: 18px;
}

.card-informativo-text {
  padding-left: 10px;
}
</style>
