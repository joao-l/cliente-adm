/** @jsx jsx */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import { temaActions } from '../TemaReducer'

const Loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

const Cores = () => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(temaActions, dispatch)
  const { cgc } = useSelector(data => data.authReducer.grupo)
  const { loading } = useSelector(data => data.temaReducer.request)

  useEffect(() => {
    actions.getTema({ cgc })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loading />

  return(
    <Formulario />
  )
}

const Formulario = props => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(temaActions, dispatch)

  const { cgc } = useSelector(data => data.authReducer.grupo)
  const cores = useSelector(data => data.temaReducer.cores)

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      primary: cores.primaria || '',
      secondary: cores.secundaria || '',
      tertiary: cores.terciaria || '',
      text: cores.texto || '',
      textSecondary: cores.textosecundaria || '',
    },
    onSubmit: ({ primary, secondary, tertiary, text, textSecondary }) => {
      const tema = {
        primaria: primary,
        secundaria: secondary,
        terciaria: tertiary,
        texto: text,
        textosecundaria: textSecondary,
      }
      actions.cadastrarTema({ cgc, tema })
      toast.success('Tema do aplicativo atualizado', {
        toastId: 'TemaAtualizadoSuccess',
      })
    }
  })

  const [ primary ] = getFieldProps('primary', 'text')
  const [ secondary ] = getFieldProps('secondary', 'text')
  const [ tertiary ] = getFieldProps('tertiary', 'text')
  const [ text ] = getFieldProps('text', 'text')
  const [ textSecondary ] = getFieldProps('textSecondary', 'text')
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <strong>Configurações</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="primary">Cor Primária</Label>
                      <Input {...primary} type="text" name="primary">
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="secondary">Cor Secundária</Label>
                      <Input {...secondary} type="text" name="secondary">
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="tertiary">Cor Terciária</Label>
                      <Input {...tertiary} type="text" name="tertiary">
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="text">Cor do Texto sobre a cor primária</Label>
                      <Input {...text} type="text" name="text">
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="textSecondary">Cor do Texto sobre a cor secundária</Label>
                      <Input {...textSecondary} type="text" name="textSecondary">
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="lg"
                  color="success">
                  <i className="fas fa-check"></i> Atualizar Tema
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Cores
