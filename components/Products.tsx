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
}

interface ProductsProps {
  language: 'fr' | 'ar'
}

export default function Products({ language }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const isArabic = language === 'ar'

  useEffect(() => {
    fetchProducts()
  }, [])

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

        {loading ? (
          <div className="text-center py-12">
            <p className={`text-gray-600 text-lg ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'جارٍ تحميل المنتجات...' : 'Chargement des produits...'}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-gray-600 text-lg ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'لا توجد منتجات متاحة حاليا' : 'Aucun produit disponible pour le moment'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
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
