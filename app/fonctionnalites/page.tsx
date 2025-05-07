import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Database, RefreshCw, History, BarChart3, Shield } from "lucide-react"

export default function FonctionnalitesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Fonctionnalités Principales</h1>
                <p className="max-w-[900px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez toutes les fonctionnalités qui font de DataFlow la solution idéale pour vos intégrations de
                  données.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                    <FileText className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Sources Multiples</CardTitle>
                  <CardDescription>
                    Connectez-vous à diverses sources de données pour extraire les informations dont vous avez besoin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400">
                    <li>Fichiers CSV, JSON, Excel</li>
                    <li>APIs REST et SOAP</li>
                    <li>Bases de données SQL et NoSQL</li>
                    <li>Services cloud (AWS, Google Cloud, Azure)</li>
                    <li>Applications SaaS (Salesforce, HubSpot, etc.)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                    <RefreshCw className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Transformation Avancée</CardTitle>
                  <CardDescription>Transformez vos données avec des outils puissants et flexibles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400">
                    <li>Mappage visuel des champs</li>
                    <li>Filtrage et validation des données</li>
                    <li>Transformations prédéfinies (formatage, conversion)</li>
                    <li>Fonctions personnalisées avec JavaScript</li>
                    <li>Agrégation et enrichissement de données</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                    <Database className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Destinations Flexibles</CardTitle>
                  <CardDescription>Chargez vos données transformées vers diverses destinations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400">
                    <li>Fichiers (CSV, JSON, Excel, PDF)</li>
                    <li>Bases de données relationnelles</li>
                    <li>Entrepôts de données</li>
                    <li>APIs et webhooks</li>
                    <li>Services cloud et applications SaaS</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                    <History className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Historique Complet</CardTitle>
                  <CardDescription>
                    Suivez toutes les exécutions de vos workflows avec un historique détaillé.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400">
                    <li>Journal d'exécution détaillé</li>
                    <li>Suivi des erreurs et avertissements</li>
                    <li>Statistiques d'exécution</li>
                    <li>Exportation des logs</li>
                    <li>Conservation des données historiques</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                    <BarChart3 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Monitoring en Temps Réel</CardTitle>
                  <CardDescription>
                    Surveillez vos workflows en temps réel pour assurer leur bon fonctionnement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400">
                    <li>Tableaux de bord personnalisables</li>
                    <li>Alertes et notifications</li>
                    <li>Métriques de performance</li>
                    <li>Visualisation des données</li>
                    <li>Rapports automatisés</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 mb-4">
                    <Shield className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Sécurité Intégrée</CardTitle>
                  <CardDescription>Protégez vos données avec des fonctionnalités de sécurité avancées.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400">
                    <li>Authentification robuste</li>
                    <li>Contrôle d'accès basé sur les rôles</li>
                    <li>Chiffrement des données sensibles</li>
                    <li>Journalisation des activités</li>
                    <li>Conformité aux normes de sécurité</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/">
                <Button size="lg" className="px-8">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

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
