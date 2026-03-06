import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-foreground">Portal UNM</span>
                <span className="text-xs text-muted-foreground">Universidad Nacional de Moreno</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Portal de información y servicios para la comunidad universitaria.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categoria/tramite" className="text-muted-foreground transition-colors hover:text-primary">
                  Trámites
                </Link>
              </li>
              <li>
                <Link href="/categoria/tramites-interno" className="text-muted-foreground transition-colors hover:text-primary">
                  Trámites internos
                </Link>
              </li>
              <li>
                <Link href="/categoria/consulta" className="text-muted-foreground transition-colors hover:text-primary">
                  Consultas
                </Link>
              </li>
              <li>
                <Link href="/categoria/carrera" className="text-muted-foreground transition-colors hover:text-primary">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/buscar" className="text-muted-foreground transition-colors hover:text-primary">
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categoria/asignatura" className="text-muted-foreground transition-colors hover:text-primary">
                  Asignaturas
                </Link>
              </li>
              <li>
                <Link href="/categoria/edificio" className="text-muted-foreground transition-colors hover:text-primary">
                  Edificios
                </Link>
              </li>
              <li>
                <Link href="/categoria/enlace" className="text-muted-foreground transition-colors hover:text-primary">
                  Enlaces Útiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Av. Bartolomé Mitre 1891, Moreno, Buenos Aires</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(0237) 466-7186</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>alumnos@unm.edu.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Universidad Nacional de Moreno. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
