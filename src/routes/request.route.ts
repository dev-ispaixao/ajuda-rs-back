import { Router } from 'express'
import { 
  createRequest,  
  getAllRequests, 
  getRequest,
  finishRequest
} from '../controllers/request.controller'

const requestRoute = () => {
  const router = Router()

  router.post('/request', createRequest)

  router.get('/requests', getAllRequests)

  router.get('/request/:id', getRequest)
  
  router.patch('/request/finish', finishRequest)

  return router;
}

export { requestRoute }
