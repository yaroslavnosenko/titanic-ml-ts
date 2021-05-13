import * as express from 'express'
import { Response, Application } from 'express'
import { routes } from './routes'
import * as cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.get('/', (_, res: Response) => res.sendStatus(200))

export default app
