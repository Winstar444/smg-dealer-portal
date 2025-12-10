import { Card } from "@/components/ui/card"

interface PlaceholderSectionProps {
  title: string
  description?: string
}

export default function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <Card className="p-6 bg-gray-50 border-gray-200">
      <h3 className="font-semibold text-[#1A2A5A] mb-2">{title}</h3>
      {description && <p className="text-gray-600 text-sm">{description}</p>}
      <div className="mt-4 space-y-3">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </Card>
  )
}
