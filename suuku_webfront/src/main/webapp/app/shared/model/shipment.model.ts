import dayjs from 'dayjs';
import { IInvoice } from './invoice.model';

export interface IShipment {
  id?: number;
  trackingCode?: string | null;
  date?: dayjs.Dayjs;
  details?: string | null;
  invoice?: IInvoice;
}

export const defaultValue: Readonly<IShipment> = {};
