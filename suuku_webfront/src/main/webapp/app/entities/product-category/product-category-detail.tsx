import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product-category.reducer';

export const ProductCategoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productCategoryEntity = useAppSelector(state => state.suuku_webfront.productCategory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productCategoryDetailsHeading">
          <Translate contentKey="suukuWebfrontApp.productCategory.detail.title">ProductCategory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productCategoryEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="suukuWebfrontApp.productCategory.name">Name</Translate>
            </span>
          </dt>
          <dd>{productCategoryEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="suukuWebfrontApp.productCategory.description">Description</Translate>
            </span>
          </dt>
          <dd>{productCategoryEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/product-category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-category/${productCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductCategoryDetail;
