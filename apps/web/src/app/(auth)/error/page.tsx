import { Suspense } from 'react';
import { AuthErrorContent } from './AuthErrorContent';

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-canvas" />}>
      <AuthErrorContent />
    </Suspense>
  );
}