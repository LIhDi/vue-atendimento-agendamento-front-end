import { restApi } from 'boot/axios'

const resource = '/'

export default {
  usuarioSessao: (token) => restApi.get(resource + 'usuario-sessao', { headers: { Authorization: token } }),
  authSemLogin: (payload) => restApi.post(resource + 'auth/sem-login', payload),
  authCpfCnpj: (payload) => restApi.post(resource + 'auth/cpf-cnpj', payload),
  appointmentAccess: (payload) => restApi.post(resource + 'appointments-access', payload)
}
