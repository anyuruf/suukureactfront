import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedBlobField, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getProductCategories } from 'app/entities/product-category/product-category.reducer';
import { Size } from 'app/shared/model/enumerations/size.model';
import { createEntity, getEntity, reset, updateEntity } from './product.reducer';

export const ProductUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const productCategories = useAppSelector(state => state.suuku_webfront.productCategory.entities);
  const productEntity = useAppSelector(state => state.suuku_webfront.product.entity);
  const loading = useAppSelector(state => state.suuku_webfront.product.loading);
  const updating = useAppSelector(state => state.suuku_webfront.product.updating);
  const updateSuccess = useAppSelector(state => state.suuku_webfront.product.updateSuccess);
  const sizeValues = Object.keys(Size);

  const handleClose = () => {
    navigate(`/product${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProductCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  interface SaveEntityValues {
    id?: number | string;
    price?: number | string;
    name?: string;
    description?: string;
    itemSize?: string;
    image?: any;
    productCategory?: number | string;
    [key: string]: any;
  }

  interface ProductCategory {
    id: number;
    name: string;
    [key: string]: any;
  }

  const saveEntity = (values: SaveEntityValues) => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.price !== undefined && typeof values.price !== 'number') {
      values.price = Number(values.price);
    }

    const entity = {
      ...productEntity,
      ...values,
      productCategory: productCategories.find((it: ProductCategory) => it.id.toString() === values.productCategory?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          itemSize: 'S',
          ...productEntity,
          productCategory: productEntity?.productCategory?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="suukuWebfrontApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            <Translate contentKey="suukuWebfrontApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="product-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('suukuWebfrontApp.product.name')}
                id="product-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('suukuWebfrontApp.product.description')}
                id="product-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('suukuWebfrontApp.product.price')}
                id="product-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('suukuWebfrontApp.product.itemSize')}
                id="product-itemSize"
                name="itemSize"
                data-cy="itemSize"
                type="select"
              >
                {sizeValues.map(size => (
                  <option value={size} key={size}>
                    {translate(`suukuWebfrontApp.Size.${size}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('suukuWebfrontApp.product.image')}
                id="product-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                id="product-productCategory"
                name="productCategory"
                data-cy="productCategory"
                label={translate('suukuWebfrontApp.product.productCategory')}
                type="select"
              >
                <option value="" key="0" />
                {productCategories
                  ? productCategories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductUpdate;
