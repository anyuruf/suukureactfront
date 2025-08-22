import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './invoice.reducer';

export const InvoiceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const invoiceEntity = useAppSelector(state => state.suuku_webfront.invoice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="invoiceDetailsHeading">
          <Translate contentKey="suukuWebfrontApp.invoice.detail.title">Invoice</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="suukuWebfrontApp.invoice.code">Code</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.code}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="suukuWebfrontApp.invoice.date">Date</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.date ? <TextFormat value={invoiceEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="details">
              <Translate contentKey="suukuWebfrontApp.invoice.details">Details</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.details}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="suukuWebfrontApp.invoice.status">Status</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.status}</dd>
          <dt>
            <span id="paymentMethod">
              <Translate contentKey="suukuWebfrontApp.invoice.paymentMethod">Payment Method</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.paymentMethod}</dd>
          <dt>
            <span id="paymentDate">
              <Translate contentKey="suukuWebfrontApp.invoice.paymentDate">Payment Date</Translate>
            </span>
          </dt>
          <dd>
            {invoiceEntity.paymentDate ? <TextFormat value={invoiceEntity.paymentDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="paymentAmount">
              <Translate contentKey="suukuWebfrontApp.invoice.paymentAmount">Payment Amount</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.paymentAmount}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvoiceDetail;
