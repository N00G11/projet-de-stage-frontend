import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, FileText, RefreshCw } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* Modifier la section hero pour ajouter des couleurs plus vives */}
      {/* Remplacer la section hero */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-700 dark:text-blue-300">
                Solution D'integration Moderne
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-50">
                Intégration de Données <span className="text-blue-600 dark:text-blue-400">Simplifiée</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 md:text-xl">
                Extrayez, transformez et chargez vos données sans effort avec notre plateforme intuitive. Connectez des
                fichiers ou des APIs et automatisez vos flux de données.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register">
                  <Button className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Commencer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/fonctionnalites">
                  <Button
                    variant="outline"
                    className="px-8 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Découvrir les fonctionnalités
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 rounded-full blur-3xl opacity-70"></div>
                <div className="relative h-full w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="mx-auto text-sm font-medium">Flux de Données</div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-center p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg w-1/4">
                        <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <span className="mt-2 text-xs text-blue-700 dark:text-blue-300">Sources</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div className="flex flex-col items-center p-4 bg-purple-100 dark:bg-purple-900/50 rounded-lg w-1/4">
                        <RefreshCw className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        <span className="mt-2 text-xs text-purple-700 dark:text-purple-300">Transformation</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div className="flex flex-col items-center p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg w-1/4">
                        <Database className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        <span className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">Destinations</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-blue-100 dark:bg-blue-900/30 rounded w-full"></div>
                      <div className="h-8 bg-purple-100 dark:bg-purple-900/30 rounded w-full"></div>
                      <div className="h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simplifié */}
      <footer className="w-full py-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container px-4 md:px-6 flex justify-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} DataFlow. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
