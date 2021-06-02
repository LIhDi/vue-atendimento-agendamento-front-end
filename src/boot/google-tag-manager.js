import gtm from 'components/google/gtm'

export default ({ router }) => {
  router.afterEach((to, from) => {
    gtm.logPage('/atendimento-agendamento/#' + to.path)
  })
}
