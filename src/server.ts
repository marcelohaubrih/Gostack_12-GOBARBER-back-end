import express from 'express';
import routes from './Routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.warn('✔ - Server started on port 3333');
});