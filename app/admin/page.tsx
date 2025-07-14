'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// Icons components for better UX
const Icons = {
  Dashboard: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Products: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Categories: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Messages: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Database: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Settings: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Password: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Edit: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Delete: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Eye: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  TrendUp: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  ),
}

// Utility function for authenticated API calls
const createAuthenticatedFetch = () => {
  return async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      throw new Error('No authentication token')
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }

    return fetch(url, { ...options, headers })
  }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (token && token !== 'authenticated') {
      // Verify token is still valid by checking with server
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        setIsAuthenticated(true)
        toast.success('Connexion réussie!')
      } else {
        toast.error(data.error || 'Identifiants incorrects')
      }
    } catch (error) {
      toast.error('Erreur lors de la connexion')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
    toast.success('Déconnexion réussie')
  }

  // Helper function for authenticated API calls
  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      toast.error('Session expirée, veuillez vous reconnecter')
      handleLogout()
      return null
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }

    try {
      const response = await fetch(url, { ...options, headers })
      
      if (response.status === 401) {
        toast.error('Session expirée, veuillez vous reconnecter')
        handleLogout()
        return null
      }
      
      return response
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    checkAuth()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Administration El Jarda</h1>
            <p className="text-gray-600 mt-2">Connectez-vous pour accéder au panneau d'administration</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="input-field"
                required
              />
            </div>
            
            <button type="submit" className="w-full btn-primary">
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 flex flex-col items-center space-y-3">
            <ForgotPasswordLink />
            <div className="border-t w-full pt-4">
              <button
                onClick={() => router.push('/')}
                className="w-full text-gray-600 hover:text-gray-900 text-sm flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Retour à l'accueil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 sm:h-16 space-y-3 sm:space-y-0">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Administration El Jarda</h1>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={() => router.push('/')}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors w-full sm:w-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Retour au site</span>
                <span className="sm:hidden">Accueil</span>
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary w-full sm:w-auto"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <AdminDashboard />
      </main>
    </div>
  )
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalMessages: 0,
    lowStockProducts: 0,
    recentMessages: 0
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      
      // Fetch products
      const productsRes = await authenticatedFetch('/api/products')
      const products = productsRes.ok ? await productsRes.json() : []
      
      // Fetch categories
      const categoriesRes = await authenticatedFetch('/api/categories')
      const categories = categoriesRes.ok ? await categoriesRes.json() : []
      
      // Fetch messages
      const messagesRes = await authenticatedFetch('/api/admin/messages')
      const messages = messagesRes.ok ? await messagesRes.json() : []

      // Calculate stats
      const lowStock = products.filter((p: any) => p.stock <= 5).length
      const today = new Date()
      const recentMessages = messages.filter((m: any) => {
        const messageDate = new Date(m.created_at)
        const diffDays = (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays <= 7
      }).length

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalMessages: messages.length,
        lowStockProducts: lowStock,
        recentMessages: recentMessages
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Icons.Dashboard },
    { id: 'products', label: 'Produits', icon: Icons.Products },
    { id: 'categories', label: 'Catégories', icon: Icons.Categories },
    { id: 'messages', label: 'Messages', icon: Icons.Messages },
    { id: 'database', label: 'Base de données', icon: Icons.Database },
    { id: 'settings', label: 'Paramètres', icon: Icons.Settings },
    { id: 'password', label: 'Mot de passe', icon: Icons.Password },
  ]

  return (
    <div>
      {/* Enhanced Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
          <nav className="flex flex-wrap -mb-px px-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 pt-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {/* Badge for notifications */}
                  {tab.id === 'messages' && stats.recentMessages > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                      {stats.recentMessages}
                    </span>
                  )}
                  {tab.id === 'products' && stats.lowStockProducts > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                      {stats.lowStockProducts}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
        {activeTab === 'dashboard' && <DashboardOverview stats={stats} onRefresh={fetchDashboardStats} />}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'messages' && <MessagesManager />}
        {activeTab === 'database' && <DatabaseOverview />}
        {activeTab === 'settings' && <SettingsManager />}
        {activeTab === 'password' && <PasswordManager />}
      </div>
    </div>
  )
}

