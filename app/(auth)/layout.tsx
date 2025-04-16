"use client"

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignInPage = pathname.includes("sign-in");

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <Link href="/">
          <Button variant="ghost" className="mb-2 text-lg font-bold">
            TEDxBeixinqiao
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">
          Please sign in to continue to the platform
        </p>
      </div>
      {children}
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <div className="flex gap-1 justify-center">
          {isSignInPage ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline hover:text-primary">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/sign-in" className="underline hover:text-primary">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}