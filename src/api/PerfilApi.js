import { restApi } from 'boot/axios'

const resource = 'perfil/'

export default {
  atualizarPerfilPessoa: (payload) => restApi.post(resource + 'pessoa-perfil', payload),
  getPerfilPessoa: (id) => restApi.get(resource + 'pessoa/' + id),
  getPermissionadosPorPerfil: (idPerfil) => restApi.get(resource + 'permissionados/' + idPerfil),
  salvarPerfil: (payload) => restApi.post(resource + 'novo', payload),
  alterarPerfil: (idPerfil, payload) => restApi.put(resource + 'novo/' + idPerfil, payload)
}
