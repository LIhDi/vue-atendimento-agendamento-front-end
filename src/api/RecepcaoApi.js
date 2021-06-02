import { restApi } from 'boot/axios'

const resource = 'atendimento/agendamento/recepcao/'

export default {
  criarHorarioExtra: (horarios) => restApi.post(resource + 'cria-horario-extra', horarios),
  pesquisa: (filtro) => restApi.post(resource + 'pesquisa', filtro),
  confirmarPresenca: (agendamento) => restApi.put(resource + 'confirmacao-presenca', agendamento)
}
