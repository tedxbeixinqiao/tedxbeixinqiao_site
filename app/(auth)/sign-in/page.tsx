'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, useSession } from '@/lib/auth-client';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  // Only redirect if session is loaded and user exists
  useEffect(() => {
    if (session.isPending) return;
    if (session.data?.user) {
      router.replace('/speaker-dashboard');
    }
  }, [session.data, session.isPending, router]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={password}
            />
          </div>

          <Button
            className="mt-2 w-full"
            disabled={loading}
            onClick={async () => {
              await signIn.email(
                {
                  email,
                  password,
                  callbackURL: '/speaker-dashboard',
                },
                {
                  onRequest: () => setLoading(true),
                  onResponse: () => setLoading(false),
                  onSuccess: () => {
                    router.push('/speaker-dashboard');
                  },
                }
              );
            }}
            type="submit"
          >
            {loading ? (
              <Loader2 className="mr-2 animate-spin" size={16} />
            ) : null}
            Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
