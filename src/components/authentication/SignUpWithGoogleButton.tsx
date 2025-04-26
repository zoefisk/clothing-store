"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mantine/core";

const SignUpWithGoogleButton: React.FC = () => {
  const handleGoogleSignUp = () => {
    // Initiates the Google OAuth flow and redirects the user to Google's sign-in page
    console.log("Google sign-in initiated");
    signIn("google", { redirect: true, callbackUrl: "/" });
  };

  return (
    <Button onClick={handleGoogleSignUp} color="blue" variant="outline">
      Sign Up with Google
    </Button>
  );
};

export default SignUpWithGoogleButton;