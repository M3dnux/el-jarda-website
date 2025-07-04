'use client'

import React, { useState, useEffect } from 'react'

interface Product {
  id: number
  name_fr: string
  name_ar: string
  description_fr: string
  description_ar: string
  price: number | string
  stock: number
  image_url: string
  reference: string
  category_name_fr: string
  category_name_ar: string
  category_id: number
}

interface Category {
  id: number
  name_fr: string
  name_ar: string
}

interface ProductsProps {
  language: 'fr' | 'ar'
}

export default function Products({ language }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const isArabic = language === 'ar'

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
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

  const filterProducts = () => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const name = isArabic ? product.name_ar : product.name_fr
        const description = isArabic ? product.description_ar : product.description_fr
        const searchLower = searchTerm.toLowerCase()
        
        return name.toLowerCase().includes(searchLower) ||
               description.toLowerCase().includes(searchLower) ||
               product.reference.toLowerCase().includes(searchLower)
      })
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category_id === selectedCategory)
    }

    setFilteredProducts(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
  }

  return (
    <section id="products" className={`py-20 bg-white ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic ? 'منتجاتنا' : 'Nos Produits'}
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic 
              ? 'اكتشف مجموعتنا المختارة من منتجات الحدائق الطبيعية والعضوية'
              : 'Découvrez notre sélection de produits naturels et biologiques pour votre jardin'
            }
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={isArabic ? 'البحث عن المنتجات...' : 'Rechercher des produits...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${isArabic ? 'arabic-text text-right' : ''}`}
                dir={isArabic ? 'rtl' : 'ltr'}
              />
              <svg 
                className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3.5 h-5 w-5 text-gray-400`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${isArabic ? 'arabic-text' : ''}`}
              >
                {isArabic ? 'جميع الفئات' : 'Toutes les catégories'}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } ${isArabic ? 'arabic-text' : ''}`}
                >
                  {isArabic ? category.name_ar : category.name_fr}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count and Clear Filters */}
          {(searchTerm || selectedCategory) && (
            <div className="flex justify-center items-center gap-4">
              <p className={`text-gray-600 ${isArabic ? 'arabic-text' : ''}`}>
                {isArabic 
                  ? `${filteredProducts.length} منتج موجود`
                  : `${filteredProducts.length} produit(s) trouvé(s)`
                }
              </p>
              <button
                onClick={clearFilters}
                className={`text-red-600 hover:text-red-700 text-sm font-medium ${isArabic ? 'arabic-text' : ''}`}
              >
                {isArabic ? 'مسح المرشحات' : 'Effacer les filtres'}
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className={`text-gray-600 text-lg ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'جارٍ تحميل المنتجات...' : 'Chargement des produits...'}
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-gray-600 text-lg ${isArabic ? 'arabic-text' : ''}`}>
              {searchTerm || selectedCategory
                ? (isArabic ? 'لم يتم العثور على منتجات' : 'Aucun produit trouvé')
                : (isArabic ? 'لا توجد منتجات متاحة حاليا' : 'Aucun produit disponible pour le moment')
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={isArabic ? product.name_ar : product.name_fr}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${isArabic ? 'arabic-text' : ''}`}>
                    {isArabic ? product.name_ar : product.name_fr}
                  </h3>
                  <p className={`text-gray-600 mb-3 ${isArabic ? 'arabic-text' : ''}`}>
                    {isArabic ? product.description_ar : product.description_fr}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-green-600 font-bold text-lg ${isArabic ? 'arabic-text' : ''}`}>
                      {Number(product.price).toFixed(2)} DT
                    </span>
                    {product.stock > 0 ? (
                      <span className={`text-green-500 text-sm ${isArabic ? 'arabic-text' : ''}`}>
                        {isArabic ? 'متوفر' : 'Disponible'}
                      </span>
                    ) : (
                      <span className={`text-red-500 text-sm ${isArabic ? 'arabic-text' : ''}`}>
                        {isArabic ? 'نفذ المخزون' : 'Rupture de stock'}
                      </span>
                    )}
                  </div>
                  {(isArabic ? product.category_name_ar : product.category_name_fr) && (
                    <p className={`text-gray-500 text-sm mt-2 ${isArabic ? 'arabic-text' : ''}`}>
                      {isArabic ? product.category_name_ar : product.category_name_fr}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <p className={`text-lg text-gray-600 mb-6 ${isArabic ? 'arabic-text' : ''}`}>
            {isArabic 
              ? 'هل تريد معرفة المزيد عن منتجاتنا؟'
              : 'Vous souhaitez en savoir plus sur nos produits ?'
            }
          </p>
          <a
            href="#contact"
            className={`inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold ${isArabic ? 'arabic-text' : ''}`}
          >
            {isArabic ? 'اتصل بنا' : 'Nous contacter'}
          </a>
        </div>
      </div>
    </section>
  )
}
