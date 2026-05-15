export interface TableColumn<T> {
  key: keyof T
  header: string
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[]
  rows: T[]
}

export const Table = <T extends Record<string, unknown>>({ columns, rows }: TableProps<T>) => (
  <div className="overflow-x-auto rounded-lg border border-border bg-panel">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-surface">
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)} className="px-4 py-3 font-semibold text-text-secondary">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="border-t border-border">
            {columns.map((column) => (
              <td key={String(column.key)} className="px-4 py-3 text-text-primary">
                {String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
