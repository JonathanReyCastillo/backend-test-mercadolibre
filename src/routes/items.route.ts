import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import ItemsController from '../controllers/items.controller';

class ItemsRoute implements Routes {
  public path = '/items';
  public router = Router();
  public itemsController = new ItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.itemsController.getAllItemByQuery);
    this.router.get(`${this.path}/:id`, this.itemsController.getItemById);
  }
}

export default ItemsRoute;
