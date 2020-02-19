/** @jsx jsx */
import { useEffect } from 'react';
import { jsx } from '@emotion/core';
import { Card, CardBody, CardHeader, Button, Col, Row } from 'reactstrap';
import { CNPJ, CPF } from 'cpf_cnpj';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { usuarioActions } from '../UsuarioReducer';

const COLUNAS = [
  {
    name: 'CNPJ/CPF',
    selector: 'cgc',
    sorteable: false,
    cell: data =>
      data.tipoPessoa === 'F' ? CPF.format(data.cgc) : CNPJ.format(data.cgc)
  },
  {
    name: 'Razao Social',
    selector: 'razaoSocial',
    sorteable: false
  },
  {
    name: 'Email',
    selector: 'email',
    sorteable: false
  },
  {
    name: 'STATUS',
    selector: 'bloqueado',
    sorteable: false,
    cell: data => <ColumnStatus {...data} />
  },
  {
    name: 'Bloquear',
    ignoreRowClick: true,
    cell: data => <ColumnBloquear {...data} />
  }
];

const ControleAcesso = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(usuarioActions, dispatch);
  const clientes = useSelector(data => data.usuarioReducer.clientes);
  const grupo = useSelector(data => data.authReducer.grupo);

  useEffect(() => {
    async function fetchData() {
      return await actions.getClientes({ grupoId: grupo._id });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <strong>Controle de Acesso</strong>
            </CardHeader>
            <CardBody>
              <DataTable
                ignoreRowClick
                striped
                title="Clientes"
                columns={COLUNAS}
                data={clientes}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const ColumnStatus = cliente => {
  const cli = useSelector(data => data.authReducer.cliente);
  const grupo = useSelector(data => data.authReducer.grupo);
  return isBloqueado(cliente, grupo._id, cli) ? 'BLOQUEADO' : 'ATIVO';
};

const isBloqueado = (cliente, grupoId, cli) => {
  if (cli) return cli.bloqueios.find(a => a._id === cliente._id);
  return !!(cliente.bloqueios || []).find(b => b._id === cliente)
    ? true
    : false;
};

const ColumnBloquear = cliente => {
  const dispatch = useDispatch();
  const cli = useSelector(data => data.authReducer.cliente);
  const grupo = useSelector(data => data.authReducer.grupo);
  const actions = bindActionCreators(usuarioActions, dispatch);
  const handleClick = acao =>
    actions.asyncSwitchStatusCliente({
      cli: cli,
      cliente: cliente,
      grupoId: grupo._id,
      acao
    });

  return (
    <div>
      <Button
        onClick={() =>
          handleClick(
            isBloqueado(cliente, grupo._id, cli) ? 'LIBERAR' : 'BLOQUEAR'
          )
        }
        size="sm"
        color={isBloqueado(cliente, grupo._id, cli) ? 'success' : 'danger'}
      >
        {isBloqueado(cliente, grupo._id, cli) ? 'Liberar' : 'Bloquear'}
      </Button>
    </div>
  );
};

export default ControleAcesso;
