import { createSlice } from 'redux-starter-kit'
import axios from 'axios'

const authSlice = createSlice({
  slice: 'auth',
  initialState: {
    loggedIn: false,
    token: null,
    errorMessage: '',
    usuario: {},
    grupo: {}
  },
  reducers: {
    logout: (state, action) => {
      state.loggedIn = false
      state.token = ''
      state.errorMessage = ''
      setToken('')
      return state
    },
    authFetch: (state, action) => {
      state.loggedIn = false
      state.token = ''
      state.errorMessage = ''
      state.usuario = {}
      setToken('')
      return state
    },
    authSuccess: (state, action) => {
      if(action.payload.token) {
        state.token = action.payload.token
        state.usuario = action.payload.usuario
        state.cliente = action.payload.cliente
        state.grupo = action.payload.grupo
        state.grupos = action.payload.grupos
        state.loggedIn = true
        setToken(action.payload.token)
      }
      return state
    },
    authError: (state, action) => {
      setToken('')
      state.token = ''
      state.loggedIn = false
      state.errorMessage = 'Usuário ou senha incorreto, tente novamente.'
      state.usuario = { }
      return state
    }
  },
})

const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : token
  return
}

const { actions, reducer: authReducer } = authSlice

const authActions = {
  ...actions,
  login: ({ email, senha }) => {
    return async dispatch => {
      try {
        dispatch(authActions.authFetch())
        const result = await axios.post('/usuario/acesso', { email, senha })
        dispatch(
          authActions.authSuccess({
            token: result.data.result.token,
            usuario: result.data.result.usuario,
            cliente: result.data.result.cliente,
            grupo: result.data.result.usuario.grupos.shift(),
            grupos: result.data.result.usuario.grupos
          })
        )
      } catch (e) {
        dispatch(authActions.authError())
      }
    }
  }
}

export {
  authActions,
  authReducer
}
