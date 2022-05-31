import { ItemList } from './itemList.interface';

export interface ItemDetail extends ItemList {
  sold_quantity: number;
  description: string;
}
