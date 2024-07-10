'use client';

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthContextProp {
  children : React.ReactNode;
}

const AuthContext = ({children}:AuthContextProp) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthContext