"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Registration Closed</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Public registration is currently not available
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="text-center p-4">
            <p className="mb-6 text-muted-foreground">
              Please contact us for registration options and information on how to participate in TEDxBeixinqiao.
            </p>
            <p className="text-sm text-muted-foreground">
              If you already have an account, you can sign in below.
            </p>
          </div>
          <Button 
            className="w-full"
            asChild
          >
            <Link href="/sign-in">
              Go to Sign In
            </Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t pt-4">
          <p className="text-center text-xs text-neutral-500">
            For registration inquiries, please contact the administrators
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}