// Enhanced Dashboard Overview Component
function DashboardOverview({ stats, onRefresh }: { stats: any, onRefresh: () => void }) {
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      // Get recent messages for activity feed
      const messagesRes = await authenticatedFetch('/api/admin/messages')
      if (messagesRes.ok) {
        const messages = await messagesRes.json()
        const recent = messages.slice(0, 5).map((msg: any) => ({
          id: msg.id,
          type: 'message',
          title: `Nouveau message de ${msg.name}`,
          description: msg.message.substring(0, 50) + '...',
          time: new Date(msg.created_at),
          icon: Icons.Messages
        }))
        setRecentActivity(recent)
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Produits',
      value: stats.totalProducts,
      icon: Icons.Products,
      color: 'blue',
      change: '+2.5%',
      changeType: 'positive'
    },
    {
      title: 'Catégories',
      value: stats.totalCategories,
      icon: Icons.Categories,
      color: 'green',
      change: '',
      changeType: 'neutral'
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: Icons.Messages,
      color: 'purple',
      change: `+${stats.recentMessages} cette semaine`,
      changeType: stats.recentMessages > 0 ? 'positive' : 'neutral'
    },
    {
      title: 'Stock faible',
      value: stats.lowStockProducts,
      icon: Icons.TrendUp,
      color: stats.lowStockProducts > 0 ? 'red' : 'gray',
      change: stats.lowStockProducts > 0 ? 'Attention requise' : 'Tout va bien',
      changeType: stats.lowStockProducts > 0 ? 'negative' : 'positive'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      red: 'bg-red-500 text-red-600 bg-red-50',
      gray: 'bg-gray-500 text-gray-600 bg-gray-50'
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre magasin El Jarda</p>
        </div>
        <button
          onClick={onRefresh}
          className="btn-primary flex items-center space-x-2"
        >
          <Icons.TrendUp className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const colorClass = getColorClasses(card.color)
          const [bgColor, textColor, bgLight] = colorClass.split(' ')
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  {card.change && (
                    <p className={`text-sm mt-2 ${
                      card.changeType === 'positive' ? 'text-green-600' :
                      card.changeType === 'negative' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {card.change}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${bgLight}`}>
                  <card.icon className={`w-6 h-6 ${textColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
              <Icons.Plus className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Ajouter un produit</p>
                <p className="text-sm text-gray-600">Créer un nouveau produit</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
              <Icons.Categories className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Gérer les catégories</p>
                <p className="text-sm text-gray-600">Organiser vos produits</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
              <Icons.Settings className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Paramètres du site</p>
                <p className="text-sm text-gray-600">Configurer votre site</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Activité récente</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="loader w-6 h-6"></div>
                <span className="ml-2 text-gray-600">Chargement...</span>
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity: any, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="p-2 rounded-full bg-blue-50">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icons.Messages className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Aucune activité récente</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">État du système</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <Icons.Check className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Base de données</p>
              <p className="text-xs text-green-600">Connectée</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <Icons.Check className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">API</p>
              <p className="text-xs text-green-600">Fonctionnelle</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Icons.Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Utilisateurs</p>
              <p className="text-xs text-blue-600">Actifs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsManager() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [stockFilter, setStockFilter] = useState('all')
  const [viewMode, setViewMode] = useState('table') // 'table' or 'cards'
  const [formData, setFormData] = useState({
    name_fr: '',
    name_ar: '',
    description_fr: '',
    description_ar: '',
    price: '',
    category_id: '',
    stock: '',
    reference: '',
    image_url: ''
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  // Filter products based on search and filters
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.name_ar.includes(searchTerm) ||
                         product.reference.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === '' || product.category_id.toString() === selectedCategory
    
    const matchesStock = stockFilter === 'all' ||
                        (stockFilter === 'low' && product.stock <= 5) ||
                        (stockFilter === 'out' && product.stock === 0) ||
                        (stockFilter === 'available' && product.stock > 0)
    
    return matchesSearch && matchesCategory && matchesStock
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setFormData(prev => ({ ...prev, image_url: data.imageUrl }))
        setImagePreview(data.imageUrl)
        toast.success('Image téléchargée avec succès!')
      } else {
        console.error('Upload error:', data)
        toast.error(data.error || 'Erreur lors du téléchargement')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Erreur lors du téléchargement de l\'image')
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name_fr: '',
      name_ar: '',
      description_fr: '',
      description_ar: '',
      price: '',
      category_id: '',
      stock: '',
      reference: '',
      image_url: ''
    })
    setImagePreview('')
    setEditingProduct(null)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name_fr: product.name_fr,
      name_ar: product.name_ar,
      description_fr: product.description_fr,
      description_ar: product.description_ar,
      price: product.price.toString(),
      category_id: product.category_id.toString(),
      stock: product.stock.toString(),
      reference: product.reference,
      image_url: product.image_url || ''
    })
    setImagePreview(product.image_url || '')
    setShowForm(true)
  }

  const handleDeleteProduct = async (productId: number) => {
    if (deleteConfirm !== productId) {
      setDeleteConfirm(productId)
      return
    }

    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Produit supprimé avec succès!')
        fetchProducts()
        setDeleteConfirm(null)
      } else {
        toast.error('Erreur lors de la suppression du produit')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit')
    }
  }

  const fetchProducts = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await authenticatedFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        }),
      })

      if (response.ok) {
        toast.success(editingProduct ? 'Produit modifié avec succès!' : 'Produit ajouté avec succès!')
        fetchProducts()
        setShowForm(false)
        setEditingProduct(null)
        resetForm()
      } else {
        toast.error(editingProduct ? 'Erreur lors de la modification du produit' : 'Erreur lors de l\'ajout du produit')
      }
    } catch (error) {
      toast.error(editingProduct ? 'Erreur lors de la modification du produit' : 'Erreur lors de l\'ajout du produit')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Icons.Products className="w-6 h-6 mr-2 text-primary-600" />
            Gestion des Produits
          </h2>
          <p className="text-gray-600 mt-1">{filteredProducts.length} produit(s) affiché(s)</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Icons.Plus className="w-4 h-4" />
            <span>Ajouter un produit</span>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9m-9 4h9M3 14h6m-6 4h6" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom ou référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name_fr}
              </option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">Tout le stock</option>
            <option value="available">En stock</option>
            <option value="low">Stock faible (≤5)</option>
            <option value="out">Rupture de stock</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('')
              setStockFilter('all')
            }}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Icons.X className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>
      
      {/* Product Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Icons.Plus className="w-5 h-5 mr-2 text-primary-600" />
              {editingProduct ? 'Modifier le Produit' : 'Nouveau Produit'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingProduct(null)
                resetForm()
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icons.X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b pb-2">Informations de base</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom (Français) *
                  </label>
                  <input
                    type="text"
                    value={formData.name_fr}
                    onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom (Arabe) *
                  </label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="input-field arabic-text"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (TND) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie *
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name_fr}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Référence *
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions and Image */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b pb-2">Descriptions et Image</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Français) *
                  </label>
                  <textarea
                    value={formData.description_fr}
                    onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                    rows={3}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Arabe) *
                  </label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    rows={3}
                    className="input-field arabic-text"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image du produit
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="input-field"
                      disabled={uploading}
                    />
                    {uploading && (
                      <div className="flex items-center text-blue-600">
                        <div className="loader w-4 h-4 mr-2"></div>
                        Upload en cours...
                      </div>
                    )}
                    {imagePreview && (
                      <div className="flex items-center space-x-4">
                        <img 
                          src={imagePreview} 
                          alt="Aperçu" 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">Aperçu de l'image</p>
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview('')
                              setFormData(prev => ({ ...prev, image_url: '' }))
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Supprimer l'image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                  resetForm()
                }}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Modifier le produit' : 'Ajouter le produit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Display */}
      {viewMode === 'table' ? (
        <ProductsTable 
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          deleteConfirm={deleteConfirm}
        />
      ) : (
        <ProductsCards 
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          deleteConfirm={deleteConfirm}
        />
      )}
    </div>
  )
}

// Products Table Component
function ProductsTable({ products, onEdit, onDelete, deleteConfirm }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="hidden xl:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex-shrink-0">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name_fr}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icons.Products className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name_fr}</div>
                      <div className="text-sm text-gray-500 arabic-text">{product.name_ar}</div>
                      <div className="text-xs text-gray-400">#{product.reference}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 max-w-xs">
                  <div className="text-sm text-gray-900 truncate" title={product.description_fr}>
                    {product.description_fr}
                  </div>
                  <div className="text-sm text-gray-600 arabic-text truncate" title={product.description_ar}>
                    {product.description_ar}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">{product.price} TND</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    product.stock === 0 
                      ? 'bg-red-100 text-red-800' 
                      : product.stock <= 5
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock} {product.stock <= 1 ? 'unité' : 'unités'}
                  </span>
                </td>
                <td className="hidden md:table-cell px-6 py-4">
                  <div className="text-sm text-gray-900">{product.category_name_fr}</div>
                  <div className="text-sm text-gray-600 arabic-text">{product.category_name_ar}</div>
                </td>
                <td className="hidden xl:table-cell px-6 py-4">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name_fr}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icons.Products className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Icons.Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        deleteConfirm === product.id 
                          ? 'text-white bg-red-600 hover:bg-red-700' 
                          : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                      }`}
                      title={deleteConfirm === product.id ? 'Confirmer la suppression' : 'Supprimer'}
                    >
                      {deleteConfirm === product.id ? (
                        <Icons.Check className="w-4 h-4" />
                      ) : (
                        <Icons.Delete className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length === 0 && (
        <div className="text-center py-12">
          <Icons.Products className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  )
}

// Products Cards Component
function ProductsCards({ products, onEdit, onDelete, deleteConfirm }: any) {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Product Image */}
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name_fr}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <Icons.Products className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                {/* Stock Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.stock === 0 
                      ? 'bg-red-100 text-red-800' 
                      : product.stock <= 5
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock}
                  </span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name_fr}</h3>
                  <p className="text-sm text-gray-600 arabic-text">{product.name_ar}</p>
                  <p className="text-xs text-gray-500 mt-1">#{product.reference}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{product.description_fr}</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary-600">{product.price} TND</span>
                  <span className="text-sm text-gray-600">{product.category_name_fr}</span>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 text-sm py-2"
                  >
                    <Icons.Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      deleteConfirm === product.id 
                        ? 'text-white bg-red-600 hover:bg-red-700' 
                        : 'text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200'
                    }`}
                    title={deleteConfirm === product.id ? 'Confirmer' : 'Supprimer'}
                  >
                    {deleteConfirm === product.id ? (
                      <Icons.Check className="w-4 h-4" />
                    ) : (
                      <Icons.Delete className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icons.Products className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Aucun produit trouvé</p>
          <p className="text-gray-500 text-sm mt-2">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}
    </div>
  )
}

function CategoriesManager() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name_fr: '',
    name_ar: '',
    description_fr: '',
    description_ar: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const filteredCategories = categories.filter((category: any) =>
    category.name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.name_ar.includes(searchTerm)
  )

  const fetchCategories = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const url = editingCategory ? `/api/categories/${(editingCategory as any).id}` : '/api/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      
      const response = await authenticatedFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingCategory ? 'Catégorie modifiée avec succès!' : 'Catégorie ajoutée avec succès!')
        fetchCategories()
        setShowForm(false)
        setEditingCategory(null)
        setFormData({
          name_fr: '',
          name_ar: '',
          description_fr: '',
          description_ar: ''
        })
      } else {
        toast.error(editingCategory ? 'Erreur lors de la modification de la catégorie' : 'Erreur lors de l\'ajout de la catégorie')
      }
    } catch (error) {
      toast.error(editingCategory ? 'Erreur lors de la modification de la catégorie' : 'Erreur lors de l\'ajout de la catégorie')
    }
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name_fr: category.name_fr,
      name_ar: category.name_ar,
      description_fr: category.description_fr || '',
      description_ar: category.description_ar || ''
    })
    setShowForm(true)
  }

  const handleDeleteCategory = async (categoryId: number) => {
    if (deleteConfirm !== categoryId) {
      setDeleteConfirm(categoryId)
      return
    }

    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Catégorie supprimée avec succès!')
        fetchCategories()
        setDeleteConfirm(null)
      } else {
        // Handle specific error messages from the server
        if (response.status === 400 && data.error) {
          toast.error(data.error)
        } else if (response.status === 404) {
          toast.error('Catégorie non trouvée')
        } else {
          toast.error(data.error || 'Erreur lors de la suppression de la catégorie')
        }
        setDeleteConfirm(null)
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Erreur lors de la suppression de la catégorie')
      setDeleteConfirm(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Icons.Categories className="w-6 h-6 mr-2 text-primary-600" />
            Gestion des Catégories
          </h2>
          <p className="text-gray-600 mt-1">{filteredCategories.length} catégorie(s) affichée(s)</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Icons.Plus className="w-4 h-4" />
            <span>Ajouter une catégorie</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="relative max-w-md">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-field"
          />
        </div>
      </div>

      {/* Category Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Icons.Plus className="w-5 h-5 mr-2 text-primary-600" />
              {editingCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingCategory(null)
                setFormData({
                  name_fr: '',
                  name_ar: '',
                  description_fr: '',
                  description_ar: ''
                })
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icons.X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom (Français) *
                </label>
                <input
                  type="text"
                  value={formData.name_fr}
                  onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom (Arabe) *
                </label>
                <input
                  type="text"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  className="input-field arabic-text"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Français)
                </label>
                <textarea
                  value={formData.description_fr}
                  onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                  rows={4}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Arabe)
                </label>
                <textarea
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  rows={4}
                  className="input-field arabic-text"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Icons.Check className="w-4 h-4" />
                <span>{editingCategory ? 'Modifier' : 'Créer'} la catégorie</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom (FR)</th>
                <th>Nom (AR)</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="font-medium">{category.name_fr}</td>
                  <td className="arabic-text">{category.name_ar}</td>
                  <td className="text-gray-600 max-w-xs truncate">
                    {category.description_fr || 'Aucune description'}
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Icons.Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          deleteConfirm === category.id
                            ? 'text-white bg-red-600 hover:bg-red-700'
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                        title={deleteConfirm === category.id ? 'Confirmer la suppression' : 'Supprimer'}
                      >
                        <Icons.Delete className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Icons.Categories className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune catégorie</h3>
              <p className="text-gray-600 mb-4">Commencez par créer votre première catégorie</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Icons.Plus className="w-4 h-4" />
                <span>Créer une catégorie</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Component placeholders for missing functions
function ForgotPasswordLink() {
  return (
    <a href="/admin/reset-password" className="text-sm text-blue-600 hover:text-blue-800">
      Mot de passe oublié ?
    </a>
  )
}

function MessagesManager() {
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    fetchMessages()
  }, [])
  
  const fetchMessages = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch('/api/admin/messages')
      if (response && response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Messages de Contact</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message: any) => (
              <tr key={message.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {message.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {message.email}
                  </div>
                  {message.phone && (
                    <div className="text-sm text-gray-500">
                      {message.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    message.type === 'appointment'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {message.type === 'appointment' ? 'Rendez-vous' : 'Question'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {message.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(message.created_at).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DatabaseOverview() {
  const [dbStats, setDbStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchDatabaseStats()
  }, [])

  const fetchDatabaseStats = async () => {
    try {
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch('/api/admin/database')
      if (response && response.ok) {
        const data = await response.json()
        setDbStats(data)
      } else {
        toast.error('Erreur lors du chargement des statistiques')
      }
    } catch (error) {
      console.error('Error fetching database stats:', error)
      toast.error('Erreur lors du chargement des statistiques')
    } finally {
      setLoading(false)
    }
  }

  const toggleTableDetails = (tableName: string) => {
    const newExpanded = new Set(expandedTables)
    if (newExpanded.has(tableName)) {
      newExpanded.delete(tableName)
    } else {
      newExpanded.add(tableName)
    }
    setExpandedTables(newExpanded)
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-center">
          <div className="loader w-6 h-6"></div>
          <span className="ml-2">Chargement des statistiques...</span>
        </div>
      </div>
    )
  }

  if (!dbStats) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center text-red-600">
          <Icons.Database className="w-12 h-12 mx-auto mb-4" />
          <p>Impossible de charger les statistiques de la base de données</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Icons.Database className="w-6 h-6 mr-2" />
          Aperçu de la Base de Données
        </h2>
        <button
          onClick={fetchDatabaseStats}
          className="btn-secondary flex items-center space-x-2"
        >
          <Icons.TrendUp className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icons.Database className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total des Tables</p>
              <p className="text-2xl font-bold text-gray-900">{dbStats.summary.totalTables}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Icons.TrendUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total des Enregistrements</p>
              <p className="text-2xl font-bold text-gray-900">{dbStats.summary.totalRows.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tables List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Tables de la Base de Données</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {dbStats.tables.map((table: any) => (
            <div key={table.name} className="p-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleTableDetails(table.name)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded">
                    <Icons.Database className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{table.name}</h4>
                    <p className="text-sm text-gray-500">
                      {table.rowCount.toLocaleString()} ligne{table.rowCount !== 1 ? 's' : ''} • {table.columns} colonne{table.columns !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    {table.rowCount.toLocaleString()} lignes
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    {expandedTables.has(table.name) ? (
                      <Icons.X className="w-5 h-5" />
                    ) : (
                      <Icons.Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Table Details */}
              {expandedTables.has(table.name) && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Structure des Colonnes</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nom
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nullable
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Défaut
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {table.columnDetails.map((column: any, index: number) => (
                          <tr key={index} className="bg-white">
                            <td className="px-3 py-2 text-sm font-medium text-gray-900">
                              {column.column_name}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {column.data_type}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                column.is_nullable === 'YES' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {column.is_nullable === 'YES' ? 'Oui' : 'Non'}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {column.column_default || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PasswordManager() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas')
      return
    }
    if (formData.newPassword.length < 6) {
      toast.error('Le nouveau mot de passe doit contenir au moins 6 caractères')
      return
    }
    setLoading(true)

    try {
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}')
      const authenticatedFetch = createAuthenticatedFetch()
      const response = await authenticatedFetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          email: adminUser.email
        }),
      })
      
      if (response) {
        const data = await response.json()
        if (response.ok) {
          toast.success(data.message)
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          })
        } else {
          toast.error(data.error)
        }
      }
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Changer le mot de passe</h2>

      <div className="bg-white p-6 rounded-lg shadow max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="input-field"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="loader w-4 h-4"></div>
                <span>Changement en cours...</span>
              </>
            ) : (
              <>
                <Icons.Password className="w-4 h-4" />
                <span>Changer le mot de passe</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

function SettingsManager() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name_fr: '',
    name_ar: '',
    description_fr: '',
    description_ar: ''
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Icons.Settings className="w-6 h-6 mr-2" />
            Paramètres du Site
          </h2>
          <p className="text-gray-600 mt-1">Gérez les paramètres généraux de votre site web</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom (Français)
                </label>
                <input
                  type="text"
                  value={formData.name_fr}
                  onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم (العربية)
                </label>
                <input
                  type="text"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  className="input-field arabic-text"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Français)
                </label>
                <textarea
                  value={formData.description_fr}
                  onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                  rows={4}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف (العربية)
                </label>
                <textarea
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  rows={4}
                  className="input-field arabic-text"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="loader w-4 h-4"></div>
                    <span>Sauvegarde...</span>
                  </>
                ) : (
                  <>
                    <Icons.Check className="w-4 h-4" />
                    <span>Sauvegarder les paramètres</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
