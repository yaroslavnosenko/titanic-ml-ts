import parse = require('csv-parse/lib/sync')
import * as fs from 'fs'
import { getMode, strToIndex, minMax } from '../utils'

export class Pipeline {
  private data: any[]
  private pipelineConfigs: any

  public constructor(configs?: any) {
    this.pipelineConfigs = configs ? configs : {}
  }

  public readCsvData(): Pipeline {
    const csvData = fs.readFileSync('./data.csv', { encoding: 'utf8', flag: 'r' })
    this.data = parse(csvData, { columns: true, trim: true })
    return this
  }

  public setData(data: any[]): Pipeline {
    this.data = data
    return this
  }

  public getData(): any[] {
    return this.data
  }

  public getConfigs() {
    return this.pipelineConfigs
  }

  // Select Attrs
  public selectAttrs(predict?: boolean): Pipeline {
    this.data = this.data.map(row => {
      const newRow = { ...row }
      delete newRow['PassengerId']
      delete newRow['Age']
      delete newRow['Cabin']
      delete newRow['Name']
      delete newRow['Ticket']
      newRow['Pclass'] = parseFloat(newRow['Pclass'])
      newRow['SibSp'] = parseFloat(newRow['SibSp'])
      newRow['Parch'] = parseFloat(newRow['Parch'])
      newRow['Fare'] = parseFloat(newRow['Fare'])
      if (!predict) {
        newRow['Survived'] = parseFloat(newRow['Survived'])
      }
      return newRow
    })
    return this
  }

  // Missing Values
  public processMissingValues(): Pipeline {
    const embarkedMode = getMode(this.data.map(row => row['Embarked']))
    this.data = this.data.map(row => {
      const newRow = { ...row }
      newRow['Embarked'] = newRow['Embarked'] === '' ? embarkedMode : newRow['Embarked']
      return newRow
    })
    return this
  }

  // StrToIndex
  public transformStrings(colNames: string[]): Pipeline {
    const strConf = this.pipelineConfigs['strToIndex'] ? this.pipelineConfigs['strToIndex'] : {}
    colNames.forEach(colName => {
      const vals = this.data.map(row => row[colName])
      const [mapped, config] = strConf[colName]
        ? strToIndex(vals, strConf[colName])
        : strToIndex(vals)
      this.data = this.data.map((row, index) => ({ ...row, [colName]: mapped[index] }))
      if (!strConf[colName]) {
        strConf[colName] = config
      }
    })
    this.pipelineConfigs['strToIndex'] = strConf
    return this
  }

  // MinMax
  public transformMinMax(colNames: string[]): Pipeline {
    const scalerConf = this.pipelineConfigs['minMax'] ? this.pipelineConfigs['minMax'] : {}
    colNames.forEach(colName => {
      const vals = this.data.map(row => row[colName])
      const [scaled, min, max] = scalerConf[colName]
        ? minMax(vals, scalerConf[colName].min, scalerConf[colName].max)
        : minMax(vals)
      this.data = this.data.map((row, index) => ({ ...row, [colName]: scaled[index] }))
      if (!scalerConf[colName]) {
        scalerConf[colName] = { min: min, max: max }
      }
    })
    this.pipelineConfigs['minMax'] = scalerConf
    return this
  }

  public getVectors(): any[] {
    return this.data.map(row => {
      const newRow: any = {}
      newRow.input = [
        row['Pclass'],
        row['Sex'],
        row['SibSp'],
        row['Parch'],
        row['Fare'],
        row['Embarked'],
      ]
      if (row['Survived'] != undefined) {
        newRow.output = [row['Survived']]
      }
      return newRow
    })
  }
}
