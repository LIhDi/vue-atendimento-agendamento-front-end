export const getUnidadeDeAtendimento = (state) => {
  return state.guiche.unidadeDeAtendimento
}

export const getGuiche = (state) => {
  return state.guiche.guiche
}

export const getFiltroGuiche = (state) => {
  return JSON.parse(JSON.stringify(state.guiche))
}

export const getFiltroRecepcao = (state) => {
  return JSON.parse(JSON.stringify(state.recepcao))
}
