import { Pipeline } from './pipeline'
import * as fs from 'fs'
const Mind = require('node-mind')

export const predict = (input: any) => {
  try {
    const pipeConf = fs.readFileSync('./model/temp/pipe.json', { encoding: 'utf8', flag: 'r' })
    const modelConf = fs.readFileSync('./model/temp/model.json', { encoding: 'utf8', flag: 'r' })

    const pipeline = new Pipeline(JSON.parse(pipeConf))
      .setData([input])
      .selectAttrs(true)
      .transformStrings(['Sex', 'Embarked'])
      .transformMinMax(['Pclass', 'SibSp', 'Parch', 'Fare', 'Sex', 'Embarked'])

    const mind = new Mind({ activator: 'sigmoid' }).upload(JSON.parse(modelConf))
    const inputVector = pipeline.getVectors()[0].input
    return Math.round(mind.predict(inputVector))
  } catch (e) {
    return undefined
  }
}
