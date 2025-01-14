"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "./store/AuthRepository.store";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC): React.FC => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { user, checkSessionExpiration } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      checkSessionExpiration();
      if (!user) {
        router.push("/");
      }
    }, [checkSessionExpiration, user, router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
