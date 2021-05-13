import { strToIndex } from '../index'

const arr = ['A', 'A', 'B', 'C']

describe('StrToIndex tests', () => {
  it('works with fitting', done => {
    const [newArr, config] = strToIndex(arr)
    expect(newArr.length).toBe(4)
    expect(newArr[1]).toBe(0)
    expect(newArr[2]).toBe(1)
    expect(newArr[3]).toBe(2)
    expect(config['A']).toBe(0)
    done()
  })

  it('works with config', done => {
    const [newArr, config] = strToIndex(arr, { A: 10, B: 20, C: 30 })
    expect(newArr.length).toBe(4)
    expect(newArr[1]).toBe(10)
    expect(newArr[2]).toBe(20)
    expect(newArr[3]).toBe(30)
    expect(config['A']).toBe(10)
    done()
  })
})
