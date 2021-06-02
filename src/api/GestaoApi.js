import { restApi } from 'boot/axios'

const resource = 'atendimento/agendamento/gestao/'

export default {
  pesquisaIndicadores: (filtro) => restApi.post(resource + 'pesquisa', filtro),
  getLogs: (filtro) => restApi.post(resource + 'logs', filtro)
}
