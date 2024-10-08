import express, { Request, Response } from 'express';
import petRoutes from './routes/petRoutes'
import clienteRoutes from './routes/clienteRoutes'
import funcionarioRoutes from './routes/funcionarioRoutes'
import servicoRealizadoRoutes from './routes/servicoRealizadoRoutes'
import servicoRoutes from './routes/servicoRoutes'
import authRotes from './routes/authRoutes'
import cors from 'cors';
import { setupSwagger } from './config/swagger';


const app = express();
app.use(cors());
const port = 3000;

// Configure o Swagger
setupSwagger(app);
app.use(express.json());


// Usar os roteadores
app.use('/auth', authRotes)
app.use('/servicoContratado', servicoRealizadoRoutes)
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

