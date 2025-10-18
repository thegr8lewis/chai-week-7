"use client"

import { Settings } from "lucide-react"
import type { SidebarItem } from "../types"

interface SidebarProps {
  items: SidebarItem[]
  activeSection: SidebarItem["id"]
  onSelect: (id: SidebarItem["id"]) => void
}

export function Sidebar({ items, activeSection, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border sticky top-0 hidden lg:block">
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Navigation</h2>
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
