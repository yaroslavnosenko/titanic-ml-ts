// console.log(pipeline.getVectors()[0])

// pipeline = new Pipeline(pipeline.getConfigs())
//   .setData([
//     {
//       Pclass: 3,
//       Sex: 'male',
//       SibSp: 1,
//       Parch: 0,
//       Fare: 7.25,
//       Embarked: 'S',
//     },
//   ])
//   .selectAttrs(true)
//   .processMissingValues()
//   .transformStrings(['Sex', 'Embarked'])
//   .transformMinMax(['Pclass', 'SibSp', 'Parch', 'Fare', 'Sex', 'Embarked'])

// console.log(pipeline.getVectors()[0])
// // console.log(pipeline.getConfigs())

export * from './learn'
