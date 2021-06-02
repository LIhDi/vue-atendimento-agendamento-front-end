const routes = [
  {
    path: '/acesso',
    component: () => import('pages/Agendamento.vue')
  },
  {
    path: '/dashboard',
    component: () => import('pages/Dashboard.vue')
  }
]

const showhome =
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index/:token', component: () => import('pages/Index.vue'), props: true },
      { path: 'home', component: () => import('pages/Home.vue') },
      { path: 'agenda', component: () => import('pages/Agenda.vue') },
      { path: 'recepcao', component: () => import('pages/Recepcao.vue') },
      { path: 'guiche', component: () => import('pages/Guiche.vue') },
      { path: 'gestao', component: () => import('pages/Gestao.vue') },
      {
        path: 'logoff',
        beforeEnter (to, from, next) {
          // Put the full page url including the protocol http(s) below
          window.location = process.env.URL_HOME + '/#/app/logoff/'
        }
      },
      {
        path: 'retorna',
        beforeEnter (to, from, next) {
          // Put the full page url including the protocol http(s) below
          window.location = process.env.URL_HOME + '/#/app/dashboard/' + localStorage.getItem('token')
        }
      },
      { path: '*', redirect: 'home' }
    ]
  }
routes.push(showhome)

export default routes
