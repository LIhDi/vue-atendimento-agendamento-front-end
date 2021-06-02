import Vue from 'vue'
import AuthApi from '../api/AuthApi'
import CouchdbApi from '../api/CouchdbApi'
import DomainApi from '../api/DomainApi'
import AssuntoAgendamentoApi from '../api/AssuntoAgendamentoApi'
import AgendaApi from '../api/AgendaApi'
import GuicheApi from '../api/GuicheApi'
import PerfilApi from '../api/PerfilApi'
import RecepcaoApi from '../api/RecepcaoApi'
import GestaoApi from '../api/GestaoApi'
import AgendamentoApi from 'src/api/AgendamentoApi'

const api = {
  auth: AuthApi,
  couchdb: CouchdbApi,
  domain: DomainApi,
  assuntoAgendamento: AssuntoAgendamentoApi,
  agenda: AgendaApi,
  agendamento: AgendamentoApi,
  guiche: GuicheApi,
  perfil: PerfilApi,
  recepcao: RecepcaoApi,
  gestao: GestaoApi
}

Vue.prototype.$api = api

export default api
