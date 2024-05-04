import { Router } from 'express'
import { 
  createRequest, 
  deleteRequest, 
  getAllRequests, 
  getRequest,
   updateRequest 
} from '../controllers/request.controller'

const requestRoute = () => {
  const router = Router()

  router.post('/request', createRequest)

  router.get('/requests', getAllRequests)

  router.get('/request/:id', getRequest)

  router.patch('/request/:id', updateRequest)

  router.delete('/request/:id', deleteRequest)

  return router;
}

export { requestRoute }
