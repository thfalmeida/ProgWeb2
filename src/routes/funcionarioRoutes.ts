import { Router } from 'express';
import { getAllFuncionarios, createFuncionario, deleteFuncionario, getFuncionarioById, updateFuncionario} from '../controllers/funcionarioController';

const router = Router();

router.get('/', getAllFuncionarios);
router.get('/:id', getFuncionarioById);
router.post('/', createFuncionario);
router.put('/:id', updateFuncionario);
router.delete('/:id', deleteFuncionario);

export default router;