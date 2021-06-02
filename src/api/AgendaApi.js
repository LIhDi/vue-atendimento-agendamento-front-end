import { restApi } from 'boot/axios'

const resource = 'atendimento/agendamento/agenda/'

export default {
  criaHorarios: (horarios) => restApi.post(resource + 'cria-horarios', horarios),
  getAgendamentosEdicao: (filtro) => restApi.post(resource + 'agendamentos-edicao', filtro),
  duplicaAgendamento: (agendamento) => restApi.post(resource + 'duplica-agendamento', agendamento),
  deletarAgendamentos: (horarios) => restApi.put(resource + 'deletar-agendamentos', horarios),
  apagarTodosAgendados: (filtro) => restApi.put(resource + 'apagar-todos-agendados', filtro)
}
