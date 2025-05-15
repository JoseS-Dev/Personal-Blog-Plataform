import express, {json} from 'express';
import cors from 'cors';
import 'dotenv/config';
import { RouterNotes } from './MVC/Route/Notes.mjs';



const app = express();

app.use(json());
app.use(cors());
app.use(express.static('Public'));

app.use('/Notes', RouterNotes);


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
})