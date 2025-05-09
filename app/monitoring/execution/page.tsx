"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertTriangle, XCircle, History } from "lucide-react"
import Link from "next/link"
import axiosInstance from "@/app/utils/request"

type log = {
  id?: string
  stamptime?: string
  message?: string
  logLevel?: string
}

type job = {
  jobName?: string
  status?: string
}

type  TimeResponse = {
  extract: string;
  transformation: string;
  load: string;
}


const API_BASE_URL = "https://localhost:8443/api"

export default function ExecutionMonitoringPage() {
  const [error,setError] = useState<string | null>(null)
  const [time, setTime] = useState<TimeResponse>()
  const [timeextract, setTimeExtract] = useState("")
  const [timetransform, setTimeTransform] = useState("")
  const [timeLoad, setTimeLoad] = useState("")
  const [record, setRecord] = useState("")
  const [logs, setLogs] = useState<log[]>([])
  const [job, setJob] = useState<job>()
  useEffect(() => {
      fetchLogs()
      fetchRecord()
      fetchjob()
      fetchTime()

  }, [])

  const fetchLogs = async () => {
    try {  // Données fictives pour les logs
      
      setError(null)
      const response = await axiosInstance.get("/prosseces/job/alllogs")
      const logsData = await response.data
      const allogs: log[] = Array.isArray(logsData) ? logsData : logsData.allogs || []

      setLogs(allogs)
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err)
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue")
    }
  }

  const fetchjob = async () => {
    try {
      setError(null)
      const response = await axiosInstance.get("/prosseces/job")
      const jobData = await response.data
      setJob(jobData)
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err)
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue")
    }
  }


  const fetchRecord = async () =>{
    try {
      setError(null)
      const response = await axiosInstance.get("/prosseces/job/record")
      const rec = await response.data
      setRecord(rec)
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err)
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue")
    }
  }

  const fetchTime = async () =>{
    try{
      setError(null)
      const response = await axiosInstance.get("/prosseces/job/time/extract")
      const extract = await response.data
      setTimeExtract(extract)
      const response1 = await axiosInstance.get("/prosseces/job/time/transform")
      const transformation = await response1.data
      setTimeTransform(transformation)
      const response2 = await axiosInstance.get("/prosseces/job/time/load")
      const load = await response2.data
      setTimeLoad(load)
    }catch(err){
      console.error("Erreur lors du chargement des données :", err)
      setError(err instanceof Error ? err.message : "une erreur inconnue est survenue")
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "Date invalide" : date.toLocaleString()
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
              {job?.status === "en cour" ? (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  En cours
                </Badge>
              ) : job?.status === "succes" ? (
                <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Succès
                </Badge>  
              ) : (
                <Badge variant="destructive">Échec</Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Workflow</div>
              <p className="text-xs text-muted-foreground">{job?.jobName}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enregistrements</CardTitle>
              <span className="text-sm font-medium">{record}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{record}</div>
              <p className="text-xs text-muted-foreground">Enregistrements traités</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temp d'extraction</CardTitle>
              <span className="text-sm font-medium">{timeextract}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{timeextract}</div>
              <p className="text-xs text-muted-foreground">Temp d'extraction</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temp de transformation</CardTitle>
              <span className="text-sm font-medium">{timetransform}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{timetransform}</div>
              <p className="text-xs text-muted-foreground">Temp de transformation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temp de chargement</CardTitle>
              <span className="text-sm font-medium">{timeLoad}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{timeLoad}</div>
              <p className="text-xs text-muted-foreground">Temp de chargement</p>
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
                        {log.logLevel === "INFO" ? (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        ) : log.logLevel === "WARN" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : log.logLevel === "DEBUG" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">
                          [[{formatDate(log.stamptime)}]]
                        </span>{" "}
                        <span
                          className={
                            log.logLevel === "INFO"
                              ? "text-blue-600 dark:text-blue-400"
                              : log.logLevel === "WARN"
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-red-600 dark:text-red-400"
                          }
                        >
                          [{log.logLevel}]
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
                    .filter((log) => log.logLevel === "INFO")
                    .map((log) => (
                      <div key={log.id} className="flex items-start mb-2 last:mb-0">
                        <div className="mr-2 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">
                            [{formatDate(log.stamptime)}]
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
                    .filter((log) => log.logLevel === "WARN")
                    .map((log) => (
                      <div key={log.id} className="flex items-start mb-2 last:mb-0">
                        <div className="mr-2 mt-0.5">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">
                            [{formatDate(log.stamptime)}]
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
                    .filter((log) => log.logLevel === "ERROR")
                    .map((log) => (
                      <div key={log.id} className="flex items-start mb-2 last:mb-0">
                        <div className="mr-2 mt-0.5">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">
                           [{formatDate(log.stamptime)}]
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
          <Link href="/nouveau-workflow">
            <Button variant="outline" className="mr-2">
              Retour au Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
