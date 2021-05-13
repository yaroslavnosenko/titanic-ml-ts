import { getUnique } from '../index'

const ds = [{ col: '1' }, { col: '2' }, { col: '2' }]

describe('GetUnique tests', () => {
  it('returns unique values', done => {
    const res = getUnique(ds, 'col')
    expect(res.length).toBe(2)
    done()
  })
})
