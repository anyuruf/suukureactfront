import customer from 'app/entities/customer/customer.reducer';
import product from 'app/entities/product/product.reducer';
import productCategory from 'app/entities/product-category/product-category.reducer';
import productOrder from 'app/entities/product-order/product-order.reducer';
import orderItem from 'app/entities/order-item/order-item.reducer';
import invoice from 'app/entities/invoice/invoice.reducer';
import shipment from 'app/entities/shipment/shipment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  customer,
  product,
  productCategory,
  productOrder,
  orderItem,
  invoice,
  shipment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
