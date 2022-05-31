import { Author } from '../author.interface';
import { ItemDetail } from '../itemDetail.interface';

export interface ItemDetailResponse {
  author: Author;
  items: ItemDetail;
}
