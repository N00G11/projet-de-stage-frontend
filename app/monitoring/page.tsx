"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, AlertTriangle, CheckCircle, Clock, RefreshCw, XCircle } from "lucide-react"

export default function MonitoringPage() {
  // Données fictives pour les logs
  const logs = [
    {
      id: 1,
      timestamp: "2023-05-15 14:30:22",
      level: "info",
      message: "Démarrage du workflow 'Import CSV vers Base de Données'",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 2,
      timestamp: "2023-05-15 14:30:25",
      level: "info",
      message: "Lecture du fichier CSV source",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 3,
      timestamp: "2023-05-15 14:30:45",
      level: "info",
      message: "1250 enregistrements lus depuis le fichier CSV",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 4,
      timestamp: "2023-05-15 14:31:10",
      level: "info",
      message: "Début de la transformation des données",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 5,
      timestamp: "2023-05-15 14:31:45",
      level: "warning",
      message: "5 enregistrements avec des données manquantes détectés",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 6,
      timestamp: "2023-05-15 14:32:15",
      level: "info",
      message: "Début du chargement des données dans la base de données",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 7,
      timestamp: "2023-05-15 14:32:40",
      level: "info",
      message: "1245 enregistrements insérés avec succès",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 8,
      timestamp: "2023-05-15 14:32:45",
      level: "info",
      message: "Workflow terminé avec succès",
      workflow: "Import CSV vers Base de Données",
    },
    {
      id: 9,
      timestamp: "2023-05-15 10:15:10",
      level: "info",
      message: "Démarrage du workflow 'Synchronisation API'",
      workflow: "Synchronisation API",
    },
    {
      id: 10,
      timestamp: "2023-05-15 10:15:30",
      level: "error",
      message: "Erreur de connexion à l'API source: timeout",
      workflow: "Synchronisation API",
    },
  ]

  // Données fictives pour les métriques
  const metrics = {
    totalWorkflows: 12,
    activeWorkflows: 8,
    successRate: 94.5,
    averageExecutionTime: "1.2 min",
    dataProcessed: "2.4 GB",
    lastHourExecutions: 5,
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Monitoring</h1>
          <Button variant="outline" size="sm" className="ml-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="alerts">Alertes</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taux de Succès</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.successRate}%</div>
                  <p className="text-xs text-muted-foreground">+2.5% depuis la semaine dernière</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temps Moyen d'Exécution</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.averageExecutionTime}</div>
                  <p className="text-xs text-muted-foreground">-8% depuis la semaine dernière</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Données Traitées</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.dataProcessed}</div>
                  <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Activité des Workflows</CardTitle>
                  <CardDescription>Exécutions de workflows au cours des dernières 24 heures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <Activity className="h-8 w-8 text-slate-400" />
                    <span className="ml-2 text-sm text-slate-500">Graphique d'activité</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Statut des Workflows</CardTitle>
                  <CardDescription>État actuel de tous les workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Succès</span>
                      </div>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                        <span>Avertissements</span>
                      </div>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Échecs</span>
                      </div>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        <span>Inactifs</span>
                      </div>
                      <span className="font-medium">4</span>
                    </div>
                  </div>
                  <div className="mt-6 h-[120px] w-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-sm text-slate-500">Graphique circulaire</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Logs du Système</CardTitle>
                  <CardDescription>Consultez les logs détaillés de tous les workflows</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Niveau de log" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les niveaux</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Avertissement</SelectItem>
                      <SelectItem value="error">Erreur</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Workflow" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les workflows</SelectItem>
                      <SelectItem value="import">Import CSV vers Base de Données</SelectItem>
                      <SelectItem value="sync">Synchronisation API</SelectItem>
                      <SelectItem value="export">Export de Rapports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start border-b border-slate-200 dark:border-slate-800 py-2 last:border-0"
                    >
                      <div className="mr-2 mt-0.5">
                        {log.level === "info" ? (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        ) : log.level === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                          <Badge variant="outline" className="ml-2">
                            {log.workflow}
                          </Badge>
                          <Badge
                            variant={
                              log.level === "info" ? "default" : log.level === "warning" ? "outline" : "destructive"
                            }
                            className="ml-2"
                          >
                            {log.level}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Affichage de 1 à {logs.length} sur {logs.length} entrées
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Précédent
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Suivant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuration des Alertes</CardTitle>
                <CardDescription>Configurez les alertes pour être notifié en cas de problème</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-12 w-12 text-slate-400" />
                  <h3 className="mt-4 text-lg font-medium">Configuration des Alertes</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Cette fonctionnalité sera bientôt disponible.
                  </p>
                  <Button className="mt-4">Configurer les alertes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
