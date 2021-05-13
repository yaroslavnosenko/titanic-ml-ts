import { Router, Response, Request } from 'express'
import { learn, predict } from '../model'
import * as fs from 'fs'

const routes: Router = Router()

routes.get('/learn', (_, res: Response) => {
  const accuracy = learn()
  return res.json({ accuracy })
})

routes.post('/predict', (req: Request, res: Response) => {
  const data = req.body
  const survived = predict(data)
  if (survived === undefined) {
    return res.sendStatus(404)
  }
  return res.json({ survived: survived > 0 })
})

routes.get('/reset', (_, res: Response) => {
  try {
    fs.unlinkSync('./model/temp/pipe.json')
    fs.unlinkSync('./model/temp/model.json')
  } catch (e) {}
  return res.sendStatus(200)
})

export { routes }
