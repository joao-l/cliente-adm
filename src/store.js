import { save, load } from 'redux-localstorage-simple'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { authReducer } from './reducers/AuthReducer'
import { usuarioReducer } from './views/Usuario/UsuarioReducer'
import { temaReducer } from './views/Tema/TemaReducer'


const store = configureStore({
  reducer: {
    authReducer,
    usuarioReducer,
    temaReducer,
  },
  middleware: [...getDefaultMiddleware(), save()],
  preloadedState: load(),
})

export default store

