// Update the import path below to the correct location of product.model.ts
import { IProduct } from 'app/shared/model/product.model';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { OrderItemStatus } from 'app/shared/model/enumerations/order-item-status.model';

export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  status?: keyof typeof OrderItemStatus;
  product?: IProduct;
  order?: IProductOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
