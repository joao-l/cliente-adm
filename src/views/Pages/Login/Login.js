import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import { Link, Redirect } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { AppNavbarBrand } from '@coreui/react'
import { authActions } from '../../../reducers/AuthReducer'

const Login = () => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(authActions, dispatch)
  const { token } = useSelector(data => data.authReducer)
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      login: '',
      senha: ''
    },
    onSubmit: ({ login, senha }) => actions.login({ email: login, senha })
  })
  const [login] = getFieldProps('login', 'text')
  const [senha] = getFieldProps('senha', 'text')

  if (token) return <Redirect to="/dashboard" />

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <AppNavbarBrand />
                    <p className="text-muted">Entre na sua conta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input {...login} type="text" placeholder="Email" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input {...senha} type="password" placeholder="Senha" autoComplete="current-password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Entrar</Button>
                      </Col>
                      {/* <Col xs="6" className="text-right"><Button color="link" className="px-0">Esqueceu a senha?</Button></Col> */}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const Cadastre = () => {
  return (
    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
      <CardBody className="text-center">
        <div>
          <h2>Cadastre -se</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.</p>
          <Link to="/register">
            <Button color="primary" className="mt-3" active tabIndex={-1}>Cadastre-se agora</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

export default Login;
