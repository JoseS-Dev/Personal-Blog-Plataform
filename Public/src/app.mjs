import express, {json} from 'express';
import cors from 'cors';
import 'dotenv/config';



const app = express();

app.use(json());
app.use(cors());

app.use('/Notes')


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
})