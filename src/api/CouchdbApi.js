import { restApi } from 'boot/axios'

const resource = 'commons/couchdb/'

export default {
  getPerfis: () => restApi.get(resource + 'perfis')
}
