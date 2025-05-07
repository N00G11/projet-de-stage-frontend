"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Download, Filter } from "lucide-react"

export default function HistoryPage() {
  // Données fictives pour l'historique
  const allHistoryItems = [
    {
      id: 1,
      workflowName: "Import CSV vers Base de Données",
      startTime: "2023-05-15 14:30:22",
      endTime: "2023-05-15 14:32:45",
      status: "success",
      records: 1250,
      user: "admin@example.com",
    },
    {
      id: 2,
      workflowName: "Synchronisation API",
      startTime: "2023-05-15 10:15:10",
      endTime: "2023-05-15 10:18:32",
      status: "success",
      records: 532,
      user: "admin@example.com",
    },
    {
      id: 3,
      workflowName: "Export de Rapports",
      startTime: "2023-05-14 09:45:00",
      endTime: "2023-05-14 09:46:12",
      status: "failed",
      records: 0,
      user: "user@example.com",
    },
    {
      id: 4,
      workflowName: "Transformation de Données JSON",
      startTime: "2023-05-14 08:30:45",
      endTime: "2023-05-14 08:35:22",
      status: "success",
      records: 845,
      user: "admin@example.com",
    },
    {
      id: 5,
      workflowName: "Import CSV vers Base de Données",
      startTime: "2023-05-13 16:20:10",
      endTime: "2023-05-13 16:22:30",
      status: "success",
      records: 1250,
      user: "admin@example.com",
    },
    {
      id: 6,
      workflowName: "Synchronisation API",
      startTime: "2023-05-13 11:10:05",
      endTime: "2023-05-13 11:15:45",
      status: "warning",
      records: 498,
      user: "user@example.com",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [periodFilter, setPeriodFilter] = useState("7days")
  const [statusFilter, setStatusFilter] = useState("all")
  const [historyItems, setHistoryItems] = useState(allHistoryItems)

  // Fonction pour filtrer les éléments d'historique
  const filterHistoryItems = () => {
    let filtered = [...allHistoryItems]

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.user.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtre par période
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const yesterday = today - 86400000 // 24 heures en millisecondes

    if (periodFilter === "today") {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.startTime).getTime()
        return itemDate >= today
      })
    } else if (periodFilter === "yesterday") {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.startTime).getTime()
        return itemDate >= yesterday && itemDate < today
      })
    } else if (periodFilter === "7days") {
      const sevenDaysAgo = today - 7 * 86400000
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.startTime).getTime()
        return itemDate >= sevenDaysAgo
      })
    } else if (periodFilter === "30days") {
      const thirtyDaysAgo = today - 30 * 86400000
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.startTime).getTime()
        return itemDate >= thirtyDaysAgo
      })
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    setHistoryItems(filtered)
  }

  // Appliquer les filtres lorsqu'ils changent
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setTimeout(filterHistoryItems, 300)
  }

  const handlePeriodChange = (value: string) => {
    setPeriodFilter(value)
    setTimeout(filterHistoryItems, 100)
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    setTimeout(filterHistoryItems, 100)
  }

  // Fonction pour exporter les données
  const handleExport = () => {
    // Simuler un téléchargement
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(historyItems, null, 2)], { type: "application/json" })
    element.href = URL.createObjectURL(file)
    element.download = "historique_executions.json"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Historique</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        <Card>
          <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardTitle className="text-slate-700 dark:text-slate-300">Historique des Exécutions</CardTitle>
            <CardDescription>Consultez l'historique complet de toutes les exécutions de workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-full appearance-none bg-background pl-8 shadow-none"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="7days" value={periodFilter} onValueChange={handlePeriodChange}>
                      <SelectTrigger className="w-[180px] border-blue-200 dark:border-blue-800 focus:ring-blue-500">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="yesterday">Hier</SelectItem>
                        <SelectItem value="7days">7 derniers jours</SelectItem>
                        <SelectItem value="30days">30 derniers jours</SelectItem>
                        <SelectItem value="custom">Personnalisé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="all" value={statusFilter} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-[180px] border-purple-200 dark:border-purple-800 focus:ring-purple-500">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="success">Succès</SelectItem>
                        <SelectItem value="failed">Échec</SelectItem>
                        <SelectItem value="warning">Avertissement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Workflow</TableHead>
                      <TableHead>Début</TableHead>
                      <TableHead>Fin</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Enregistrements</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.workflowName}</TableCell>
                        <TableCell>{item.startTime}</TableCell>
                        <TableCell>{item.endTime}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "success"
                                ? "default"
                                : item.status === "warning"
                                  ? "outline"
                                  : "destructive"
                            }
                            className={
                              item.status === "success"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700"
                                : item.status === "warning"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300 dark:border-amber-700"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700"
                            }
                          >
                            {item.status === "success"
                              ? "Succès"
                              : item.status === "warning"
                                ? "Avertissement"
                                : "Échec"}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.records}</TableCell>
                        <TableCell>{item.user}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                          >
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de 1 à {historyItems.length} sur {historyItems.length} entrées
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
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
