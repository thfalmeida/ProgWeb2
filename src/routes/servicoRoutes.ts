import { Router } from 'express';
import { getAllServicos, createServico, deleteServico, getServicoById, updateServico} from '../controllers/servicoController';

const router = Router();

router.get('/', getAllServicos);
router.get('/:id', getServicoById);
router.post('/', createServico);
router.put('/:id', updateServico);
router.delete('/:id', deleteServico);

export default router;