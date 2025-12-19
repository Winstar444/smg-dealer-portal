"use client";

import { useRouter } from "next/navigation";

interface DealerSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function DealerSidebar({
  activeSection,
  onSectionChange,
}: DealerSidebarProps) {
  const router = useRouter();

  const itemClass = (id: string) =>
    `flex items-center px-6 h-14 text-lg cursor-pointer border-l-4 transition ${
      activeSection === id
        ? "bg-[#243B6B] border-white font-semibold text-white"
        : "border-transparent text-white hover:bg-[#1E335E]"
    }`;

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-[#0A1F44] text-white pt-16 border-r border-[#1E335E]">
      {/* Back */}
      <div
        onClick={() => router.push("/dealer/dashboard")}
        className="flex items-center gap-2 px-6 h-14 text-lg font-semibold cursor-pointer
                   hover:bg-[#1E335E] border-b border-[#1E335E]"
      >
        ← Back
      </div>

      {/* Menu */}
      <nav className="mt-1">
        <div className={itemClass("service")} onClick={() => onSectionChange("service")}>
          Service
        </div>
        <div className={itemClass("sales")} onClick={() => onSectionChange("sales")}>
          Sales
        </div>
        <div className={itemClass("purchase")} onClick={() => onSectionChange("purchase")}>
          Purchase
        </div>
        <div className={itemClass("spare-parts")} onClick={() => onSectionChange("spare-parts")}>
          Spare Parts
        </div>
        <div className={itemClass("feedback")} onClick={() => onSectionChange("feedback")}>
          Feedback
        </div>
        <div className={itemClass("events")} onClick={() => onSectionChange("events")}>
          Events & Training
        </div>
        <div className={itemClass("announcements")} onClick={() => onSectionChange("announcements")}>
          Announcements
        </div>
      </nav>
    </aside>
  );
}
