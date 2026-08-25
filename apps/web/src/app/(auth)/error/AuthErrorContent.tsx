'use client';

import { useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: 'Configuration Error',
      description: 'There is a problem with the server configuration. Please contact support.',
    },
    AccessDenied: {
      title: 'Access Denied',
      description: 'You do not have permission to sign in. Please contact support if you believe this is an error.',
    },
    Verification: {
      title: 'Verification Failed',
      description: 'The verification link has expired or is invalid. Please request a new one.',
    },
    OAuthSignin: {
      title: 'OAuth Sign In Error',
      description: 'There was an error with the OAuth provider. Please try again.',
    },
    OAuthCallback: {
      title: 'OAuth Callback Error',
      description: 'There was an error processing the OAuth callback. Please try again.',
    },
    OAuthCreateAccount: {
      title: 'Account Creation Error',
      description: 'Could not create account with OAuth provider. Please try again.',
    },
    EmailCreateAccount: {
      title: 'Email Account Creation Error',
      description: 'Could not create account with email. Please try again.',
    },
    Callback: {
      title: 'Callback Error',
      description: 'There was an error with the callback. Please try signing in again.',
    },
    OAuthAccountNotLinked: {
      title: 'Account Not Linked',
      description: 'This email is already associated with another account. Please sign in with that provider.',
    },
    EmailSignin: {
      title: 'Email Sign In Error',
      description: 'There was an error sending the sign in email. Please try again.',
    },
    CredentialsSignin: {
      title: 'Invalid Credentials',
      description: 'The credentials provided are invalid. Please check and try again.',
    },
    SessionRequired: {
      title: 'Session Required',
      description: 'Please sign in to access this page.',
    },
    Default: {
      title: 'Authentication Error',
      description: 'An unexpected error occurred. Please try again or contact support.',
    },
  };

  const { title, description } = errorMessages[error || 'Default'] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md card p-8 text-center">
        <div className="mb-6">
          <div className={cn(
            'inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-soft text-error mb-4'
          )}>
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="text-heading-lg font-display font-semibold text-ink mb-2">{title}</h1>
          <p className="text-body text-body-md">{description}</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/api/auth/signin"
            className="btn-primary w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Try Again
          </Link>
          <Link
            href="/"
            className="btn-secondary w-full"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}