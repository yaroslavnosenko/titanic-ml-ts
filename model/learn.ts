import { Pipeline } from './pipeline'
import { split } from '../utils'
import * as fs from 'fs'
const Mind = require('node-mind')

export const learn = () => {
  const pipeline = new Pipeline()
    .readCsvData()
    .selectAttrs()
    .processMissingValues()
    .transformStrings(['Sex', 'Embarked'])
    .transformMinMax(['Pclass', 'SibSp', 'Parch', 'Fare', 'Sex', 'Embarked'])

  fs.writeFileSync('./model/temp/pipe.json', JSON.stringify(pipeline.getConfigs(), null, 2))

  const [train, test] = split(pipeline.getVectors(), 0.6, true)

  const mind = new Mind({ activator: 'sigmoid' }).learn(train)
  fs.writeFileSync('./model/temp/model.json', JSON.stringify(mind.download(), null, 2))

  const results = test.map(row => row.output[0] === Math.round(mind.predict(row.input)))
  const accuracy = results.filter(row => row).length / results.length
  return accuracy
}
