import { createSlice } from 'redux-starter-kit';
import axios from 'axios';

const usuarioSlice = createSlice({
  slice: 'usuario',
  initialState: {
    configuracoes: {
      qtdDiasUltimaCompra: '90',
      mensagemBloqueio: ''
    },
    request: {
      loading: false
    },
    clientes: [],
    grupos: [],
    distribuidores: []
  },
  reducers: {
    loadingStart: (state, action) => {
      state.request.loading = true;
      return state;
    },
    loadingFinish: (state, action) => {
      state.request.loading = true;
      return state;
    },
    configuracoesSuccess: (state, action) => {
      if (action.payload.configuracoes) {
        state.configuracoes = action.payload.configuracoes;
        state.request.loading = false;
      }
      return state;
    },
    clientesSuccess: (state, action) => {
      if (action.payload.clientes) {
        state.clientes = action.payload.clientes;
        state.request.loading = false;
      }
      return state;
    },
    distribuidoresSuccess: (state, action) => {
      if (action.payload.distribuidores) {
        state.distribuidores = action.payload.distribuidores;
        state.request.loading = false;
      }
      return state;
    },
    gruposSuccess: (state, action) => {
      if (action.payload.grupos) {
        state.grupos = action.payload.grupos;
        state.request.loading = false;
      }
      return state;
    },
    fornecedoresSuccess: (state, action) => {
      if (action.payload.clientes) {
        state.fornecedores = action.payload.fornecedores;
        state.request.loading = false;
      }
      return state;
    },
    switchStatusCliente: (state, action) => {
      if (action.payload.cliente) {
        console.log(state);
        console.log(action.payload.cliente);
        let cliente = state.clientes.find(
          c => c.cgc === action.payload.cliente.cgc
        );
        cliente.bloqueado = !cliente.bloqueado;
      }
      return state;
    }
  }
});

const { actions, reducer: usuarioReducer } = usuarioSlice;

const usuarioActions = {
  ...actions,
  usuarioCadastro: (Usuario, grupoid) => {
    return async dispatch => {
      try {
        dispatch(usuarioActions.loadingStart());
        const result = await axios.post('/v2/usuario', Usuario, {
          params: {
            ...(grupoid ? { grupoid } : {})
          }
        });
        dispatch(
          usuarioActions.distribuidoresSuccess({
            usuario: result.data.result.result
          })
        );
      } catch (e) {
        dispatch(usuarioActions.loadingFinish());
      }
    };
  },
  getDistribuidores: ({ cgc }) => {
    return async dispatch => {
      try {
        dispatch(usuarioActions.loadingStart());
        const result = await axios.get('/distribuidor', {
          params: { ...(cgc ? { cgc } : {}) }
        });
        dispatch(
          usuarioActions.distribuidoresSuccess({
            distribuidores: result.data.result.result
          })
        );
      } catch (e) {
        dispatch(usuarioActions.loadingFinish());
      }
    };
  },
  getGrupos: () => {
    return async dispatch => {
      try {
        dispatch(usuarioActions.loadingStart());
        const result = await axios.get('/grupo/admin?limit=100');
        dispatch(
          usuarioActions.gruposSuccess({
            grupos: result.data.result.result
          })
        );
      } catch (e) {
        dispatch(usuarioActions.loadingFinish());
      }
    };
  },
  getClientes: ({ cgc, grupoId }) => {
    return async dispatch => {
      try {
        dispatch(usuarioActions.loadingStart());
        const result = await axios.get('/cliente', {
          params: {
            ...(cgc ? { cgc } : {}),
            ...(grupoId ? { grupoId } : {})
          }
        });
        dispatch(
          usuarioActions.clientesSuccess({
            clientes: result.data.result
          })
        );
      } catch (e) {
        dispatch(usuarioActions.loadingFinish());
      }
    };
  },
  asyncSwitchStatusCliente: ({ cli, cliente, grupoId, acao }) => {
    return async dispatch => {
      dispatch(usuarioActions.switchStatusCliente({ cliente }));
      // eslint-disable-next-line no-unused-vars
      let result = null;
      if (acao === 'BLOQUEAR') {
        result = await axios.post(
          'cliente/bloqueio',
          { ...cli },
          {
            params: { grupoId }
          }
        );
      } else {
        result = await axios.put(
          'cliente/bloqueio',
          { ...cli },
          {
            params: { grupoId }
          }
        );
      }
      dispatch(usuarioActions.getClientes({ grupoId: grupoId }));
    };
  },
  getConfiguracoes: ({ cgc }) => {
    return async dispatch => {
      try {
        dispatch(usuarioActions.loadingStart());
        const result = await axios.get('cliente/configuracoes', {
          params: {
            cgc
          }
        });
        dispatch(
          usuarioActions.configuracoesSuccess({
            configuracoes: result.data.result.configuracoes
          })
        );
      } catch (e) {
        dispatch(usuarioActions.loadingFinish());
      }
    };
  },
  setConfiguracoes: ({ configuracoes }) => {
    return async dispatch => {
      // const result = await axios.put('cliente/configuracoes', { ...configuracoes })
      dispatch(usuarioActions.configuracoesSuccess({ configuracoes }));
    };
  }
};

export { usuarioActions, usuarioReducer };
