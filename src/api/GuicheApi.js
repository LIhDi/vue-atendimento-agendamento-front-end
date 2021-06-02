import { restApi } from 'boot/axios'

const resource = 'atendimento/agendamento/guiche/'

export default {
  getAtendidosHoje: (filtro) => restApi.post(resource + 'listar-atendidos-dia', filtro),
  finalizarAtendimento: (agendamento) => restApi.put(resource + 'finalizar-atendimento', agendamento),
  iniciarAtendimento: (agendamento) => restApi.put(resource + 'iniciar-atendimento', agendamento),
  liberarCliente: (agendamento) => restApi.put(resource + 'liberar-cliente', agendamento),
  getEmAndamento: (filtro) => restApi.post(resource + 'fila-andamento', filtro),
  getFilaDoDia: (filtro) => restApi.post(resource + 'fila-do-dia', filtro),
  chamarCliente: (agendamento) => restApi.put(resource + 'chamar-cliente', agendamento),
  rechamarCliente: (agendamento) => restApi.put(resource + 'rechamar-cliente', agendamento),
  cancelarAtendimento: (agendamento) => restApi.put(resource + 'cancela', agendamento),
  marcarDesistencia: (agendamento) => restApi.put(resource + 'confirmacao-ausencia', agendamento)
}
