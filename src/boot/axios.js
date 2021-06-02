import Vue from 'vue'
import axios from 'axios'

const finishFunction = response => {
  return response
}

const errorFunction = error => {
  if (error.response.status === 401) {
    Vue.prototype.$alerta('Sessão expirada. Faça login novamente.')
  }
  return Promise.reject(error)
}

const restApi = axios.create({ baseURL: 'http://localhost:3000' })

restApi.interceptors.response.use(finishFunction, errorFunction)
restApi.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$axios = restApi

export { restApi }
