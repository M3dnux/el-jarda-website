'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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
    if (token) {
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
        localStorage.setItem('adminToken', 'authenticated')
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
    setIsAuthenticated(false)
    toast.success('Déconnexion réussie')
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex flex-wrap -mb-px space-x-2 sm:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Produits
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'categories'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Catégories
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'password'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mot de passe
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && <ProductsManager />}
      {activeTab === 'categories' && <CategoriesManager />}
      {activeTab === 'messages' && <MessagesManager />}
      {activeTab === 'password' && <PasswordManager />}
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('Starting image upload for file:', file.name)
    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('Uploading to /api/upload...')
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log('Upload response:', data)

      if (response.ok) {
        console.log('Setting image URL:', data.imageUrl)
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

  const handleEditProduct = (product) => {
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

  const handleDeleteProduct = async (productId) => {
    if (deleteConfirm !== productId) {
      setDeleteConfirm(productId)
      return
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
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
      const response = await fetch('/api/products')
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
      const response = await fetch('/api/categories')
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
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Gestion des Produits</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary w-full sm:w-auto"
        >
          Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingProduct ? 'Modifier le Produit' : 'Nouveau Produit'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  Nom (Arabe)
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Français)
              </label>
              <textarea
                value={formData.description_fr}
                onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                rows={3}
                className="input-field"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Arabe)
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
                Prix (TND)
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
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name_fr}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Référence
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                className="input-field"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image du produit (optionnel)
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
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Aperçu de l'image:</p>
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                      onLoad={() => console.log('Image preview loaded successfully')}
                      onError={(e) => {
                        console.error('Error loading image preview:', imagePreview.substring(0, 50) + '...')
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA2NkM0MCA1My44NDk3IDQ5Ljg0OTcgNDQgNjIgNDRDNzQuMTUwMyA0NCA4NCA1My44NDk3IDg0IDY2Qzg0IDc4LjE1MDMgNzQuMTUwMyA4OCA2MiA4OEM0OS44NDk3IDg4IDQwIDc4LjE1MDMgNDAgNjZaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjY0IiB5PSI3NCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3Mjc5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Ob24gdHJvdXbDqTwvdGV4dD4KPC9zdmc+'
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Type: {imagePreview.startsWith('data:') ? 'Base64 image data' : 'File path'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                {editingProduct ? 'Modifier le produit' : 'Ajouter le produit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                  resetForm()
                }}
                className="btn-secondary w-full sm:w-auto"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      FR: {product.name_fr}
                    </div>
                    <div className="text-sm text-gray-500 arabic-text">
                      AR: {product.name_ar}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-gray-900 mb-1">
                      <span className="font-medium">FR:</span> {product.description_fr}
                    </div>
                    <div className="text-sm text-gray-600 arabic-text">
                      <span className="font-medium">AR:</span> {product.description_ar}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price} TND
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">
                      FR: {product.category_name_fr}
                    </div>
                    <div className="text-sm text-gray-600 arabic-text">
                      AR: {product.category_name_ar}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        console.error('Failed to load product image for product:', product.name_fr)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : null}
                  {(!product.image_url || product.image_url === '') && (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className={`${
                        deleteConfirm === product.id 
                          ? 'text-red-800 bg-red-100 px-2 py-1 rounded' 
                          : 'text-red-600 hover:text-red-900'
                      }`}
                    >
                      {deleteConfirm === product.id ? (
                        <span className="text-xs">Confirmer?</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {products.map((product) => (
            <div key={product.id} className="border-b border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt="Product"
                        className="h-12 w-12 object-cover rounded"
                        onError={(e) => {
                          console.error('Failed to load product image for product:', product.name_fr);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{product.name_fr}</h3>
                      <p className="text-sm text-gray-500 arabic-text">{product.name_ar}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Prix:</span>
                      <p className="text-gray-900">{product.price} TND</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Stock:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Catégorie:</span>
                      <p className="text-gray-900">{product.category_name_fr || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Référence:</span>
                      <p className="text-gray-900">{product.reference}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="font-medium text-gray-500">Description:</span>
                    <p className="text-sm text-gray-900 mt-1">{product.description_fr}</p>
                    <p className="text-sm text-gray-600 arabic-text mt-1">{product.description_ar}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className={`p-2 rounded ${
                      deleteConfirm === product.id 
                        ? 'text-red-800 bg-red-100' 
                        : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                    }`}
                  >
                    {deleteConfirm === product.id ? (
                      <span className="text-xs">OK?</span>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoriesManager() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    name_fr: '',
    name_ar: '',
    description_fr: '',
    description_ar: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
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
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
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

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setFormData({
      name_fr: category.name_fr,
      name_ar: category.name_ar,
      description_fr: category.description_fr || '',
      description_ar: category.description_ar || ''
    })
    setShowForm(true)
  }

  const handleDeleteCategory = async (categoryId) => {
    if (deleteConfirm !== categoryId) {
      setDeleteConfirm(categoryId)
      return
    }

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Catégorie supprimée avec succès!')
        fetchCategories()
        setDeleteConfirm(null)
      } else {
        toast.error('Erreur lors de la suppression de la catégorie')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression de la catégorie')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          Ajouter une catégorie
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Nom (Arabe)
              </label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="input-field arabic-text"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Français)
              </label>
              <textarea
                value={formData.description_fr}
                onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                rows={3}
                className="input-field"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Arabe)
              </label>
              <textarea
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                rows={3}
                className="input-field arabic-text"
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-4">
              <button type="submit" className="btn-primary">
                {editingCategory ? 'Modifier la catégorie' : 'Ajouter la catégorie'}
              </button>
              <button
                type="button"
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
                className="btn-secondary"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom de la Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      FR: {category.name_fr}
                    </div>
                    <div className="text-sm text-gray-500 arabic-text">
                      AR: {category.name_ar}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-gray-900 mb-1">
                      <span className="font-medium">FR:</span> {category.description_fr}
                    </div>
                    <div className="text-sm text-gray-600 arabic-text">
                      <span className="font-medium">AR:</span> {category.description_ar}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className={`${
                        deleteConfirm === category.id 
                          ? 'text-red-800 bg-red-100 px-2 py-1 rounded' 
                          : 'text-red-600 hover:text-red-900'
                      }`}
                    >
                      {deleteConfirm === category.id ? (
                        <span className="text-xs">Confirmer?</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {categories.map((category) => (
            <div key={category.id} className="border-b border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-900">{category.name_fr}</h3>
                    <p className="text-sm text-gray-500 arabic-text">{category.name_ar}</p>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Description:</span>
                    <p className="text-gray-900 mt-1">{category.description_fr}</p>
                    <p className="text-gray-600 arabic-text mt-1">{category.description_ar}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className={`p-2 rounded ${
                      deleteConfirm === category.id 
                        ? 'text-red-800 bg-red-100' 
                        : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                    }`}
                  >
                    {deleteConfirm === category.id ? (
                      <span className="text-xs">OK?</span>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MessagesManager() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
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
            {messages.map((message) => (
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

function ForgotPasswordLink() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (response.ok) {
        toast.success(data.message)
        setShowForm(false)
        setEmail('')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi')
    } finally {
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="text-primary-600 hover:text-primary-800 text-sm"
      >
        Mot de passe oublié ?
      </button>
    )
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary text-sm px-4 py-2"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="btn-secondary text-sm px-4 py-2"
          >
            Annuler
          </button>
        </div>
      </form>
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
      const response = await fetch('/api/admin/change-password', {
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
              minLength={6}
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="loader w-4 h-4 mr-2"></div>
                Changement...
              </>
            ) : (
              'Changer le mot de passe'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
