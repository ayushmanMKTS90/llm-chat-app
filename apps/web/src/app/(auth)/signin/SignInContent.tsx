'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, Loader2, Lock, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SignInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl,
        });
        if (result?.error) {
          setFormError('Invalid email or password');
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } else {
        // Register
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || 'Registration failed');
        } else {
          // Auto sign in after registration
          const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
          });
          if (result?.error) {
            setFormError('Registration successful but sign in failed');
          } else {
            router.push(callbackUrl);
            router.refresh();
          }
        }
      }
    } catch {
      setFormError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-8">
          <h1 className="text-display-lg font-display font-semibold text-ink mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-body text-body-md">
            {isLogin ? 'Sign in to access your conversations' : 'Enter your details to get started'}
          </p>
        </div>

        {(error || formError) && (
          <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-error-soft text-error text-caption-sm" role="alert">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{formError || error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-body-sm font-medium text-ink">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-mute" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-pill w-full pl-10 pr-4"
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-body-sm font-medium text-ink">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-mute" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-pill w-full pl-10 pr-4"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-body-sm font-medium text-ink">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-mute" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-pill w-full pl-10 pr-4"
                required
                disabled={loading}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password || (!isLogin && !name)}
            className={cn(
              'btn-primary w-full justify-center gap-3 py-3',
              loading && 'opacity-75 cursor-wait',
              (!email || !password || (!isLogin && !name)) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                <span>{isLogin ? 'Sign in' : 'Create account'}</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-caption-sm text-mute">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-link hover:underline font-medium"
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </p>

        <p className="mt-4 text-center text-caption-sm text-mute">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}