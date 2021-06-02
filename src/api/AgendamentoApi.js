import { restApi } from 'boot/axios'

const resource = '/'

export default {
  getDatasDisponiveis: (payload) => restApi.post(resource + 'datas-disponiveis', payload),
  getHorariosDisponiveis: (payload) => restApi.post(resource + 'horarios-disponiveis', payload),
  agendarHorario: (payload) => restApi.put(resource + 'novo', payload),
  getHorariosAgendados: () => restApi.get(resource + 'agendados'),
  cancelaAgendamento: (payload) => restApi.post(resource + 'cancela', payload),
  verificaCarteiraPronta: () => restApi.post(resource + 'verifica-carteira-pronta'),
  validaPagamentoRegistro: (idAssunto) => restApi.get(resource + 'valida-pagamento-registro/' + idAssunto),
  getAssuntos: () => restApi.get(resource + 'assuntos-mobile')
}
