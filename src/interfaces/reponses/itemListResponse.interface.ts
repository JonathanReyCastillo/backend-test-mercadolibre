import { Author } from '../author.interface';
import { ItemList } from '../itemList.interface';

export interface ItemListResponse {
  author: Author;
  categories: String[];
  items: ItemList[];
}
