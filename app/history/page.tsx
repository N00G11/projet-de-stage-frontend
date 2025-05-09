"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import promise from '@/app/utils/page'

const API_BASE_URL = "https://localhost:8443/api"

type Job = {
  id: string
  jobName?: string
  startTime?: string
  endTime?: string
  status?: string
  username?: string
  dataSource?: {
    type?: string
  }
  dataTarget?: {
    type?: string
  }
  jobExecution?: {
    startTime?: string
    endTime?: string
    status?: string
  }
}

export default function HistoryPage() {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [periodFilter, setPeriodFilter] = useState("7days")
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const jobsPerPage = 6

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    const storedUsername = localStorage.getItem("username")
    if (storedToken && storedUsername) {
      setToken(storedToken)
      setUsername(storedUsername)
      fetchJobs(storedToken, storedUsername)
    } else {
      setError("Authentification requise")
      setLoading(false)
    }
  }, [])

  const fetchJobs = async (token: string, username: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/user/${username}/alljobs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)
      const jobsData = await response.json()
      const jobs: Job[] = Array.isArray(jobsData) ? jobsData : jobsData.jobs || []
      setAllJobs(jobs)
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err)
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue")
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = allJobs.filter((job) => {
    const term = searchTerm.toLowerCase()
    const jobDate = new Date(job.jobExecution?.startTime || job.startTime || "").getTime()
    const today = new Date().setHours(0, 0, 0, 0)

    if (
      searchTerm &&
      !(
        job.jobName?.toLowerCase().includes(term) ||
        job.username?.toLowerCase().includes(term)
      )
    ) return false

    if (periodFilter === "today" && jobDate < today) return false
    if (periodFilter === "yesterday" && (jobDate < today - 86400000 || jobDate >= today)) return false
    if (periodFilter === "7days" && jobDate < today - 7 * 86400000) return false
    if (periodFilter === "30days" && jobDate < today - 30 * 86400000) return false

    return true
  })

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  )

  const handleExport = () => {
    try {
      const element = document.createElement("a")
      const file = new Blob([JSON.stringify(filteredJobs, null, 2)], { type: "application/json" })
      element.href = URL.createObjectURL(file)
      element.download = `historique_executions_${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(element)
      element.click()
      element.remove()
    } catch (err) {
      console.error("Erreur lors de l'export :", err)
      setError("Échec de l'export")
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "Date invalide" : date.toLocaleString()
  }

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Succès</Badge>
      case "warning":
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Avertissement</Badge>
      case "failed":
      case "error":
        return <Badge className="bg-red-100 text-red-700">Échec</Badge>
      case "running":
      case "in progress":
        return <Badge className="bg-blue-100 text-blue-700">En cours</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status || "Inconnu"}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-blue-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-blue-800">Historique</h1>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-700 hover:bg-blue-100"
            disabled={loading || !filteredJobs.length}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
        <Card className="bg-white shadow-md rounded-lg border border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Historique des Exécutions</CardTitle>
            {username && (
              <CardDescription className="text-sm text-blue-600">
                Utilisateur : {username}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                  <Input
                    type="search"
                    placeholder="Rechercher un workflow..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 border-blue-300"
                    disabled={loading}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <Select value={periodFilter} onValueChange={setPeriodFilter} disabled={loading}>
                      <SelectTrigger className="w-[180px] border-blue-300">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="yesterday">Hier</SelectItem>
                        <SelectItem value="7days">7 derniers jours</SelectItem>
                        <SelectItem value="30days">30 derniers jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {!loading && !error && (
                <>
                  <div className="rounded-md border border-blue-200 bg-white">
                    <Table>
                      <TableHeader className="bg-blue-100 text-blue-800">
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead>Début</TableHead>
                          <TableHead>Fin</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Temps</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedJobs.length > 0 ? (
                          paginatedJobs.map((job) => (
                            <TableRow
                              key={job.id}
                              className="hover:bg-blue-50 transition-colors"
                            >
                              <TableCell>{job.id}</TableCell>
                              <TableCell>{job.jobName || "N/A"}</TableCell>
                              <TableCell>{formatDate(job.jobExecution?.startTime || job.startTime)}</TableCell>
                              <TableCell>{formatDate(job.jobExecution?.endTime || job.endTime)}</TableCell>
                              <TableCell>{job.dataSource?.type || "-"}</TableCell>
                              <TableCell>{job.dataTarget?.type || "-"}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>{getStatusBadge(job.jobExecution?.status || job.status)}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-blue-700">
                              Aucune exécution trouvée
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-4 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Précédent
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} sur {totalPages}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
