import parse = require('csv-parse/lib/sync')
import * as fs from 'fs'
import { sampleCorrelation } from 'simple-statistics'
import { getUnique, getMode, minMax, strToIndex, split } from '../utils'
const Mind = require('node-mind')

const csvData = fs.readFileSync('./data.csv', { encoding: 'utf8', flag: 'r' })
let data: any[] = parse(csvData, { columns: true, trim: true })

console.log('TITANIC')
console.table({ size: data.length })

// Missing values

const missing = Object.keys(data[0]).map(colName => [
  colName,
  data.filter(row => row[colName] === '').length,
])

console.log('\nMissing Values:')
console.table(missing)

const ageCorrelation = sampleCorrelation(
  data.map(row => (row['Age'] === '' ? 0 : parseFloat(row['Age']))),
  data.map(row => parseInt(row['Survived']))
)
console.table({ 'Age Correlation': ageCorrelation })

console.log('\nEmbarked Unique Values:')
console.table(getUnique(data, 'Embarked'))

const embarkedMode = getMode(data.map(row => row['Embarked']))
data = data.map(row => {
  const newRow = { ...row }
  delete newRow['PassengerId']
  delete newRow['Age']
  delete newRow['Cabin']
  delete newRow['Name']
  delete newRow['Ticket']
  newRow['Embarked'] = newRow['Embarked'] === '' ? embarkedMode : newRow['Embarked']
  newRow['Survived'] = parseFloat(newRow['Survived'])
  newRow['Pclass'] = parseFloat(newRow['Pclass'])
  newRow['SibSp'] = parseFloat(newRow['SibSp'])
  newRow['Parch'] = parseFloat(newRow['Parch'])
  newRow['Fare'] = parseFloat(newRow['Fare'])
  return newRow
})

// Transformation

// Label encoding

const strCols = ['Sex', 'Embarked']
const strConf = []
strCols.forEach(colName => {
  const vals = data.map(row => row[colName])
  const [mapped, config] = strToIndex(vals)
  data = data.map((row, index) => ({ ...row, [colName]: mapped[index] }))
  strConf.push({ col: colName, config: config })
})

console.log('\nStrToIndex Config:')
console.table(strConf)

// Numbers normalization

const numCols = ['Pclass', 'SibSp', 'Parch', 'Fare', 'Sex', 'Embarked']
const scalerConf = []
numCols.forEach(colName => {
  const vals = data.map(row => row[colName])
  const [scaled, min, max] = minMax(vals)
  data = data.map((row, index) => ({ ...row, [colName]: scaled[index] }))
  scalerConf.push({ col: colName, min: min, max: max })
})

console.log('\nMinMax Config:')
console.table(scalerConf)

console.log('\nFirst Row:')
console.table(data[0])

const preparedData = data.map(row => ({
  input: [row['Pclass'], row['Sex'], row['SibSp'], row['Parch'], row['Fare'], row['Embarked']],
  output: [row['Survived']],
}))
const [train, test] = split(preparedData, 0.6, true)

// Model

const mind = new Mind({ activator: 'sigmoid' }).learn(train)
const results = test.map(row => row.output[0] === Math.round(mind.predict(row.input)))
const accuracy = results.filter(row => row).length / results.length
console.log('\n Model:')
console.table({ accuracy })
