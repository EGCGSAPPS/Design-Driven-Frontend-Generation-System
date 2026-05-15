export interface ODataQueryOptions {
  filter?: string
  orderBy?: string
  top?: number
  skip?: number
  expand?: string[]
  select?: string[]
}

const toODataValue = (value: string | number | boolean): string =>
  typeof value === 'string' ? `'${value}'` : String(value)

export const buildFilter = (filters: Record<string, string | number | boolean>): string =>
  Object.entries(filters)
    .map(([key, value]) => `${key} eq ${toODataValue(value)}`)
    .join(' and ')

export const buildODataQuery = (options: ODataQueryOptions): string => {
  const params = new URLSearchParams()

  if (options.filter) params.set('$filter', options.filter)
  if (options.orderBy) params.set('$orderby', options.orderBy)
  if (typeof options.top === 'number') params.set('$top', String(options.top))
  if (typeof options.skip === 'number') params.set('$skip', String(options.skip))
  if (options.expand?.length) params.set('$expand', options.expand.join(','))
  if (options.select?.length) params.set('$select', options.select.join(','))

  const query = params
    .toString()
    .replace(/%24/g, '$')
    .replace(/%27/g, "'")

  return query ? `?${query}` : ''
}
