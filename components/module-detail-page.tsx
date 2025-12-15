"use client"

import type { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Breadcrumb from "./portal-breadcrumb"
import { useRouter } from "next/navigation"

interface ModuleDetailPageProps {
  title: string
  description: string
  breadcrumbs: Array<{ label: string; href?: string }>
  backHref: string
  children?: ReactNode
}

export default function ModuleDetailPage({
  title,
  description,
  breadcrumbs,
  backHref,
  children,
}: ModuleDetailPageProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbs} />
        <Button
          onClick={() => router.push(backHref)}
          variant="outline"
          size="sm"
          className="gap-2 text-gray-700 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Title and Description */}
      <div>
        <h1 className="text-3xl font-bold text-[#1A2A5A] mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Content */}
      <div className="mt-8">{children}</div>
    </div>
  )
}
