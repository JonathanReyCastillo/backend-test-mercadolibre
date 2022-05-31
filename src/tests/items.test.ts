import ItemsRoute from '../routes/items.route';
import App from '../app';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing ITEMS', () => {
  describe('[GET] /api/items', () => {
    it('response statusCode 200 / getAllItemByQuery', () => {
      const itemsRoute = new ItemsRoute();
      const app = new App([itemsRoute]);
      return request(app.getServer()).get(`/api${itemsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /api/items/:id', () => {
    it('response statusCode 200 / getItemById', () => {
      const itemId = 'MLA911423911';
      const itemsRoute = new ItemsRoute();
      const app = new App([itemsRoute]);
      return request(app.getServer()).get(`/api${itemsRoute.path}/${itemId}`).expect(200);
    });
  });
});
