"use client"

import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"

import { updateProfile } from "@/server/profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function ProfileForm({ profile }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null)
  const [marketingOptIn, setMarketingOptIn] = useState(
    profile?.marketingOptIn ?? false
  )

  useEffect(() => {
    if (state?.success) {
      toast.success("Profile updated successfully.")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your personal details and preferences.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <input
          type="hidden"
          name="marketingOptIn"
          value={marketingOptIn ? "true" : "false"}
        />

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profile?.email ?? ""}
              disabled
              className="bg-muted"
            />
            <p className="text-muted-foreground text-xs">
              Email is managed by your account settings.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue={profile?.fullName ?? ""}
              placeholder="Your full name"
              required
            />
            {state?.fieldErrors?.fullName && (
              <p className="text-destructive text-sm">
                {state.fieldErrors.fullName[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile?.phone ?? ""}
              placeholder="e.g. +27 12 345 6789"
            />
            {state?.fieldErrors?.phone && (
              <p className="text-destructive text-sm">
                {state.fieldErrors.phone[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              name="avatarUrl"
              type="url"
              defaultValue={profile?.avatarUrl ?? ""}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Switch
              id="marketingOptIn"
              checked={marketingOptIn}
              onCheckedChange={setMarketingOptIn}
            />
            <Label htmlFor="marketingOptIn">
              Receive marketing and promotional emails
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export { ProfileForm }
