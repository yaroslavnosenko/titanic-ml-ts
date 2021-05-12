import * as express from 'express'
import { Response, Application } from 'express'
import { routes } from './routes'

const app: Application = express()

app.get('/', (_, res: Response) => res.sendStatus(200))
app.use(routes)

export { app }
