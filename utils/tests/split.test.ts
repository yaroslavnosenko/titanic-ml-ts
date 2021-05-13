import { split } from '../index'

const arr = ['A', 'A', 'B', 'C']

describe('Split tests', () => {
  it('works', done => {
    const [big, small] = split(arr, 0.75)
    expect(big.length).toBe(3)
    expect(small.length).toBe(1)
    done()
  })
})
