import { getMode } from '../index'

const arr = ['A', 'A', 'B', 'C']

describe('GetMode tests', () => {
  it('works', done => {
    const aRes = getMode(arr)
    expect(aRes).toBe('A')
    done()
  })
})
