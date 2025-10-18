"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type MegaDialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "wide" | "ultra" | "fullscreen"

const sizeMap: Record<MegaDialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  wide: "max-w-[1200px]",
  // Use important versions to override base DialogContent's w-full and sm:max-w-lg
  ultra: "!max-w-[95vw] sm:!max-w-[95vw] !w-auto",
  fullscreen: "!w-[98vw] h-[95vh] !max-w-none sm:!max-w-[98vw]",
}

interface MegaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  size?: MegaDialogSize
  title?: React.ReactNode
  description?: React.ReactNode
  headerExtra?: React.ReactNode
  children: React.ReactNode
}

export function MegaDialog({ open, onOpenChange, size = "wide", title, description, headerExtra, children }: MegaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          "z-[70]",
          "p-0 overflow-hidden",
          "border border-border/60",
          "bg-background/95 supports-[backdrop-filter]:bg-background/80",
          "shadow-2xl",
          "rounded-xl",
          // Smoothly animate width changes when parent toggles sizes
          "transition-[width,max-width] duration-300",
          sizeMap[size],
          // Animations: subtle scale + translate
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[state=open]:slide-in-from-top-4 data-[state=closed]:slide-out-to-top-2",
        ].join(" ")}
      >
        {(title || description || headerExtra) && (
          <DialogHeader className="px-6 pt-5 pb-3 border-b bg-background/60">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {title && <DialogTitle className="text-2xl leading-tight truncate">{title}</DialogTitle>}
                {description && (
                  <DialogDescription className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </DialogDescription>
                )}
              </div>
              {headerExtra && <div className="shrink-0">{headerExtra}</div>}
            </div>
          </DialogHeader>
        )}
        <div className="p-6 max-h-[80vh] overflow-y-auto overflow-x-hidden">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
