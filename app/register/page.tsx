'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { CircleCheck as CheckCircle, Loader as Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const handleBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setStep(3);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            step >= 1 ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'
          }`}>
            {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
          </div>
          {step === 1 && <span className="ml-2 text-xs text-blue-400 font-medium">Basic Information</span>}
        </div>

        <div className={`w-16 h-0.5 transition-all ${step >= 2 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-slate-700'}`}></div>

        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            step >= 2 ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'
          }`}>
            {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
          </div>
          {step === 2 && <span className="ml-2 text-xs text-blue-400 font-medium">Create Account</span>}
        </div>

        <div className={`w-16 h-0.5 transition-all ${step >= 3 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-slate-700'}`}></div>

        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            step >= 3 ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'
          }`}>
            {step > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
          </div>
          {step === 3 && <span className="ml-2 text-xs text-blue-400 font-medium">Confirmation</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Set up your account</h1>
              <p className="text-slate-400 text-sm">Ready to register to an amazing world?</p>
            </div>

            {renderStepIndicator()}

            {step === 1 && (
              <form onSubmit={handleBasicInfo} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    onClick={() => window.location.href = '/login'}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleCreateAccount} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-300 text-sm">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 text-sm">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && success && (
              <div className="space-y-6">
                <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Account Created!</h3>
                  <p className="text-slate-300 mb-2">
                    Hello <span className="text-blue-400 font-semibold">{fullName}</span>
                  </p>
                  <p className="text-slate-400 text-sm">
                    We are grateful to have you here, in our amazing community.
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Enjoy your journey...
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/20"
                >
                  Let's start
                </Button>

                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {step !== 3 && (
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                  {step === 1 ? "Already have an account? " : "Need to go back? "}
                  <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">
                    Login
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
