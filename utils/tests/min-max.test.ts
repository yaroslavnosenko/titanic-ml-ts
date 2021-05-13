import { minMax } from '../index'

const arrOne = [5]
const arrPlus = [0, 5, 10]
const arrMinus = [-5, 0, 5]

describe('MinMax tests', () => {
  it('works with plus array', done => {
    const [arr, min, max] = minMax(arrPlus)
    expect(arr.length).toBe(3)
    expect(arr[1]).toBe(0.5)
    expect(min).toBe(0)
    expect(max).toBe(10)
    done()
  })

  it('works with minus array', done => {
    const [arr, min, max] = minMax(arrMinus)
    expect(arr.length).toBe(3)
    expect(arr[1]).toBe(0.5)
    expect(min).toBe(-5)
    expect(max).toBe(5)
    done()
  })

  it('works with ones array', done => {
    const [arr, min, max] = minMax(arrOne)
    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(0)
    expect(min).toBe(5)
    expect(max).toBe(5)
    done()
  })

  it('works with defined minMax', done => {
    const [arr, _min, _max] = minMax(arrPlus, 0, 20)
    expect(arr.length).toBe(3)
    expect(arr[1]).toBe(0.25)
    expect(arr[2]).toBe(0.5)
    done()
  })
})
