"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/app/config/firebase";
import { useAuth } from "../config/authcontext";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const GoogleLogin = () => {
  const { user, loading } = useAuth(); // ✅ from context
  const [error, setError] = useState<string>("");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(""); // Firebase will automatically update context
    } catch (error: any) {
      setError("Error logging in with Google: " + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setError(""); // clear any potential error messages on sign out
    } catch (error: any) {
      setError("Error signing out: " + error.message);
    }
  };

  if (loading) return null; // or a spinner if you want

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Google Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {!user ? (
            <>
              <Button
                onClick={handleGoogleLogin}
                className="w-full"
                variant="outline"
              >
                Sign in with Google
              </Button>
              {error && (
                <Alert variant="destructive" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src={user.photoURL}
                alt="Avatar"
                className="rounded-full w-24 h-24"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  You are logged in as {user.displayName}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.uid}</p>
              </div>
              <Button
                onClick={handleSignOut}
                className="w-full"
                variant="destructive"
              >
                Sign out
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleLogin;
