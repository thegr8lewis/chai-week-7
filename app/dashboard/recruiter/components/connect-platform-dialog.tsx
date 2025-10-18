"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link2, Plus } from "lucide-react"
import type { AvailablePlatform } from "../types"

interface ConnectPlatformDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  platforms: AvailablePlatform[]
}

export function ConnectPlatformDialog({ open, onOpenChange, platforms }: ConnectPlatformDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Plus className="w-6 h-6 text-primary" />
            Connect New Job Platform
          </DialogTitle>
          <DialogDescription>
            Expand your reach by connecting to additional job listing platforms
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {platforms.map((platform) => {
            const IconComponent = platform.icon
            return (
              <Card
                key={platform.id}
                className="border-2 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-14 h-14 ${platform.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{platform.name}</h4>
                      <p className="text-sm text-muted-foreground">Job Board</p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
