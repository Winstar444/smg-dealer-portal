"use client"

interface SectionSelectorProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function DealerSectionSelector({ sections, activeSection, onSectionChange }: SectionSelectorProps) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-200 px-6 py-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`flex items-center gap-1 py-2 px-1 transition-all ${
            activeSection === section.id
              ? "text-[#1A2A5A] font-bold border-b-2 border-[#1A2A5A]"
              : "text-[#333333] hover:text-[#1a1a1a]"
          }`}
        >
          <span>{section.label}</span>
          <span className="text-xs">▼</span>
        </button>
      ))}
    </div>
  )
}
