import { describe, expect, it } from '@jest/globals'
import { buildFilter, buildODataQuery } from '../../src/services/odata/queryBuilder'

describe('odata query builder', () => {
  it('builds filter and query values', () => {
    const filter = buildFilter({ status: 'Open', priority: 1 })
    const query = buildODataQuery({ filter, top: 10, skip: 5, orderBy: 'createdAt desc' })

    expect(filter).toContain("status eq 'Open'")
    expect(query).toContain('$top=10')
    expect(query).toContain('$skip=5')
    expect(query).toContain('$orderby=createdAt+desc')
  })
})
