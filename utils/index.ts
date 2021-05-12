import { min, max, shuffle } from 'simple-statistics'

export const getUnique = (ds: any[], colName: string) =>
  Array.from(new Set(ds.map((row) => row[colName])))

export const getMode = (arr: any[]) => {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop()
}

export const minMax = (arr: number[], _min?: number, _max?: number) => {
  if (_min === undefined && _max === undefined) {
    _min = min(arr)
    _max = max(arr)
  }
  const scaled = arr.map((elem) => (elem - _min) / (_max - _min))
  return [scaled, _min, _max]
}

// {'str': index ...}
export const strToIndex = (arr: string[], config?: any) => {
  if (config === undefined) {
    const unique = Array.from(new Set(arr))
    config = {}
    unique.forEach((str, index) => (config[str] = index))
  }
  const mapped = arr.map((str) => config[str])
  return [mapped, config]
}

export const split = (arr: any[], size: number, random?: boolean) => {
  size = Math.round(size * arr.length)
  const shuffled = random ? shuffle(arr) : arr
  return [shuffled.slice(0, size), shuffled.slice(size)]
}
