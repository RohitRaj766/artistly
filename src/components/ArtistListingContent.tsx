'use client';

import { Suspense } from 'react';
import ArtistListingPage from './ArtistListingPage';

export default function ArtistListingPage2() {
  return (
    <Suspense fallback={<div>Loading artists...</div>}>
      <ArtistListingPage />
    </Suspense>
  );
}
