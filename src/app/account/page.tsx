'use client'

import { useAuth } from "../config/authcontext"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"

export default function AccountPage() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (user) {
      // Fetch user-related data if necessary
      setUserData(user)
    }
  }, [user])

  if (!user) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Account Details</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Check your profile and account details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar src={user.photoURL || '/default-avatar.png'} alt="User Avatar" className="w-16 h-16" />
            <div>
              <p className="font-semibold text-xl">{user.displayName || 'No name set'}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.phoneNumber || 'No phone number available'}</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="font-semibold text-lg">UID: <span className="font-normal">{user.uid}</span></p>
            <p className="font-semibold text-lg">Email Verified: <span className="font-normal">{user.emailVerified ? 'Yes' : 'No'}</span></p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button variant="destructive" onClick={() => alert("Sign out")} className="w-full">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
