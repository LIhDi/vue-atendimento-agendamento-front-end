export const getUser = (state) => {
  return state.user
}

export const getUserName = (state) => {
  if (state.user) {
    return state.user.nome
  }
}

export const getSiglaDepartamento = (state) => {
  if (state.user) {
    if (state.user.departamento) {
      return state.user.departamento.sigla
    }
  }
}

export const getMenu = (state) => {
  return state.listaMenu
}
