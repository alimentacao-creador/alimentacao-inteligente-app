"use client"

import * as React from "react"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"

export { useToast, toast } from "@/hooks/use-toast"

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}