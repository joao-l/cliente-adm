/** @jsx jsx */
import { useEffect, useState } from 'react'
import { jsx } from '@emotion/core'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { CNPJ } from 'cpf_cnpj'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap'
import { useFormik } from 'formik'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { usuarioActions } from '../UsuarioReducer'
import { Show } from '../../../components'

const UsuarioCadastro = () => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(usuarioActions, dispatch)
  const grupos = useSelector(data => data.usuarioReducer.grupos)
  const [ distribuidores, setDistribuidores ] = useState([])

  useEffect(() => {
    actions.getGrupos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { handleSubmit, getFieldProps, resetForm } = useFormik({
    initialValues: {
      tipoUsuario: 'GRUPO',
      nome: '',
      cgc: '',
      grupoid: '',
      email: '',
      senha: '',
      csenha: ''
    },
    onSubmit: ({ tipoUsuario, nome, cgc, email, senha, csenha, grupoid }) => {
      actions.usuarioCadastro({
        tipoUsuario,
        nome,
        cgc,
        email,
        senha,
        csenha,
        distribuidores: distribuidores.map(d => {
          delete d.ativo
          return d
        })
      }, grupoid)
      toast.success('Usuário Cadastrado', {
        toastId: 'UsuarioCadastroSuccess',
      })
      resetForm()
    }
  })

  const [ tipoUsuario ] = getFieldProps('tipoUsuario', 'select')
  const [ grupoid ] = getFieldProps('grupoid', 'select')
  const [ nome ]  = getFieldProps('nome', 'text')
  const [ cgc ]  = getFieldProps('cgc', 'text')
  const [ email ]  = getFieldProps('email', 'text')
  const [ senha ]  = getFieldProps('senha', 'text')
  const [ csenha ]  = getFieldProps('csenha', 'text')

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader>
               <strong>Cadastrar Usuário</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Tipo de Usuário</Label>
                      <Input {...tipoUsuario} type="select" name="tipoUsuario" id="tipoUsuario">
                        <option value="ADMINISTRADOR">Administrador</option>
                        <option value="CLIENTE">Cliente</option>
                        <option value="GRUPO">Grupo</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Show condition={'CLIENTE' === tipoUsuario.value}>
                  <Row>
                    <Col xs="12" md="6">
                      <Label htmlFor="grupoid"> Grupo </Label>
                      <Input {...grupoid} type="select" name="grupoid" id="grupoid">
                        <option value="">Escolha um grupo</option>
                        {grupos.map(g => <option key={g._id} value={g._id}>{g.razaoSocial}</option>)}
                      </Input>
                    </Col>
                  </Row>
                </Show>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="nome">Nome</Label>
                      <Input {...nome} type="text" id="nome" placeholder="Nome do Usuário" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="cgc">CPF/CNPJ</Label>
                      <Input {...cgc} type="text" id="cgc" placeholder="CPF ou CNPJ" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input {...email} type="email" id="email" placeholder="Email do Usuário" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="senha">Senha</Label>
                      <Input {...senha} type="password" id="senha" placeholder="Senha do Usuário" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="csenha">Confirmar Senha</Label>
                      <Input {...csenha} type="password" id="csenha" placeholder="Confirmar a senha do Usuário" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Show condition={'GRUPO' === tipoUsuario.value}>
                  <ListaFornecedores distribuidoresAtivos={distribuidores} setDistribuidores={setDistribuidores} />
                </Show>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="lg" color="success"><i className="fa fa-check"></i> Cadastrar Usuário </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const ListaFornecedores = ({distribuidoresAtivos, setDistribuidores}) => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(usuarioActions, dispatch)
  const distribuidores = useSelector(data => data.usuarioReducer.distribuidores)
  const rows = distribuidores.map(d => {
    const ativo = !!distribuidoresAtivos.find(x => x.cgc === d.cgc)
    return { ativo, ...d }
  })

  useEffect(() => {
    actions.getDistribuidores({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleColumnAtivo = (distribuidor) => {
    if(distribuidor.ativo) {
      setDistribuidores(distribuidoresAtivos.filter(d => d.cgc === distribuidor.cgc))
    }
    setDistribuidores(distribuidoresAtivos.concat([ distribuidor ]))
  }

  const COLUNAS = [
    {
      name: 'ATIVO',
      selector: 'ativo',
      ignoreRowClick: true,
      sorteable: false,
      cell: data => <ColumnAtivo onClick={handleColumnAtivo} {...data} />
    },
    {
      name: 'Razão Social',
      selector: 'razaoSocial',
      sorteable: false
    },
    {
      name: 'CNPJ/CPF',
      selector: 'cgc',
      sorteable: false,
      cell: data => CNPJ.format(data.cgc)
    }
  ]

  return (
    <Row>
      <Col xs="12">
        <FormGroup>
          <DataTable
            ignoreRowClick
            striped
            title="Fornecedores"
            columns={COLUNAS}
            data={rows}/>
        </FormGroup>
      </Col>
    </Row>
  )
}

const ColumnAtivo = (props) => {
  const { onClick, ...distribuidor } = props
  const handleChange = (e) => {
    onClick(distribuidor)
  }
  return (
    <input
      id="ativo"
      onChange={(e) => handleChange(e)}
      checked={props.ativo}
      type="checkbox"
      name="ativo"
    />
  )
}

export default UsuarioCadastro
