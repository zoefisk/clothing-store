"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mantine/core";

const SignInWithGoogleButton: React.FC = () => {
  const handleGoogleSignUp = () => {
    signIn("google", { redirect: true, callbackUrl: "/" });
  };

  return (
    <Button onClick={handleGoogleSignUp} color="blue" variant="outline">
      Sign Up with Google
    </Button>
  );
};

export default SignInWithGoogleButton;