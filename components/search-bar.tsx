import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 max-w-md">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search modules..." className="pl-10 bg-white border-border" />
      </div>
    </div>
  )
}
