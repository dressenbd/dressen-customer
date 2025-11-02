"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="w-full min-h-screen p-3 sm:p-6 ">
      <Card className="w-full rounded-2xl bg-white">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Current password */}
            <div className="space-y-2 w-full">
              <Label htmlFor="current-password" className="text-sm text-foreground">
                Current Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10 w-full"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div className="space-y-2 w-full">
              <Label htmlFor="new-password" className="text-sm text-foreground">
                New Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10 w-full"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long.
              </p>
            </div>

            {/* Confirm password */}
            <div className="space-y-2 w-full">
              <Label htmlFor="confirm-password" className="text-sm text-foreground">
                Confirm New Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 w-full"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Tips panel → only show on mobile (<md) */}
            <div className="rounded-xl bg-blue-50 text-blue-800 p-4 w-full md:hidden">
              <p className="font-semibold text-sm mb-2">Password Security Tips:</p>
              <ul className="list-disc marker:text-blue-600 pl-5 space-y-1 text-sm">
                <li>Use at least 8 characters</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Add numbers and special characters</li>
                <li>Avoid using personal information</li>
              </ul>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className=" h-11 sm:h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-[#2e2e2e] font-medium"
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
