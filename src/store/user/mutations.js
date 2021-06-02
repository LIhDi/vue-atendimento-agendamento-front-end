import { restApi } from 'boot/axios'

export function setUser (state, user) {
  state.user = user

  state.listaMenu = []
  if (state.user.perfil) {
    state.user.perfil.modulos.forEach(modulo => {
      if (modulo.nome === 'atendimento-agendamento') {
        state.listaMenu = JSON.parse(JSON.stringify(modulo.menus))
      }
    })
  } else {
    state.listaMenu = []
  }
}

export function setToken (state, token) {
  localStorage.setItem('token', token)
  restApi.defaults.headers.Authorization = localStorage.getItem('token')
  state.token = token
}

export const offUser = (state) => {
  state.user = null
  setToken(state, null)
}
