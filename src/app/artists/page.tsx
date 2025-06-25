import ArtistListingPage from "@/pages/ArtistPage";
import { FilterProvider } from '@/context/FilterContext'

export default function page(){
  return(
    <FilterProvider>
    <ArtistListingPage/>
    </FilterProvider>
  )
}