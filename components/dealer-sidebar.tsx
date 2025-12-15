"use client"
import { ChevronLeft } from "lucide-react"

interface SidebarProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  onSectionChange: (sectionId: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function DealerSidebar({ sections, activeSection, onSectionChange, isOpen, onClose }: SidebarProps) {
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 top-16 z-40 bg-black/20" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-[#1A2A5A] text-white shadow-lg overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-0">
          <button
            onClick={onClose}
            className="w-full text-left px-6 py-4 transition-all flex items-center gap-3 border-l-4 border-l-transparent hover:bg-[#0f1a32]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-lg">Back</span>
          </button>

          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left px-6 py-4 transition-all flex items-center gap-3 border-l-4 ${
                activeSection === section.id
                  ? "bg-[#243050] border-l-white font-bold"
                  : "border-l-transparent hover:bg-[#0f1a32]"
              }`}
            >
              <span className="text-lg">{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
