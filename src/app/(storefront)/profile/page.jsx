import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getProfile } from "@/server/profile"
import { ProfileForm } from "@/components/forms/profile-form"

export default async function ProfilePage() {
  const session = await auth.getSession()
  if (!session?.data?.user) redirect("/login")

  const profile = await getProfile()

  return (
    <main className="container max-w-2xl p-4 md:p-6">
      <ProfileForm profile={profile} />
    </main>
  )
}
