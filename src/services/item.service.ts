import got from 'got';

class ItemService {
  public async getAllItemByQuery(query: string): Promise<any> {
    const searchParams = new URLSearchParams([
      ['q', query],
      ['limit', `${4}`],
    ]);
    const response = await got(new URL('https://api.mercadolibre.com/sites/MLA/search'), {
      query: searchParams,
      json: true,
    });
    return response.body;
  }

  public async getItemById(id: string): Promise<any> {
    const response = await got(new URL(`https://api.mercadolibre.com/items/${id}`), {
      json: true,
    });
    return response.body;
  }

  public async getItemDetailById(id: string): Promise<any> {
    const response = await got(new URL(`https://api.mercadolibre.com/items/${id}/description`), {
      json: true,
    });
    return response.body;
  }
}

export default ItemService;
