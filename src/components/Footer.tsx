import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-background border-t py-6 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="font-medium text-foreground">Artistly.com</span>. For demo purposes only.
        </p>

        <div className="flex gap-4 text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
