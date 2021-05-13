# Titanic ML with typescript

## Getting started

To start data analyzing procedure enter following command:

```
npm run analyze
```

To start ML server enter following command:

```
npm run start:prod
```

## Available endpoints

### Check server status

Type: `GET`
```
/
```

### Train the model

Type: `GET`
```
/learn
```

### Reset the model

Type: `GET`
```
/reset
```

### Predict result

Type: `GET`

Body: `JSON`
```
/predict
```
Example body:
```
{
   "Pclass":3,
   "Sex":"male",
   "SibSp":1,
   "Parch":0,
   "Fare":7.25,
   "Embarked":"S"
}
```
