import { Router } from 'express';
import { 
  getAllShelters,
  getShelter
} from '../controllers/shelter.controller';

const shelterRoute = () => {
  const router = Router();

  router.get('/shelters', getAllShelters);
  router.get('/shelter/:id', getShelter);

  return router;
};

export { shelterRoute };
