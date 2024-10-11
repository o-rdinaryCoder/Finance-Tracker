import {
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="sign-in-container">
      <SignedOut>
        <SignInButton mode="modal"></SignInButton>
        <SignUpButton mode="modal"></SignUpButton>
      </SignedOut>

      <SignedIn>
        <Navigate to="/"/>
      </SignedIn>
    </div>
  );
};
