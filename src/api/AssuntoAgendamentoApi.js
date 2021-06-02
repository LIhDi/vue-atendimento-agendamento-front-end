import { restApi } from 'boot/axios'

const resource = 'atendimento/agendamento/assunto/'

export default {
  getAssuntos: (payload) => restApi.post(resource, payload),
  ativacao: (payload) => restApi.post(resource + 'ativacao', payload),
  getSituacao: (payload) => restApi.get(resource + 'situacao/' + payload),
  adicionarSituacao: (payload) => restApi.post(resource + 'adicionar-situacao', payload),
  removerSituacao: (payload) => restApi.post(resource + 'remover-situacao', payload),
  getTipoPessoa: (payload) => restApi.get(resource + 'tipo-pessoa/' + payload),
  alterarProtocolo: (payload) => restApi.post(resource + 'alterar-protocolo', payload),
  alterarNome: (payload) => restApi.post(resource + 'alterar-nome', payload)
}
