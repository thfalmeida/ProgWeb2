import { Router } from 'express';
import { getAllpets, createPet, deletePet, getPetById, updatePet} from '../controllers/petController';

const router = Router();

router.get('/', getAllpets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;