"use client";

import { useRouter } from "next/navigation";

interface Props {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function CustomerSidebar({
  activeSection = "service",
  onSectionChange = () => {},
}: Props) {
  const router = useRouter();

  const itemClass = (id: string) =>
    `px-6 py-4 text-lg cursor-pointer border-l-4 transition ${
      activeSection === id
        ? "bg-[#243B6B] border-white text-white font-semibold"
        : "border-transparent text-white hover:bg-[#1E335E]"
    }`;

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-[#0A1E5A] text-white pt-16 border-r border-[#1E335E]">
      {/* ✅ REAL BACK BUTTON */}
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 px-6 py-4 text-lg font-semibold cursor-pointer
                   hover:bg-[#1E335E] border-b border-[#1E335E]"
      >
        ← Back
      </div>

      {/* Menu */}
      <nav className="mt-2">
        <div
          className={itemClass("service")}
          onClick={() => onSectionChange("service")}
        >
          Service
        </div>

        <div
          className={itemClass("technician")}
          onClick={() => onSectionChange("technician")}
        >
          Service Technician Tools
        </div>

        <div
          className={itemClass("marketing")}
          onClick={() => onSectionChange("marketing")}
        >
          Marketing
        </div>

        <div
          className={itemClass("profile")}
          onClick={() => onSectionChange("profile")}
        >
          My Profile
        </div>
      </nav>
    </aside>
  );
}
