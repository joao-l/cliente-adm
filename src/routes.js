import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const UsuarioCadastro = React.lazy(() => import('./views/Usuario/UsuarioCadastro'))
const ControleAcesso = React.lazy(() => import('./views/Usuario/ControleAcesso'))
const UsuarioConfiguracoes = React.lazy(() => import('./views/Usuario/Configuracoes'))
const Cores = React.lazy(() => import('./views/Tema/Cores'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Home },
  { path: '/home', name: 'Home', component: Home },
  // { path: '/usuario', exact: true, name: 'Usuário', component: UsuarioCadastro },
  { path: '/usuario/cadastrar', name: 'Cadastro de Usuário', component: UsuarioCadastro },
  { path: '/usuario/controle-acesso', name: 'Controle de Acesso', component: ControleAcesso },
  { path: '/usuario/configuracoes', name: 'Configurações', component: UsuarioConfiguracoes },
  { path: '/tema/cores', name: 'Cores do Tema', component: Cores }
]

export default routes
