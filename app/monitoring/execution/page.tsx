"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertTriangle, XCircle, History } from "lucide-react"
import Link from "next/link"

export default function ExecutionMonitoringPage() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"running" | "success" | "error">("running")
  const [logs, setLogs] = useState<Array<{ id: number; timestamp: string; level: string; message: string }>>([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      level: "info",
      message: "Démarrage du workflow...",
    },
  ])

  // Simuler l'exécution du workflow
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("success")
          return 100
        }
        return prev + 10
      })

      // Ajouter des logs simulés
      if (progress < 100) {
        const newLog = {
          id: logs.length + 1,
          timestamp: new Date().toISOString(),
          level: Math.random() > 0.9 ? "warning" : "info",
          message: getRandomLogMessage(progress),
        }
        setLogs((prev) => [...prev, newLog])
      } else if (progress >= 100 && status === "running") {
        const completionLog = {
          id: logs.length + 1,
          timestamp: new Date().toISOString(),
          level: "info",
          message: "Workflow terminé avec succès.",
        }
        setLogs((prev) => [...prev, completionLog])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [progress, logs.length, status])

  // Fonction pour générer des messages de log aléatoires
  const getRandomLogMessage = (currentProgress: number) => {
    const messages = [
      "Lecture des données source...",
      "Analyse de la structure des données...",
      "Validation des champs...",
      "Transformation des données en cours...",
      "Préparation des données pour la destination...",
      "Mappage des champs...",
      "Conversion des formats de données...",
      "Vérification de l'intégrité des données...",
      "Préparation de l'écriture vers la destination...",
      "Écriture des données transformées...",
    ]

    if (currentProgress < 30) {
      return messages[Math.floor(Math.random() * 3)]
    } else if (currentProgress < 60) {
      return messages[Math.floor(Math.random() * 3) + 3]
    } else {
      return messages[Math.floor(Math.random() * 4) + 6]
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Monitoring d'Exécution</h1>
          <div className="flex items-center gap-2">
            <Link href="/history">
              <Button variant="outline" size="sm">
                <History className="mr-2 h-4 w-4" />
                Historique
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Statut</CardTitle>
              {status === "running" ? (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  En cours
                </Badge>
              ) : status === "success" ? (
                <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Succès
                </Badge>
              ) : (
                <Badge variant="destructive">Échec</Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Workflow ETL</div>
              <p className="text-xs text-muted-foreground">Import CSV vers Base de Données</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enregistrements</CardTitle>
              <span className="text-sm font-medium">{Math.floor(progress * 12.5)}/1250</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor((progress / 100) * 1250)}</div>
              <p className="text-xs text-muted-foreground">Enregistrements traités</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vitesse d'exécution</CardTitle>
              <span className="text-sm font-medium">{Math.floor(125 / Math.max(1, progress / 10))} sec/100 enr.</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(1250 / Math.max(1, progress / 10))} enr/min</div>
              <p className="text-xs text-muted-foreground">Vitesse moyenne</p>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Logs d'Exécution</CardTitle>
            <CardDescription>Logs détaillés de l'exécution du workflow en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="warning">Avertissements</TabsTrigger>
                <TabsTrigger value="error">Erreurs</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border bg-slate-50 dark:bg-slate-900 p-4 font-mono text-sm h-[400px] overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start mb-2 last:mb-0">
                      <div className="mr-2 mt-0.5">
                        {log.level === "info" ? (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        ) : log.level === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          [{new Date(log.timestamp).toLocaleTimeString()}]
                        </span>{" "}
                        <span
                          className={
                            log.level === "info"
                              ? "text-blue-600 dark:text-blue-400"
                              : log.level === "warning"
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-red-600 dark:text-red-400"
                          }
                        >
                          [{log.level.toUpperCase()}]
                        </span>{" "}
                        {log.message}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="info" className="space-y-4">
                <div className="rounded-md border bg-slate-50 dark:bg-slate-900 p-4 font-mono text-sm h-[400px] overflow-y-auto">
                  {logs
                    .filter((log) => log.level === "info")
                    .map((log) => (
                      <div key={log.id} className="flex items-start mb-2 last:mb-0">
                        <div className="mr-2 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">
                            [{new Date(log.timestamp).toLocaleTimeString()}]
                          </span>{" "}
                          <span className="text-blue-600 dark:text-blue-400">[INFO]</span> {log.message}
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="warning" className="space-y-4">
                <div className="rounded-md border bg-slate-50 dark:bg-slate-900 p-4 font-mono text-sm h-[400px] overflow-y-auto">
                  {logs
                    .filter((log) => log.level === "warning")
                    .map((log) => (
                      <div key={log.id} className="flex items-start mb-2 last:mb-0">
                        <div className="mr-2 mt-0.5">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">
                            [{new Date(log.timestamp).toLocaleTimeString()}]
                          </span>{" "}
                          <span className="text-amber-600 dark:text-amber-400">[WARNING]</span> {log.message}
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="error" className="space-y-4">
                <div className="rounded-md border bg-slate-50 dark:bg-slate-900 p-4 font-mono text-sm h-[400px] overflow-y-auto">
                  {logs
                    .filter((log) => log.level === "error")
                    .map((log) => (
                      <div key={log.id} className="flex items-start mb-2 last:mb-0">
                        <div className="mr-2 mt-0.5">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">
                            [{new Date(log.timestamp).toLocaleTimeString()}]
                          </span>{" "}
                          <span className="text-red-600 dark:text-red-400">[ERROR]</span> {log.message}
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-4">
          <Link href="/">
            <Button variant="outline" className="mr-2">
              Retour au Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
