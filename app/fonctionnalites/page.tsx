import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Database, RefreshCw, History, BarChart3, Shield } from "lucide-react"

export default function FonctionnalitesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1" >
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-800 dark:text-blue-200">Fonctionnalités Principales</h1>
                <p className="max-w-[900px] text-blue-700 dark:text-blue-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez toutes les fonctionnalités qui font de DataFlow la solution idéale pour vos intégrations de
                  données.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: FileText,
                  title: "Sources Multiples",
                  desc: "Connectez-vous à diverses sources de données pour extraire les informations dont vous avez besoin.",
                  items: [
                    "Fichiers CSV, JSON, Excel",
                    "APIs REST et SOAP",
                    "Bases de données SQL et NoSQL",
                    "Services cloud (AWS, Google Cloud, Azure)",
                    "Applications SaaS (Salesforce, HubSpot, etc.)"
                  ]
                },
                {
                  icon: RefreshCw,
                  title: "Transformation Avancée",
                  desc: "Transformez vos données avec des outils puissants et flexibles.",
                  items: [
                    "Mappage visuel des champs",
                    "Filtrage et validation des données",
                    "Transformations prédéfinies (formatage, conversion)",
                    "Fonctions personnalisées avec JavaScript",
                    "Agrégation et enrichissement de données"
                  ]
                },
                {
                  icon: Database,
                  title: "Destinations Flexibles",
                  desc: "Chargez vos données transformées vers diverses destinations.",
                  items: [
                    "Fichiers (CSV, JSON, Excel, PDF)",
                    "Bases de données relationnelles",
                    "Entrepôts de données",
                    "APIs et webhooks",
                    "Services cloud et applications SaaS"
                  ]
                },
                {
                  icon: History,
                  title: "Historique Complet",
                  desc: "Suivez toutes les exécutions de vos workflows avec un historique détaillé.",
                  items: [
                    "Journal d'exécution détaillé",
                    "Suivi des erreurs et avertissements",
                    "Statistiques d'exécution",
                    "Exportation des logs",
                    "Conservation des données historiques"
                  ]
                },
                {
                  icon: BarChart3,
                  title: "Monitoring en Temps Réel",
                  desc: "Surveillez vos workflows en temps réel pour assurer leur bon fonctionnement.",
                  items: [
                    "Tableaux de bord personnalisables",
                    "Alertes et notifications",
                    "Métriques de performance",
                    "Visualisation des données",
                    "Rapports automatisés"
                  ]
                },
                {
                  icon: Shield,
                  title: "Sécurité Intégrée",
                  desc: "Protégez vos données avec des fonctionnalités de sécurité avancées.",
                  items: [
                    "Authentification robuste",
                    "Contrôle d'accès basé sur les rôles",
                    "Chiffrement des données sensibles",
                    "Journalisation des activités",
                    "Conformité aux normes de sécurité"
                  ]
                }
              ].map(({ icon: Icon, title, desc, items }, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-800 mb-4">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <CardTitle className="text-blue-800 dark:text-blue-200">{title}</CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400">{desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-blue-700 dark:text-blue-400">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="px-8 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-blue-50 dark:bg-blue-950 border-t border-blue-200 dark:border-blue-800">
        <div className="container px-4 md:px-6 flex justify-center">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            © {new Date().getFullYear()} DataFlow. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
