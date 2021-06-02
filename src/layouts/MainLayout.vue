<template>
  <q-layout view="lHh LpR lFf">
    <q-header class="bg-primary barra-titulo">
      <q-toolbar>
         <div v-if="!leftDrawerOpen">
          <router-link to="/app/home">
            <q-img
              src=""
              style="height: 48px; width: 48px"
            />
          </router-link>
          &nbsp;&nbsp;
        </div>
        <q-btn
          flat
          round size="11px"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <div class="row justify-between text-bold" style="font-size: 14px;">
            <div class="q-pa-sm nome-sistema">
              ATENDIMENTO AGENDAMENTO
              <span v-if="homologacao" class="text-red">
                - LOCAL
              </span>
            </div>
            <div v-if="$store.getters['user/getUserName']" class="q-pa-sm saudacao">
              OLÁ, {{$store.getters['user/getUserName']}} - {{$store.getters['user/getSiglaDepartamento']}}
              <q-btn
                icon="fas fa-ban"
                @click="logoff()"
                round size="7px"
              />
              <q-btn
                icon="fas fa-reply-all"
                @click="retornar()"
                round size="7px"
              />
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-1"
      :width="222"
    >
      <div class="bg-primary" style="height: 55px; padding: 10px 15px 10px 15px;">
        <div class="row justify-between  q-pa-sm nome-sistema text-bold" style="font-size: 14px; color: white">
              GESTORA ALINE DIOGO
            </div>
      </div>
      <div>
        <q-list>
          <q-item-label
            header
            class="text-grey-8"
          >
          Visão gestor
          </q-item-label>
          <EssentialLink
            v-for="menu in menu"
            :key="menu.text"
            :menu="menu"
          />
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white text-grey-9">
      <div class="row justify-center">
        <div>© {{ ano }} - Aline Diogo</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/commons/EssentialLink.vue'
import menu from '../assets/menu.js'
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      menu: menu,
      leftDrawerOpen: false,
      ano: (new Date()).getFullYear(),
      homologacao: process.env.AMBIENTE !== 'PROD' ? 'HOMOLOGAÇÃO' : ''
    }
  },
  methods: {
    logoff () {
      this.$router.push('/logoff')
    },
    retornar () {
      this.$router.push('/retorna')
    }
  }
}
</script>
<style>
.barra-titulo {
  min-height: 55px;
}
@media only screen and (min-width: 1025px) {
  .nome-sistema {
    display: block;
  }
}
@media only screen and (max-width: 1024px) {
  .nome-sistema {
    display: none;
  }
  .saudacao {
    white-space: normal;
   }
}
</style>
