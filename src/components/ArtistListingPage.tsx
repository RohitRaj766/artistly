'use client';

import { Suspense } from 'react';
import ArtistListingContent from './ArtistListingContent';

export default function ArtistListingPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading filters...</div>}>
      <ArtistListingContent />
    </Suspense>
  );
}
