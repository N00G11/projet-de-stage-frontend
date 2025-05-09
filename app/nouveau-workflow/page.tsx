"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, ChevronLeft, FileText, Database, RefreshCw, ArrowRight, History } from "lucide-react"
import Link from "next/link"
import axiosInstance from '../utils/request'



export default function NouveauWorkflowPage() {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<String | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePath, setFilePath] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [jobName, setJobName] = useState("")
  const [description, setDescription] = useState("")
  const [lien, setLien] = useState("")
  const [cle, setCle] = useState("")
  const [type, setType] = useState("")
  const [newKeys, setNewKeys] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([])

  useEffect(() => {
    // Client-side only
    setToken(localStorage.getItem("authToken"))
    setUsername(localStorage.getItem("username"))
  }, [])

  useEffect(() =>{
    
  })

  const handleDestinationChange = (value: string, index: number) => {
    const updatedFields = [...newKeys];
    updatedFields[index] = value || "none";
    setNewKeys(updatedFields);
  };

  const fetchFields = async () => {
    if (!token) return
    try {
      const response = await axiosInstance.get("/prosseces/oldKeys")
      const result = await response.data
      setFields(Array.isArray(result) ? result : [])
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur inconnue")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchFields()
    }
  }, [token])

  const handleStep1 = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post(`/user/${username}/newintegration`,{
        jobName,
        description,
      })
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement du job")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2 = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post("/prosseces/datasource",{
        lien,
        cle,
        type,
      })
      fetchFields()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement de la source")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep3 = async () => {
    try {
      setIsLoading(true)
      const transformationData = newKeys.map(key => key || "none");

      const response = await axiosInstance.post("/prosseces/transformation",transformationData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement de la transformation")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (currentStep >= totalSteps) return

    let success = false

    switch(currentStep) {
      case 1:
        success = await handleStep1()
        break
      case 2:
        success = await handleStep2()
        break
      case 3:
        success = await handleStep3()
        break
      default:
        break
    }

    if (success && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setFilePath(file.name)
      setLien(file.name)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post("/prosseces/datatarget",{
        lien,
        cle,
        type,
      })

      window.location.href = "/monitoring/execution"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement de la cible")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-blue-50/50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-2">
              <Button variant="ghost" size="icon" className="hover:bg-blue-100">
                <ChevronLeft className="h-4 w-4 text-blue-600" />
                <span className="sr-only">Retour</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-blue-800">Nouveau Workflow</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/history">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <History className="mr-2 h-4 w-4 text-blue-500" />
                Historique
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              <FileText className="h-5 w-5" />
            </div>
            <div className={`h-0.5 w-12 ${currentStep > 1 ? "bg-blue-600" : "bg-blue-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              <Database className="h-5 w-5" />
            </div>
            <div className={`h-0.5 w-12 ${currentStep > 2 ? "bg-blue-600" : "bg-blue-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 3 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className={`h-0.5 w-12 ${currentStep > 3 ? "bg-blue-600" : "bg-blue-200"}`}></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 4 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
          <div className="text-sm text-blue-600">
            Étape {currentStep} sur {totalSteps}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
              <span className="text-red-700">×</span>
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {currentStep === 1 && (
          <Card className="border-blue-200">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-800">Informations Générales</CardTitle>
              <CardDescription className="text-blue-600">
                Définissez les informations de base pour votre workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-700">Nom du Workflow</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: Import CSV vers Base de Données"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  disabled={isLoading}
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-blue-700">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez le but de ce workflow..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t border-blue-100">
              <Button variant="outline" disabled={currentStep === 1 || isLoading} className="border-blue-300 text-blue-600 hover:bg-blue-50">
                Précédent
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!jobName || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="border-blue-200">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-800">Configuration de la Source</CardTitle>
              <CardDescription className="text-blue-600">
                Configurez la source de données pour votre workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="fichier" className="space-y-4">
                <TabsList className="w-full bg-blue-50">
                  <TabsTrigger 
                    value="fichier" 
                    className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    disabled={isLoading}
                  >
                    Fichier
                  </TabsTrigger>
                  <TabsTrigger 
                    value="api" 
                    className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    disabled={isLoading}
                  >
                    API
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="fichier" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file-type" className="text-blue-700">Type de Fichier</Label>
                    <Select 
                      defaultValue="csv" 
                      onValueChange={setType}
                    >
                      <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file-path" className="text-blue-700">Fichier</Label>
                    <div className="flex gap-2">
                      <Input
                        id="file-path"
                        placeholder="Sélectionnez un fichier"
                        value={lien}
                        onChange={(e) => setLien(e.target.value)}
                        className="flex-1 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                        disabled={isLoading}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="relative">
                          <input
                            type="file"
                            id="file-upload"
                            ref={fileInputRef}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                            onChange={handleFileChange}
                            disabled={isLoading}
                          />
                          <Button 
                            variant="outline" 
                            type="button" 
                            className="relative z-0 border-blue-300 text-blue-600 hover:bg-blue-50" 
                            disabled={isLoading}
                          >
                            Parcourir
                          </Button>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delimiter" className="text-blue-700">Délimiteur (pour CSV)</Label>
                    <Select defaultValue="comma" disabled={isLoading}>
                      <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez un délimiteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comma">Virgule (,)</SelectItem>
                        <SelectItem value="semicolon">Point-virgule (;)</SelectItem>
                        <SelectItem value="tab">Tabulation</SelectItem>
                        <SelectItem value="pipe">Pipe (|)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="api" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-url" className="text-blue-700">URL de l'API</Label>
                    <Input
                      id="api-url"
                      placeholder="https://api.exemple.com/data"
                      value={lien}
                      onChange={(e) => {
                        setLien(e.target.value)
                        setType("api")
                      }}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-method" className="text-blue-700">Méthode</Label>
                    <Input 
                      id="api-method" 
                      value="GET" 
                      readOnly 
                      className="bg-blue-50 border-blue-200 text-blue-600" 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-headers" className="text-blue-700">En-têtes (format JSON)</Label>
                    <Textarea
                      id="api-headers"
                      placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                      className="min-h-[100px] border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      value={cle}
                      onChange={(e) => setCle(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t border-blue-100">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={isLoading}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Précédent
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={(!lien || !type) || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="border-blue-200">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-800">Transformation</CardTitle>
              <CardDescription className="text-blue-600">
                Configurez le mappage des champs entre la source et la destination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-4">
              {fields && Array.isArray(fields) && fields.map((field, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="space-y-2">
                    <Label className="text-blue-700">Champ Source</Label>
                    <Input
                      value={field}
                      readOnly
                      className="bg-blue-50 border-blue-200 text-blue-600"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-700">Champ Destination</Label>
                    <Input 
                      onChange={(e) => handleDestinationChange(e.target.value, index)}
                      disabled={isLoading}
                      placeholder="Entrez le nom du champ ou laissez vide pour 'none'"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t border-blue-100">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={isLoading}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Précédent
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 4 && (
          <Card className="border-blue-200">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-800">Configuration de la Destination</CardTitle>
              <CardDescription className="text-blue-600">
                Configurez la destination des données transformées
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="fichier" className="space-y-4">
                <TabsList className="w-full bg-blue-50">
                  <TabsTrigger 
                    value="fichier" 
                    className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    disabled={isLoading}
                  >
                    Fichier
                  </TabsTrigger>
                  <TabsTrigger 
                    value="api" 
                    className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    disabled={isLoading}
                  >
                    API
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="fichier" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dest-file-type" className="text-blue-700">Type de Fichier</Label>
                    <Select 
                      defaultValue="csv" 
                      onValueChange={setType}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dest-file-path" className="text-blue-700">Chemin de Destination</Label>
                    <Input 
                      id="dest-file-path" 
                      placeholder="/chemin/vers/fichier_destination.csv"
                      value={lien}
                      onChange={(e) => setLien(e.target.value)}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dest-delimiter" className="text-blue-700">Délimiteur (pour CSV)</Label>
                    <Select defaultValue="comma" disabled={isLoading}>
                      <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez un délimiteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comma">Virgule (,)</SelectItem>
                        <SelectItem value="semicolon">Point-virgule (;)</SelectItem>
                        <SelectItem value="tab">Tabulation</SelectItem>
                        <SelectItem value="pipe">Pipe (|)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="api" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dest-api-url" className="text-blue-700">URL de l'API</Label>
                    <Input 
                      id="dest-api-url" 
                      placeholder="https://api.exemple.com/data"
                      value={lien}
                      onChange={(e) => {
                        setLien(e.target.value)
                        setType("api")
                      }}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dest-api-method" className="text-blue-700">Méthode</Label>
                    <Select defaultValue="post" disabled={isLoading}>
                      <SelectTrigger className="border-blue-300 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">POST</SelectItem>
                        <SelectItem value="put">PUT</SelectItem>
                        <SelectItem value="patch">PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dest-api-headers" className="text-blue-700">En-têtes (format JSON)</Label>
                    <Textarea
                      id="dest-api-headers"
                      placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                      className="min-h-[100px] border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      value={cle}
                      onChange={(e) => setCle(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t border-blue-100">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={isLoading}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Précédent
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={(!lien || !type) || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="mr-2 h-4 w-4" />
                Exécuter
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}