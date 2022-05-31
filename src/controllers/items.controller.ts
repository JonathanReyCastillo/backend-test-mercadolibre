import { Currency } from '../interfaces/currency.interface';
import { ItemList } from '../interfaces/itemList.interface';
import AuthorService from '../services/author.service';
import CurrencyService from '../services/currency.service';
import ItemService from '../services/item.service';
import { NextFunction, Request, Response } from 'express';
import { ItemListResponse } from './../interfaces/reponses/itemListResponse.interface';
import { ItemDetail } from './../interfaces/itemDetail.interface';
import CategoryService from '@/services/category.service';

class ItemsController {
  public itemService = new ItemService();
  public authorService = new AuthorService();
  public currencyService = new CurrencyService();
  public categoryService = new CategoryService();

  public getAllItemByQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query?.q ? req.query?.q : '';
      const dataAllItemByQuery = await this.itemService.getAllItemByQuery(`${search}`);
      let categoriesResultData = dataAllItemByQuery?.available_filters?.filter(filter => filter.id === 'category');
      let items: ItemList[] = [];
      let categories = [];
      if (categoriesResultData.length > 0) {
        categories = await this.getCategories(categoriesResultData, 'filters');
      } else {
        categoriesResultData = dataAllItemByQuery?.filters?.filter(filter => filter.id === 'category');
        categories = await this.getCategories(categoriesResultData, 'filter');
      }
      await this.getItems(dataAllItemByQuery?.results).then(data => {
        items = data;
      });
      const author = await this.authorService.getAuthor();
      const responseData: ItemListResponse = {
        author,
        categories,
        items,
      };
      res.status(200).json({ ...responseData });
    } catch (error) {
      next(error);
    }
  };

  public getItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currencies: Currency[] = [];
      const itemId = req.params.id;
      const itemDetailId = await this.itemService.getItemById(itemId);
      const currency = await this.getCurrency(currencies, itemDetailId);
      const itemDescriptionId = await this.itemService.getItemDetailById(itemId);
      let categories = await this.categoryService.getCategoryById(itemDetailId.category_id);
      categories = categories?.path_from_root?.map(category => {
        return category.name;
      });
      const responseData: ItemDetail = await this.getDetailItem(itemDetailId, itemDescriptionId, currency);
      res.status(200).json({ ...responseData, categories });
    } catch (error) {
      next(error);
    }
  };

  private getItems = async itemsData => {
    const currencies: Currency[] = [];
    const items: ItemList[] = [];
    for (let index = 0; index < itemsData.length; index++) {
      const resultData = itemsData[index];
      const currency = await this.getCurrency(currencies, resultData);
      const item: ItemList = {
        ...this.transformItemData(resultData, currency),
      };
      items.push(item);
    }
    return items;
  };

  private getCurrency = async (currencies, resultData) => {
    let currency: Currency = {
      id: '',
      symbol: '',
      description: '',
      decimal_places: 0,
    };
    const currenciesData = currencies.filter(item => item.id === resultData.currency_id);
    if (currenciesData.length < 1) {
      currency = await this.currencyService.getCurrencyById(resultData.currency_id);
      currencies.push(currency as unknown as Currency);
    } else {
      currency = currenciesData[0];
    }
    return currency;
  };

  private getDetailItem = (itemDetailData, itemDescriptionData, currency) => {
    const item: ItemDetail = {
      ...this.transformItemData(itemDetailData, currency),
      sold_quantity: itemDetailData.sold_quantity,
      description: itemDescriptionData.plain_text,
    };
    return item;
  };

  private transformItemData = (resultData, currency) => {
    return {
      id: resultData.id,
      title: resultData.title,
      price: {
        currency: currency.id,
        amount: resultData.price,
        decimals: currency.decimal_places,
      },
      picture: resultData.thumbnail,
      condition: resultData.condition,
      free_shipping: resultData.shipping.free_shipping,
    };
  };

  private getCategories = async (categoriesData: any, type: string) => {
    let categories = [];
    let categoryId = '';
    let categoryResults = 0;

    switch (type) {
      case 'filters':
        for (const category of categoriesData[0]?.values) {
          if (categoryResults < category.results) {
            categoryResults = category.results;
            categoryId = category.id;
          }
        }
        const categories2 = await this.categoryService.getCategoryById(categoryId);
        categories = categories2?.path_from_root?.map(category => {
          return category.name;
        });
        break;
      case 'filter':
        categories = categoriesData[0]?.values[0]?.path_from_root?.map(category => {
          return category.name;
        });
        break;
    }
    return categories;
  };
}

export default ItemsController;
