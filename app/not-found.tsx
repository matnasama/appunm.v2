import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Página no encontrada
          </h2>
          <p className="mb-8 max-w-md text-muted-foreground">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Puedes volver al inicio o buscar lo que necesitas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/buscar" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
