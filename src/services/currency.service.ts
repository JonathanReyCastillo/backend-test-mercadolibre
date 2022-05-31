import got from 'got';

class CurrencyService {
  public async getCurrencyById(id: String): Promise<any> {
    const response = await got(new URL('https://api.mercadolibre.com/currencies/' + id), {
      json: true,
    });
    return response.body;
  }
}

export default CurrencyService;
