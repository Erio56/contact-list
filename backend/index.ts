import { initDatabase } from './src/lib/sequalize'
import express, { json } from "express";
import userRouter from './src/views/UserEndpoints.ts'
import bodyParser from 'body-parser'
import contactsRouter from './src/views/ContactEndpoints.ts';
import cors from 'cors'

initDatabase();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(contactsRouter);

app.listen(4000, () => {
   console.log(`server running on 4000`);
});