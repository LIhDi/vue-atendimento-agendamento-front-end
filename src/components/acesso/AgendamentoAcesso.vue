<template>
    <q-card class="bg-white">
      <Informacoes />
      <q-card-section>
        <div class="row">
          <div class="col-12 q-gutter-md">
            <div>
              <SelectTipoAcesso
                v-model="filtro.tipo"
                @input="filtro.tipo === 'CPF DO INTERESSADO' ? filtro.cnpj = null : filtro.cpf = null"
              />
            </div>
            <div>
              <InputNome v-model="filtro.nome" />
            </div>
            <div>
              <InputCpf
                v-if="filtro.tipo === 'CPF DO INTERESSADO'"
                v-model="filtro.cpf"
                :semRegistro="filtro.semRegistro"
              />
            </div>
            <div>
              <InputCnpj
                v-if="filtro.tipo === 'CNPJ DO INTERESSADO'"
                v-model="filtro.cnpj"
                :semRegistro="filtro.semRegistro"
              />
            </div>
            <div>
              <InputEmail
                v-if="filtro.tipo"
                v-model="filtro.email"
                :semRegistro="filtro.semRegistro"
                @appointmentAccess="appointmentAccess()"
              />
            </div>
            <div v-if="filtro.semRegistro" class="text-red">
              Para prosseguir preencha os campos abaixo.
            </div>
            <div v-if="filtro.semRegistro">
              <InputTelefone
                v-model="filtro.celular"
                @enter="appointmentAccess()"
                ref="inputTelefone"
              />
            </div>
            <div class="row">
              <BtnAcessar
                v-if="filtro.tipo"
                @click="appointmentAccess()"
                ref="btnAcessar"
              />
            </div>
          </div>
          <div class="col-6"></div>
        </div>
      </q-card-section>
    </q-card>
</template>
<script>
import Informacoes from './Informacoes'
import SelectTipoAcesso from './SelectTipoAcesso'
import InputCpf from './InputCpf'
import InputCnpj from './InputCnpj'
import InputTelefone from './InputTelefone'
import InputNome from './InputNome'
import InputEmail from './InputEmail'
import BtnAcessar from './BtnAcessar'
export default {
  name: 'AgendamentoAcesso',
  components: {
    Informacoes,
    SelectTipoAcesso,
    InputCpf,
    InputCnpj,
    InputTelefone,
    InputNome,
    InputEmail,
    BtnAcessar
  },
  data () {
    return {
      filtro: {
        semRegistro: false
      }
    }
  },
  methods: {
    appointmentAccess () {
      if (this.filtro.email) {
        const payload = {
          cpfOuCnpj: this.filtro.tipo === 'CPF DO INTERESSADO' ? this.filtro.cpf : this.filtro.cnpj,
          tipoPessoa: this.filtro.tipo === 'CPF DO INTERESSADO' ? 'PESSOAFISICA' : 'PESSOAJURIDICA',
          nome: this.filtro.nome.toUpperCase(),
          email: this.filtro.email,
          token: '123456789'
        }
        this.$refs.btnAcessar.loadingOn()
        this.$api.auth.appointmentAccess(payload)
          .then(response => {
            if (response.status < 400) {
              this.acessoEfetuado(response.data)
            }
          })
          .finally(() => {
            if (this.$refs.btnAcessar) this.$refs.btnAcessar.loadingOff()
          })
      } else {
        this.$alerta('E-mail inválido!')
      }
    },
    acessoEfetuado (data) {
      this.filtro.semRegistro = false
      localStorage.setItem('token', data.token)
      this.$store.commit('user/setUser', data)
      this.$router.push('/dashboard')
    }
  }
}
</script>
