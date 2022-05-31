import App from './app';
import IndexRoute from './routes/index.route';
import validateEnv from './utils/validateEnv';
import ItemsRoute from './routes/items.route';

validateEnv();

const app = new App([new IndexRoute(), new ItemsRoute()]);

app.listen();
