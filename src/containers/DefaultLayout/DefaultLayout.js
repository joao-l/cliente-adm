/** @jsx jsx */
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as router from 'react-router-dom'
import { jsx, css } from '@emotion/core'
import { Container } from 'reactstrap'
import { ToastContainer } from 'react-toastify'
import * as _ from 'lodash'
import { authActions } from '../../reducers/AuthReducer'
import 'react-toastify/dist/ReactToastify.min.css'

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react'

import navigation from '../../_nav'
import routes from '../../routes'

const DefaultAside = React.lazy(() => import('./DefaultAside'))
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

const classToast = css`
  margin-top: 90px;
`

const DefaultLayout = props => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(authActions, dispatch)
  const token = useSelector(data => data.authReducer.token)
  const papel = useSelector(data => data.authReducer.usuario.papel)
  if (!token) return <Redirect to="/login"/>

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  const signOut = (e) => {
    e.preventDefault()
    actions.logout()
  }

  const hasAcess = i => !i.role || i.role.includes(papel)

  const nav = navigation
  if (navigation) {
    nav.itens = _.get(navigation, 'items', [])
      .filter(hasAcess)
      .map(n => {
        if (n.children) {
          n.children = n.children.filter(hasAcess)
        }
        return n
      })
  }


  return (
    <div className="app">
      <ToastContainer css={classToast}/>
      <AppHeader fixed>
        <Suspense  fallback={loading()}>
          <DefaultHeader onLogout={e => signOut(e)}/>
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={nav} {...props} router={router}/>
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router}/>
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null)
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  )
}

export default DefaultLayout
