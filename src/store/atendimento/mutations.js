export function setFiltroGuiche (state, value) {
  state.guiche = JSON.parse(JSON.stringify(value))
}

export function setFiltroRecepcao (state, value) {
  state.recepcao = JSON.parse(JSON.stringify(value))
}
