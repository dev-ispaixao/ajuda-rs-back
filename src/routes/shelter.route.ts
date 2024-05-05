import { Router } from 'express';
import { getAllShelters } from '../controllers/shelter.controller';

const shelterRoute = () => {
  const router = Router();

  router.get('/shelter', getAllShelters);

  return router;
};

export { shelterRoute };
