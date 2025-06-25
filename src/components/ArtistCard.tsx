import { Artist } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, DollarSign, User } from 'lucide-react'

type Props = {
  artist: Artist
}

export default function ArtistCard({ artist }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow h-full overflow-hidden">
      {/* Artist Image */}
     <div className="h-48 w-full overflow-hidden">
  <img
    src={artist.image || '/avatarDef.jpeg'} 
    alt={artist.name}
    className="w-full h-48 object-cover rounded-t"
    loading='lazy'
  />
</div>


      <CardHeader>
        <CardTitle className="text-indigo-700 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" />
          {artist.name}
        </CardTitle>
        <CardDescription className="capitalize">{artist.category}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{artist.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>{artist.price}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full cursor-pointer">Ask for Quote</Button>
      </CardFooter>
    </Card>
  )
}
