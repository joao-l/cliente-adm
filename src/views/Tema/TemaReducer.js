import { createSlice } from 'redux-starter-kit'
import axios from 'axios'

const temaSlice = createSlice({
  slice: 'tema',
  initialState: {
    request: {
      loading: false
    },
    cores: {}
  },
  reducers: {
    temaFetch: (state, action) => {
      state.request.loading = true
      return state
    },
    temaSuccess: (state, action) => {
      if(action.payload.cores) {
        state.cores = action.payload.cores
        state.request.loading = false
      }
      return state
    },
    temaError: (state, action) => {
      return state
    },
  },
})

const { actions, reducer: temaReducer } = temaSlice

const temaActions = {
  ...actions,
  getTema: ({ cgc }) => {
    return async dispatch => {
      try {
        dispatch(temaActions.temaFetch())
        const result = await axios.get(
          '/cores',
          {
            params: { grupocgc: cgc }
          }
        )
        dispatch(temaActions.temaSuccess({
          cores: result.data.result,
        }))
      } catch (e) {
        dispatch(temaActions.temaError())
      }
    }
  },
  cadastrarTema: ({ cgc, tema }) => {
    return async dispatch => {
      try {
        const result = await axios.post(
          '/cores',
          tema,
          {
            params: { grupocgc: cgc }
          }
        )
        dispatch(temaActions.temaSuccess({
          cores: result.data.result.cores,
        }))
      } catch (e) {
        dispatch(temaActions.temaError())
      }
    }
  },
  setTema: () => {
    console.log('setTema')
  }
}

export {
  temaActions,
  temaReducer
}
