'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-slate-900" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-400 text-sm">Ready to register to an amazing world?</p>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-semibold text-sm">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="ml-2 text-xs text-yellow-400 font-medium">Basic Information</span>
                </div>

                <div className="w-12 h-0.5 bg-slate-700"></div>

                <div className="flex items-center opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-semibold text-sm">
                    2
                  </div>
                </div>

                <div className="w-12 h-0.5 bg-slate-700"></div>

                <div className="flex items-center opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-semibold text-sm">
                    3
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-400">
                  <input type="checkbox" className="mr-2 rounded border-slate-600 bg-slate-900" />
                  Let me retake
                </label>
                <span className="text-slate-500">00:39</span>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold hover:from-yellow-500 hover:to-yellow-600 shadow-lg shadow-yellow-500/20"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{' '}
                <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <Link href="/register" className="text-slate-400 hover:text-slate-300 underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
