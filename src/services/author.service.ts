import { Author } from '../interfaces/author.interface';
import authorModel from '../models/authors.model';

class AuthorService {
  public authors = authorModel;

  public async getAuthor(): Promise<Author> {
    const findAuthor: Author = this.authors.length > 0 ? this.authors[0] : null;
    return findAuthor;
  }
}

export default AuthorService;
