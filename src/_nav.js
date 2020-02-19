export default {
  items: [
    {
      name: 'Usuarios',
      url: '/usuario',
      icon: 'icon-user',
      children: [
        {
          name: 'Cadastrar',
          url: '/usuario/cadastrar',
          icon: 'icon-user',
          role: ['ADMINISTRADOR']
        },
        {
          name: 'Controle de Acesso',
          url: '/usuario/controle-acesso',
          icon: 'icon-user'
        },
        {
          name: 'Configurações',
          url: '/usuario/configuracoes',
          icon: 'icon-user'
        }
      ],
    }
    // {
    //   name: 'Tema',
    //   url: '/tema',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Cores',
    //       url: '/tema/cores',
    //       icon: 'icon-puzzle'
    //     },
    //   ],
    // }
  ],
};
