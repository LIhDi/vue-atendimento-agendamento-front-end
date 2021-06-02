import { restApi } from 'boot/axios'

export default {
  getTipoAgendamento: () => restApi.get('/tipo-agendamento'),
  getAssuntosAgendamento: () => restApi.get('/assuntos-agendamento'),
  getStatusAgendamento: () => restApi.get('/status-agendamento'),
  getUnidadesDeAtendimento: () => restApi.get('/unidades-atendimento')
}
