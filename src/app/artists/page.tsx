'use client';

import { FilterProvider } from '@/context/FilterContext';
import ArtistListingPage from '@/components/ArtistListingPage';
import { Suspense } from 'react';
export default function ArtistsPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading filters...</div>}>
    <FilterProvider>
      <ArtistListingPage />
    </FilterProvider>
    </Suspense>
  );
}
