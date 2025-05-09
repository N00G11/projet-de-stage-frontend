"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axiosInstance from '../../utils/request'


const API_BASE_URL = "https://localhost:8443/api"
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    if (!username) {
      setError("Le nom d'utilisateur est requis")
      return false
    }


    if (!password) {
      setError("Le mot de passe est requis")
      return false
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      setIsLoading(true);
    
      try {
        const response = await axiosInstance.post('/auth/login', {
          username,
          password,
        });
    
        const { token } = response.data;
    
        // Stocker les informations dans localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
    
        // Naviguer vers la page "nouveau-workflow" après une connexion réussie
        router.push("/nouveau-workflow");
    
        return token;
      } catch (error) {
        // Gérer l'erreur spécifique d'axios ou toute autre erreur
        const message = "Password or username is not correct";
        throw new Error(message);
      }
    } catch (err) {
      // Gestion générale des erreurs
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la connexion");
    } finally {
      // Arrêter le chargement
      setIsLoading(false);
    }
    
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Connexion</h1>
          <p className="text-slate-600 dark:text-slate-300">Entrez vos identifiants pour accéder à votre compte</p>
        </div>
        <Card className="border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-blue-700 dark:text-blue-300">Connexion</CardTitle>
            <CardDescription>Accédez à votre espace DataFlow</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom d'utilisateur</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className="border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    </span>
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm">
              Vous n'avez pas de compte?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                S'inscrire
              </Link>
            </div>
          </CardFooter>
        </Card>
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} DataFlow. Tous droits réservés.
        </div>
      </div>
    </div>
  )
}
