import express, { Request, Response } from 'express';
import petRoutes from './routes/petRoutes'
import clienteRoutes from './routes/clienteRoutes'
import funcionarioRoutes from './routes/funcionarioRoutes'
import servicoRoutes from './routes/servicoRoutes'


const app = express();
const port = 3000;

let currentId = 0;



app.use(express.json());

// Usar os roteadores
app.use('/pets', petRoutes);
app.use('/clientes', clienteRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/servicos', servicoRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

