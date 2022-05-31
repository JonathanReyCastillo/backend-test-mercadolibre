import got from 'got';

class CategoryService {
  public async getCategoryById(id: String): Promise<any> {
    const response = await got(new URL('https://api.mercadolibre.com/categories/' + id), {
      json: true,
    });
    return response.body;
  }
}

export default CategoryService;
