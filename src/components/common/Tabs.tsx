export interface TabItem {
  id: string
  label: string
}

export interface TabsProps {
  items: TabItem[]
  activeTab: string
  onChange: (tabId: string) => void
}

export const Tabs = ({ items, activeTab, onChange }: TabsProps) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        onClick={() => onChange(item.id)}
        className={`rounded-md px-3 py-1 text-sm ${activeTab === item.id ? 'bg-primary text-text-inverse' : 'bg-panel text-text-secondary'}`}
      >
        {item.label}
      </button>
    ))}
  </div>
)
