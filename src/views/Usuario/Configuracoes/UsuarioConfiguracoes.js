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
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import { usuarioActions } from '../UsuarioReducer'

const UsuarioConfiguracoes = () => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(usuarioActions, dispatch)

  const configuracoes = useSelector(data => data.usuarioReducer.configuracoes)
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      qtdDiasUltimaCompra: configuracoes.qtdDiasUltimaCompra,
      mensagemBloqueio: configuracoes.mensagemBloqueio
    },
    onSubmit: ({ qtdDiasUltimaCompra, mensagemBloqueio }) => {
      console.log({ qtdDiasUltimaCompra, mensagemBloqueio  })
      actions.setConfiguracoes({
        configuracoes: { qtdDiasUltimaCompra, mensagemBloqueio }
      })
      toast.success('Configurações de Usuário Atualizadas', {
        toastId: 'ConfiguracoesUsuarioAtualizadasSuccess',
      })
    }
  })
  const [ qtdDiasUltimaCompra ] = getFieldProps('qtdDiasUltimaCompra', 'text')
  const [ mensagemBloqueio ] = getFieldProps('mensagemBloqueio', 'text')
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
                      <Label htmlFor="qtdDiasUltimaCompra">Quantidade de dias para usuário ativos</Label>
                      <Input {...qtdDiasUltimaCompra} type="text" name="qtdDiasUltimaCompra">
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="mensagemBloqueio">Mensagem customizada para usuário bloqueados</Label>
                      <Input {...mensagemBloqueio} type="text" name="mensagemBloqueio" />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="lg"
                  color="success">
                  <i className="fa fa-check"></i> Atualizar Configurações
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default UsuarioConfiguracoes
