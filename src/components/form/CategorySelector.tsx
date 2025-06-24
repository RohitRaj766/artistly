type Props = {
  options: string[]
  selected: string[]
  onChange: (val: string[]) => void
}

export default function CategorySelector({ options, selected, onChange }: Props) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggleOption(opt)}
            className="accent-indigo-600"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}
