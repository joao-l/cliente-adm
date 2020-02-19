import { Provider } from 'react-redux'
import React, { Component } from 'react'
import store from './store'
import axios from 'axios'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import { renderRoutes } from 'react-router-config'
import './App.scss'
import "bootstrap-css-only/css/bootstrap.min.css"

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'))
const Cadastro = React.lazy(() => import('./views/Pages/Cadastro'))

class App extends Component {
  render() {
    axios.defaults.baseURL = process.env.REACT_APP_JORNADA_CLIENTE_API || 'http://104.154.117.141:10052'
    return (
      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/cadastro" name="Cadastro Page" render={props => <Cadastro {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
