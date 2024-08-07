import { Router } from 'express';
import { getAllClientes, createCliente, deleteCliente, getClienteById, updateCliente} from '../controllers/clienteController';

const router = Router();

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;