"use client"

import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

interface Module {
  id: string
  label: string
  route: string
}

interface ModuleSectionProps {
  title: string
  modules: Module[]
}

export default function ModuleSection({ title, modules }: ModuleSectionProps) {
  const router = useRouter()

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  return (
    <div className="px-4 mx-1.5 border-0 text-left rounded-2xl opacity-100 border-background space-y-0">
      <h3 className="text-xl font-semibold text-[#1A2A5A] mb-4">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-0 px-0 py-3">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => handleNavigation(module.route)}
            className="flex items-center justify-between p-4 border border-[#DCE2EB] rounded-xl hover:shadow-lg hover:bg-[#E4EAF3] transition-all duration-200 text-left group bg-[#F0F4F8] hover:scale-[1.01] cursor-pointer"
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
            }}
          >
            <span className="font-medium text-gray-700 group-hover:text-[#1A2A5A] italic">
              {module.label}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#4A6FA5]" />
          </button>
        ))}
      </div>
    </div>
  )
}
