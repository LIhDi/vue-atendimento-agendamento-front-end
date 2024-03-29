import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import atendimento from './atendimento'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      atendimento
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./user', './atendimento'], () => {
      const newUser = require('./user').default
      const newAtendimento = require('./atendimento').default
      Store.hotUpdate({
        modules: {
          user: newUser,
          atendimento: newAtendimento
        }
      })
    })
  }

  return Store
}
