import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { connect } from '@/app/connection';
import Routes from '@/routes';
import * as exception from '@/utils/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/public', express.static('public'));

app.use(Routes);

//mysql connect
connect();
//error Handler
app.use(exception.NotFoundError);
app.use(exception.NpmError);
app.use(exception.catchGlobalError);
app.use(exception.catchCustomError);

app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});
