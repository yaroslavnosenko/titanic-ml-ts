import { Router, Response } from 'express'

const routes: Router = Router()

routes.get('/train', (_, res: Response) => res.sendStatus(200))
routes.get('/predict', (_, res: Response) => res.sendStatus(200))

export { routes }
